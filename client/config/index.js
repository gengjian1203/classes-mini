const path = require("path");

const config = {
  projectName: "classes-mini",
  date: "2021-2-1",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  alias: {
    "@root": path.resolve(__dirname, ".."),
    "@/": path.resolve(__dirname, "..", "src"),
    "@/api": path.resolve(__dirname, "..", "src/api"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/componentsVp": path.resolve(__dirname, "..", "src/componentsVp"),
    "@/componentsWx": path.resolve(__dirname, "..", "src/componentsWx"),
    "@/config": path.resolve(__dirname, "..", "src/config"),
    "@/hooks": path.resolve(__dirname, "..", "src/hooks"),
    "@/images": path.resolve(__dirname, "..", "src/images"),
    "@/pages": path.resolve(__dirname, "..", "src/pages"),
    "@/redux": path.resolve(__dirname, "..", "src/redux"),
    "@/less": path.resolve(__dirname, "..", "src/less"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["taro-ui"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
