/**
 * updateAppTabBar
 * 更新APP级别底部导航
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function updateAppTabBar(data, db, memberId) {
  const { appId = "", tabId = "", tabIndex = 0, enable = false } = data;
  const objResult = await db
    .collection("TB_APP_CONFIG")
    .where({
      _id: appId,
      "arrTabbarList.id": tabId,
    })
    .update({
      data: {
        "arrTabbarList.$.enable": enable,
      },
    });
  console.log("updateAppTabBar", data, objResult);
  return objResult;
}

module.exports = updateAppTabBar;
