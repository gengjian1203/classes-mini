// 云函数入口文件
const cloud = require("wx-server-sdk");
const cheerio = require("cheerio"); //进入cheerio模块
const charset = require("superagent-charset"); //解决乱码问题:
const superagent = require("superagent"); //发起请求
const Entities = require("html-entities").XmlEntities;

const entities = new Entities(); // 解析html
charset(superagent);

const sendEmail = require("sendEmail/index.js");
const spiderZhiHuInfo = require("spiderZhiHuInfo/index.js");
const spiderWeiXinInfo = require("spiderWeiXinInfo/index.js");

// 与小程序端一致，均需调用 init 方法初始化
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 可在入口函数外缓存 db 对象
const db = cloud.database();
// 屏蔽列表
const arrTitleBlackList = ["瞎扯 · "];

// 校验返回值
const validResult = (objTmp) => {
  return objTmp;
};

/**
 * 信息存入数据库
 */
const checkBlackString = (item) => {
  // 检验标题
  for (let itemTitle of arrTitleBlackList) {
    if (item.title.indexOf(itemTitle) >= 0) {
      return false;
    }
  }
  return true;
};

/**
 * 信息存入数据库
 */
const pushArticleInfoList = async (arrData, strDBTable) => {
  const arrResult = [];

  try {
    for (let item of arrData) {
      // 处于屏蔽列表的标题不予录入
      if (!checkBlackString(item)) {
        console.log("pushArticleInfoList checkBlackString", item.title);
        continue;
      }
      // 查询是否有相同的文章
      let objArticleInfo = null;
      try {
        objArticleInfo = await db
          .collection(strDBTable)
          .where({
            href: item.href,
          })
          .get();
      } catch (e) {
        console.error("queryArticleInfo error", e);
      }
      // 未录入过的文章，将其插入到数据库中
      if (objArticleInfo.data.length === 0) {
        const res = await db.collection(strDBTable).add({ data: item });
        arrResult.push(item);
      }
    }

    if (arrResult && arrResult.length > 0) {
      const arrArticleTitle = arrResult.map((item) => {
        return `《${item.title}》`;
      });
      const contentHTML =
        `尊敬的主人：<br>` +
        `你好！<br>` +
        `今天共为您爬取到${arrArticleTitle.length}篇文章，` +
        `分别为${arrArticleTitle.join(",")}。`;
      sendEmail(contentHTML);
    }
  } catch (e) {
    console.error("pushArticleInfoList error.", e, arrData);
  }

  return arrResult;
};

/**
 * 定时爬取文章
 * @param {*} event
 * @param {*} context
 */
// 云函数入口函数
exports.main = async (event, context) => {
  const { type = "", data = {} } = event || {};
  const { urlServce = "", strDBTable = "", tabId = "" } = data || {};
  let objResult = {};
  let arrData = [];
  let arrDataResult = [];
  let strDBTable = "TB_ARTICLE";

  try {
    switch (type) {
      case "ZHIHU":
        strDBTable = "TB_ARTICLE";
        arrData = await spiderZhiHuInfo(db, superagent, cheerio, entities);
        break;
      case "WEIXIN":
        strDBTable = "TB_WEATHER_ARTICLE";
        arrData = await spiderWeiXinInfo(
          db,
          superagent,
          cheerio,
          entities,
          urlServce
        );
        break;
      case "POST":
        strDBTable = "TB_POST";
        arrData = await spiderWeiXinInfo(
          db,
          superagent,
          cheerio,
          entities,
          urlServce,
          { tabId }
        );
        break;
      default:
        // 默认爬取知乎文章
        strDBTable = "TB_ARTICLE";
        arrData = await spiderZhiHuInfo(db, superagent, cheerio, entities);
        break;
    }
  } catch (e) {
    objResult = {
      code: 500,
      data: e,
    };
    console.error("爬取网上信息error.", e);
  }

  try {
    arrDataResult = await pushArticleInfoList(arrData, strDBTable);
  } catch (e) {
    objResult = {
      code: 500,
      data: e,
    };
    console.error("信息存入数据库error.", e);
  }

  objResult.data = arrDataResult;

  return validResult(objResult);
};
