// https://blog.csdn.net/XSFD_DFSX/article/details/81709020
const superagent = require("superagent"); //发起请求

// https://developer.work.weixin.qq.com/document/path/91770
const webhookQW =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=f75d5354-46dc-4c26-bd21-8736ea8107f8";

// https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN
const webhookTT =
  "https://open.feishu.cn/open-apis/bot/v2/hook/d5cc857b-7591-469f-9dfd-c9a8f3fbd897"; // 群
  // "https://open.feishu.cn/open-apis/bot/v2/hook/18e6eb6a-fb2e-4789-8580-aa88e93919de"; // 测试群

// 发送企微机器人消息
const sendQWMsg = async (db) => {
  const res = await superagent
    .post(webhookQW)
    .send({
      msgtype: "markdown",
      markdown: {
        content:
          `Dear all,\n` +
          `记得填写<font color="warning">日报</font>哦💪🏻\n` +
          `[http://mykfc.mlamp.cn/ECTM/#/Login](http://mykfc.mlamp.cn/ECTM/#/Login) `,
      },
    })
    .timeout(60000); //取决于网页的编码方式

  if (res && res.status === 200) {
    return res;
  } else {
    return res;
  }
};

// 发送飞书机器人消息
const sendTTMsg = async (db) => {
  const res = await superagent
    .post(webhookTT)
    .send({
      msg_type: "interactive",
      card: {
        config: {
          wide_screen_mode: true,
        },
        header: {
          template: "blue",
          title: {
            content: " 📅 准时打卡",
            tag: "plain_text",
          },
        },
        i18n_elements: {
          zh_cn: [
            {
              tag: "div",
              text: {
                content:
                  "Dear all,\n记得填写日报哦💪🏻\n请大家不要内卷，准时下班🐟",
                tag: "lark_md",
              },
            },
            {
              actions: [
                {
                  tag: "button",
                  text: {
                    content: "去填写日报",
                    tag: "plain_text",
                  },
                  type: "primary",
                  url: "http://mykfc.mlamp.cn/ECTM/#/Login/",
                },
              ],
              tag: "action",
            },
          ],
        },
      },
    })
    .timeout(60000); //取决于网页的编码方式

  if (res && res.status === 200) {
    return res;
  } else {
    return res;
  }
};

async function funDaily(data, db, strMemberId) {
  let objResult = {};
  const [resQWMsg = {}, resTTMsg = {}] = await Promise.all([
    sendQWMsg(db),
    sendTTMsg(db),
  ]);

  objResult = {
    resQWMsg,
    resTTMsg,
  };

  console.log("funDaily", objResult);

  return objResult;
}

module.exports = funDaily;
