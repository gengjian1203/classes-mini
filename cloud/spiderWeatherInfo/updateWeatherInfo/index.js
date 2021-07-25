const superagent = require("superagent"); //发起请求

const queryWeatherInfo = async () => {
  const href =
    `http://apis.juhe.cn/simpleWeather/query?` + // 聚合数据天气API接口 https://www.juhe.cn/box/index/id/73
    `city=%E9%95%BF%E6%98%A5` + // 默认查询长春
    `&key=4f16f12c2fbe2255af5b17293e41df7f`; // 个人秘钥
  const res = await superagent.get(href); //取决于网页的编码方式

  // console.log("1. queryWeatherInfo res", res);
  if (res && res.status === 200) {
    const data = JSON.parse(res.text);
    // console.log("2. queryWeatherInfo data", data);
    return data.result;
  }
};

async function updateWeatherInfo(data, db, strMemberId) {
  let objResult = {};
  const weatherInfo = (await queryWeatherInfo()) || {};

  const future = (weatherInfo && weatherInfo.future) || [];
  // console.log("3. queryWeatherInfo future", future);
  try {
    for (let item of future) {
      const res = await db
        .collection("TB_WEATHER")
        .where({ date: item.date })
        .get();
      // console.log("4. queryWeatherInfoTB res", res);
      if (res && res.data && res.data.length > 0) {
        // 有则直接更新
        await db
          .collection("TB_WEATHER")
          .where({ date: item.date })
          .update({ data: item });
        // console.log("5. queryWeatherInfoTB update", item);
      } else {
        // 没有直接添加
        await db.collection("TB_WEATHER").add({ data: item });
        // console.log("5. queryWeatherInfoTB add", item);
      }
    }
    objResult = future;
    // console.log("6. queryWeatherInfo future", objResult);
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("updateWeatherInfo error", e);
  }

  return objResult;
}

module.exports = updateWeatherInfo;
