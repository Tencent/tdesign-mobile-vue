module.exports = {
  plugins: [
    /**
     * 根据 .browserslistrc 中配置的环境自动添加样式前缀
     * https://github.com/postcss/autoprefixer
     */
    require('autoprefixer')(),
    /**
     * https://github.com/postcss/postcss-url
     */
    // require('postcss-url')({
    //   url: (asset) => {
    //     const absPath = asset.absolutePath;
    //     const relPath = require('path').relative('dist', absPath);
    //     return relPath + asset.search + asset.hash;
    //   },
    // }),
  ],
};
