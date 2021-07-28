/**
 * queryAppTabBar
 * 查询APP级别底部导航
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppTabBar(data, db, memberId) {
  objResult = {
    data: [
      {
        id: "0000001",
        title: "首页",
        permission: ["normal"],
        contentType: "HOME",
        iconType: "iconfont iconhomepage",
        selectedIconType: "iconfont iconhomepage_fill",
      },
      // {
      //   id: "0000002",
      //   title: "班级",
      //   permission: ["teacher", "student", "parent"],
      //   contentType: "GROUP",
      //   iconType: "iconfont iconactivity",
      //   selectedIconType: "iconfont iconactivity_fill",
      // },
      // {
      //   id: "0000003",
      //   title: "中波",
      //   permission: ["station"],
      //   contentType: "WAVE",
      //   iconType: "iconfont iconbase-station",
      //   selectedIconType: "iconfont iconbase-station-full",
      // },
      // {
      //   id: "0000004",
      //   title: "星站",
      //   permission: ["station"],
      //   contentType: "SATELLITE",
      //   iconType: "iconfont iconbase-satellite",
      //   selectedIconType: "iconfont iconbase-satellite-full",
      // },
      {
        id: "0000000",
        title: "我的",
        permission: ["normal"],
        contentType: "MINE",
        iconType: "iconfont iconpeople",
        selectedIconType: "iconfont iconpeople_fill",
      },
    ],
  };

  return objResult;
}

module.exports = queryAppTabBar;
