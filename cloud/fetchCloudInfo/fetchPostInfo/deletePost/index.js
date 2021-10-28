const Utils = require("../../utils/index.js");

/**
 * deletePost
 * 删除对应帖子
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function deletePost(data, db, strMemberId) {
  let objResult = {};
  const { postId = "" } = data || {};

  try {
    objResult = await db.collection("TB_POST").doc(postId).remove();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("deletePost error", e);
  }

  return objResult;
}

module.exports = deletePost;
