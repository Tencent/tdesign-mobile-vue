// const transformJsx = require("./docs/common/transform-jsx");

module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset"]
  // plugins: [transformJsx]
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 3 Chrome versions',
            'last 3 Firefox versions',
            'Safari >= 10',
            'Explorer >= 11',
            'Edge >= 12',
          ],
        },
        modules: false,
      },
    ],
  ],
};
