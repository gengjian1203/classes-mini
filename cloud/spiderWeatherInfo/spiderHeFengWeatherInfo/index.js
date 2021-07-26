const superagent = require("superagent"); //发起请求

// 已废弃
// const href =
//   `http://apis.juhe.cn/simpleWeather/query` + // 聚合数据天气API接口 https://www.juhe.cn/box/index/id/73
//   `?city=%E9%95%BF%E6%98%A5` + // 默认查询长春
//   `&key=4f16f12c2fbe2255af5b17293e41df7f`; // 个人秘钥

const keyAPI = `98c7d5fe40de420182c5b43bb73583f6`; // 和风天气开发平台API接口秘钥 https://dev.qweather.com/
const location = `125.39,43.75`; // 长春净月培元学校

// 更新数据库天气数据表
const updateWeatherInfo = async (db, data) => {
  const daily = (data && data.daily) || [];
  // console.log("3. updateWeatherInfo daily", daily);
  try {
    for (let item of daily) {
      const res = await db
        .collection("TB_WEATHER_NORMAL")
        .where({ fxDate: item.fxDate })
        .get();
      // console.log("4. updateWeatherInfo res", res);
      if (res && res.data && res.data.length > 0) {
        // 有则直接更新
        await db
          .collection("TB_WEATHER_NORMAL")
          .where({ fxDate: item.fxDate })
          .update({ data: item });
        // console.log("5. updateWeatherInfo update", item);
      } else {
        // 没有直接添加
        await db.collection("TB_WEATHER_NORMAL").add({ data: item });
        // console.log("5. updateWeatherInfo add", item);
      }
    }
    objResult = future;
    // console.log("6. updateWeatherInfo", objResult);
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("updateWeatherInfo error", e);
  }
};

// 查询7日天气情况
const queryWeatherInfo = async (db) => {
  console.log("0. queryWeatherInfo");
  const href =
    `https://devapi.qweather.com/v7/weather/7d` +
    `?key=${keyAPI}` + // 个人秘钥
    `&location=${location}` + // 长春
    `&lang=zh` + // 多语言设置，中文
    `&unit=m`; // 度量衡单位参数，公制
  const res = await superagent.get(href).timeout(40000); //取决于网页的编码方式

  // console.log("1. queryWeatherInfo res", res.status);
  // return res;
  if (res && res.status === 200) {
    const data = JSON.parse(res.text);
    // console.log("2. queryWeatherInfo data", data);
    updateWeatherInfo(db, data);
    return data;
  }
};

// 更新数据库天气灾害表
const updateWarningInfo = async (db, data) => {
  const warning = (data && data.warning) || [];
  // console.log("3. updateWarningInfo warning", warning);
  try {
    for (let item of warning) {
      const res = await db
        .collection("TB_WEATHER_WARNING")
        .where({ id: item.id })
        .get();
      // console.log("4. updateWarningInfo res", res);
      if (res && res.data && res.data.length > 0) {
        // 有则直接更新
        await db
          .collection("TB_WEATHER_WARNING")
          .where({ id: item.id })
          .update({ data: item });
        // console.log("5. updateWarningInfo update", item);
      } else {
        // 没有直接添加
        await db.collection("TB_WEATHER_WARNING").add({ data: item });
        // console.log("5. updateWarningInfo add", item);
      }
    }
    objResult = future;
    // console.log("6. updateWarningInfo", objResult);
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("updateWarningInfo error", e);
  }
};

// 查询当前的灾害预警
const queryWarningInfo = async (db) => {
  console.log("0. queryWarningInfo");
  const href =
    `https://devapi.qweather.com/v7/warning/now` +
    `?key=${keyAPI}` + // 个人秘钥
    `&location=121.48,31.40` + // 长春
    `&lang=zh`; // 多语言设置，中文
  const res = await superagent.get(href).timeout(40000); //取决于网页的编码方式

  // console.log("1. queryWarningInfo res", res.status);
  // return res;
  if (res && res.status === 200) {
    const data = JSON.parse(res.text);
    // console.log("2. queryWarningInfo data", data);
    updateWarningInfo(db, data);
    return data;
  }
};

async function spiderHeFengWeatherInfo(data, db, strMemberId) {
  let objResult = {};
  const [resWeatherInfo = {}, resWarningInfo = {}] = await Promise.all([
    queryWeatherInfo(db),
    queryWarningInfo(db),
  ]);

  objResult = {
    weatherInfo: resWeatherInfo,
    warningInfo: resWarningInfo,
  };

  console.log("spiderHeFengWeatherInfo", objResult);

  return objResult;
}

module.exports = spiderHeFengWeatherInfo;
