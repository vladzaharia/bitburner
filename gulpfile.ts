import * as gulp from "gulp";
import * as clean from "gulp-clean";
import * as eslint from "gulp-eslint";
import * as filelist from "gulp-filelist";
import * as prettier from "gulp-prettier";
import * as run from "gulp-run";
import * as typedoc from "gulp-typedoc";
import * as ts from "gulp-typescript";

// ### Install tasks
gulp.task("postinstall-config", () => {
    return gulp
        .src("scripts/postinstall/retrieve_config.ts", { read: false })
        .pipe(run("ts-node ${file.path}"));
});

gulp.task("postinstall-defs", () => {
    return gulp
        .src("scripts/postinstall/update_defs.ts", { read: false })
        .pipe(run("ts-node ${file.path}"));
});

gulp.task("postinstall", gulp.series("postinstall-defs", "postinstall-config"));

// ### Base tasks
gulp.task("clean", () => {
    return gulp.src(["out"], { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("compile", () => {
    // Get TS Project for compilation
    const tsProject = ts.createProject("tsconfig.json");

    // Compile
    const result = tsProject.src().pipe(tsProject());

    // Output to ./out
    return result.js.pipe(gulp.dest("out"));
});

gulp.task("generate-manifest", () => {
    return gulp
        .src("out/**/*.js")
        .pipe(filelist("manifest.json", { relative: true }))
        .pipe(gulp.dest("out/res"));
});

// ### Doc generation tasks
gulp.task("generate-docs-md", () => {
    return gulp.src("src/**/*.ts").pipe(
        typedoc({
            out: "./out/docs/",
            json: "./out/docs.json",

            name: "Bitburner",
            categorizeByGroup: false,
            exclude: "./src/lib/**",
            gitRevision: "main",
            plugin: ["typedoc-github-wiki-theme", "typedoc-plugin-markdown"],
            theme: "github-wiki",
            version: true,
        } as never)
    );
});

gulp.task("generate-docs-html", () => {
    return gulp.src("src/**/*.ts").pipe(
        typedoc({
            out: "./out/docs-html/",
            json: "./out/docs.json",

            name: "Bitburner",
            categorizeByGroup: false,
            exclude: "./src/lib/**",
            gitRevision: "main",
            plugin: [],
            theme: "default",
            version: true,
        } as never)
    );
});

gulp.task("copy-out-to-docs", () => {
    return gulp
        .src(["out/**/*", "!out/docs*/**", "!out/docs*"])
        .pipe(gulp.dest("out/docs-html/api"));
});

gulp.task(
    "generate-docs",
    gulp.series("generate-docs-md", "generate-docs-html")
);

// ### Linting tasks
gulp.task("lint-eslint", () => {
    return gulp
        .src("src/**/*.ts")
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(gulp.dest("src"));
});

gulp.task("lint-prettier", () => {
    return gulp
        .src([
            "**/*",
            "!package-lock.json",
            "!node_modules/**",
            "!out/**",
            "!**/*.tt",
        ])
        .pipe(prettier(".prettierrc.json"))
        .pipe(gulp.dest("."));
});
gulp.task("lint", gulp.series("lint-eslint", "lint-prettier"));

// ### Watch tasks
gulp.task("watch", () => {
    gulp.watch("src/**/*.ts", gulp.series("compile"));
});

gulp.task("watch:sync", () => {
    gulp.watch("src/**/*.ts", gulp.series(["compile", "sync"]));
});

// ### Misc tasks
gulp.task("sync", () => {
    return run("npm run sync").exec();
});

gulp.task(
    "default",
    gulp.series("clean", "compile", "generate-manifest", "lint")
);

gulp.task("pre-commit", gulp.series("clean", "compile", "generate-manifest"));

gulp.task(
    "ci",
    gulp.series(
        "clean",
        "compile",
        "generate-manifest",
        "generate-docs",
        "lint"
    )
);
