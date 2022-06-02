var gulp = require("gulp");
var clean = require("gulp-clean");
var filelist = require("gulp-filelist");
const prettier = require("gulp-prettier");
var run = require("gulp-run");
var ts = require("gulp-typescript");
var typedoc = require("gulp-typedoc");

// ### Base tasks
gulp.task("clean", function () {
  return gulp.src("out", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("compile", function () {
  // Get TS Project for compilation
  var tsProject = ts.createProject("tsconfig.json");

  // Compile
  var result = tsProject.src().pipe(tsProject());

  // Output to ./out
  return result.js.pipe(gulp.dest("out"));
});

gulp.task("generate-docs", function () {
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

gulp.task("generate-manifest", function () {
  return gulp
    .src("out/**/*.js")
    .pipe(filelist("manifest.json", { relative: true }))
    .pipe(gulp.dest("out/res"));
});

gulp.task("prettier", function () {
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

gulp.task("sync", function () {
  return run("npm run sync").exec();
});

// ### Install tasks
gulp.task("postinstall:config", function () {
  return gulp
    .src("scripts/postinstall/retrieve_config.js", { read: false })
    .pipe(run("node ${file.path}"));
});

gulp.task("postinstall:defs", function () {
  return gulp
    .src("scripts/postinstall/update_defs.js", { read: false })
    .pipe(run("node ${file.path}"));
});

gulp.task("postinstall", gulp.series("postinstall:defs", "postinstall:config"));

// ### Watch tasks
gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", gulp.series("compile"));
});

gulp.task("watch:sync", function () {
  gulp.watch("src/**/*.ts", gulp.series(["compile", "sync"]));
});

// ### Misc tasks
gulp.task(
  "default",
  gulp.series("clean", "compile", "generate-docs", "generate-manifest")
);
