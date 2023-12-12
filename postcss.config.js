// yarn add postcss-loader autoprefixer -D
// 自动添加前缀

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: require("autoprefixer"),
  },
};
