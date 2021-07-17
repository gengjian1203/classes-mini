/**
 * queryAppTabBar
 * 查询APP级别底部导航
 * @param {*} event
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppTabBar(event, db, memberId) {
  objResult = {
    data: [
      {
        id: "0000001",
        title: "首页",
        contentType: "HOME",
        // iconPrefixClass: "icon",
        iconType: "iconfont iconhomepage",
        selectedIconType: "iconfont iconhomepage_fill",
      },
      {
        id: "0000002",
        title: "班级",
        contentType: "GROUP",
        // iconPrefixClass: "icon",
        iconType: "iconfont iconactivity",
        selectedIconType: "iconfont iconactivity_fill",
      },
      {
        id: "0000003",
        title: "中波",
        contentType: "WAVE",
        // iconPrefixClass: "icon",
        iconType: "iconfont iconbase-station",
        selectedIconType: "iconfont iconbase-station-full",
      },
      {
        id: "0000004",
        title: "星站",
        contentType: "SATELLITE",
        // iconPrefixClass: "icon",
        iconType: "iconfont iconsatellite-signal",
        selectedIconType: "iconfont iconsatellite-signal-full",
      },
      {
        id: "0000000",
        title: "我的",
        contentType: "MINE",
        // iconPrefixClass: "icon",
        iconType: "iconfont iconpeople",
        selectedIconType: "iconfont iconpeople_fill",
      },
    ],
  };

  return objResult;
}

module.exports = queryAppTabBar;
