var gulp = require("gulp");
var clean = require("gulp-clean");
var eslint = require("gulp-eslint");
var filelist = require("gulp-filelist");
const prettier = require("gulp-prettier");
var run = require("gulp-run");
var ts = require("gulp-typescript");
var typedoc = require("gulp-typedoc");

// ### Base tasks
gulp.task("clean", () => {
    return gulp.src(["out"], { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("compile", () => {
    // Get TS Project for compilation
    var tsProject = ts.createProject("tsconfig.json");

    // Compile
    var result = tsProject.src().pipe(tsProject());

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
        })
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
        })
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
        .pipe(prettier({ tabWidth: 4 }))
        .pipe(gulp.dest("."));
});
gulp.task("lint", gulp.series("lint-eslint", "lint-prettier"));

// ### Install tasks
gulp.task("postinstall-config", () => {
    return gulp
        .src("scripts/postinstall/retrieve_config.js", { read: false })
        .pipe(run("node ${file.path}"));
});

gulp.task("postinstall-defs", () => {
    return gulp
        .src("scripts/postinstall/update_defs.js", { read: false })
        .pipe(run("node ${file.path}"));
});

gulp.task("postinstall", gulp.series("postinstall-defs", "postinstall-config"));

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
