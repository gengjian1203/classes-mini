export default {
  pages: [
    "pages/Loading/index", // 入口页面
  ],
  subpackages: [
    {
      root: "pages/ECharts", // 数据展示页
      pages: ["index"],
    },
    {
      root: "pages/Main", // 首页
      pages: ["index"],
    },
  ],
  preloadRule: {},
  window: {
    navigationStyle: "custom", // 关掉微信顶部导航
    backgroundTextStyle: "dark", // 'light'-浅色风格 'dark'-深色风格
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    onReachBottomDistance: 200, // 触发上拉刷新
    enablePullDownRefresh: false, // 开启下拉刷新
  },
};
