export default {
  pages: [
    "pages/Loading/index", // 入口页面
  ],
  subpackages: [
    {
      root: "pages/ArticleDetail",
      pages: ["index"], // 文章页
    },
    {
      root: "pages/ECharts",
      pages: ["index"], // 数据展示页
    },
    {
      root: "pages/EChartsDemo",
      pages: ["index"], // 数据组件展示demo
    },
    {
      root: "pages/EditWorker",
      pages: ["index"], // 编辑职工页
    },
    {
      root: "pages/Main",
      pages: ["index"], // 首页
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
