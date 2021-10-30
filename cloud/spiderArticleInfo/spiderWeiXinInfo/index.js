const Utils = require("../utils/index.js");
/**
 * queryWeiXinInfoDetail
 * 爬取微信公众号文章
 * @param {*} data
 * @param {*} db
 * @returns
 */

const queryWeiXinInfoDetail = async (href, superagent, cheerio, entities) => {
  const objDetail = {};
  const result = await superagent.get(href).charset("utf-8"); //取决于网页的编码方式
  // const data = result.text || ''
  const $ = cheerio.load(result.text);
  // console.log('queryWeiXinInfoDetail', data)
  // console.log("queryWeiXinInfoDetail", $);

  objDetail.title = $("#activity-name").html().replace(/\n/g, "").trim(); // 标题信息
  objDetail.author = $("#img-content .weui-wa-hotarea")
    .html()
    .replace(/\n/g, "")
    .trim(); // 作者信息
  objDetail.content = $("#img-content #js_content")
    .html()
    .replace(/\n/g, "")
    .trim();

  const listImage = $("#img-content").find("img");
  const arrImages = [];
  for (let index in listImage) {
    const objHtml = listImage.eq(index);
    const srcImage = objHtml.attr("data-src");
    if (srcImage) {
      arrImages.push(srcImage);
    }
  }
  console.log("posterImg", arrImages);
  objDetail.arrImages = Array.from(new Set(arrImages));
  objDetail.posterImg =
    (arrImages && (arrImages[1] || arrImages[2] || arrImages[0] || "")) || "";

  return objDetail;
};

async function spiderWeiXinInfo(
  db,
  superagent,
  cheerio,
  entities,
  urlServce,
  objExtend = {}
) {
  console.log("spiderWeiXinInfo");
  const arrResultList = [];

  const dateNow = Utils.getStringDate(new Date());
  const objDetail = await queryWeiXinInfoDetail(
    urlServce,
    superagent,
    cheerio,
    entities
  );

  const objInfo = {
    createDate: dateNow.date, // 创建时间
    createTime: dateNow.timeString, // 创建时间
    source: "WEIXIN", // 文章来源
    href: urlServce, // 文章Url
    ...objDetail,
    ...objExtend,
  };

  arrResultList.push(objInfo);

  console.log("spiderWeiXinInfo", arrResultList);

  return arrResultList;
}

module.exports = spiderWeiXinInfo;
