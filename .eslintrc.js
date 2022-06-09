module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    ignorePatterns: ["src/lib/*.ts"],
    rules: {
        "no-constant-condition": "off",
    },
    env: {
        node: true,
    },
};
