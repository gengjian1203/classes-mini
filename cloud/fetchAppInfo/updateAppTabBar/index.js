/**
 * updateAppTabBar
 * 更新APP级别底部导航
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function updateAppTabBar(data, db, memberId) {
  const { tabId = "", enable = false } = data;
  const objResult = await db
    .collection("TB_APP_TAB_BAR")
    .where({
      id: tabId,
    })
    .update({
      data: {
        enable: enable,
      },
    });
  console.log("updateAppTabBar", objResult);
  return objResult;
}

module.exports = updateAppTabBar;
