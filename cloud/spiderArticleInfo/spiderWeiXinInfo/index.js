const Utils = require("../utils/index.js");
/**
 * spiderZhiHuInfo
 * 爬取知乎日报文章
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
  const arrImage = [];
  for (let index in listImage) {
    const objHtml = listImage.eq(index);
    const srcImage = objHtml.attr("data-src");
    if (srcImage) {
      arrImage.push(srcImage);
    }
  }
  console.log("posterImg", arrImage);
  objDetail.posterImg =
    arrImage && (arrImage[1] || arrImage[2] || arrImage[0] || "");

  return objDetail;
};

async function spiderWeiXinInfo(db, superagent, cheerio, entities, urlServce) {
  console.log("spiderWeiXinInfo");
  const arrResultList = [];

  const dateNow = Utils.getStringDate(new Date());

  const objInfo = {
    createDate: dateNow.date, // 创建时间
    createTime: dateNow.timeString, // 创建时间
  };

  const { title, author, content, posterImg } = await queryWeiXinInfoDetail(
    urlServce,
    superagent,
    cheerio,
    entities
  );
  objInfo.source = "WEIXIN"; // 文章来源
  objInfo.href = urlServce; // 文章Url
  objInfo.title = title;
  objInfo.author = author;
  objInfo.content = content;
  objInfo.posterImg = posterImg;

  arrResultList.push(objInfo);

  console.log("spiderWeiXinInfo", arrResultList);

  return arrResultList;
}

module.exports = spiderWeiXinInfo;
