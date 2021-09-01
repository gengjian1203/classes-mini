const Utils = require("../utils/index.js");
/**
 * sendEmail
 * 发送邮件
 * @param {*} data
 * @param {*} db
 * @returns
 */

const nodemailer = require("nodemailer");

const sendEmail = async (contentHTML) => {
  const sendEmail = nodemailer.createTransport({
    host: "smtp.qq.com", //SMTP服务器地址
    port: 465, //端口号，通常为465，587，994，不同的邮件客户端端口号可能不一样
    secure: true, //如果端口是465，就为true;如果是其它就填false
    auth: {
      user: "gengjian1203@foxmail.com", //邮箱账号，填写已开启SMTP服务的邮箱地址即可
      pass: "zvrvmqavbcnnbhaa", //邮箱密码，不同的邮件系统可能机制不一样，QQ邮箱和网易邮箱为邮箱授权码
    },
  });
  const message = {
    from: "gengjian1203@foxmail.com", //填写发件邮箱地址
    to: "187076081@qq.com", //填写收件方的邮箱地址
    subject: `小程序云函数爬取日志${Utils.getStringDate().timeString}`,
    html: contentHTML, //html代码
  };
  try {
    const res = await sendEmail.sendMail(message);
    console.log("sendEmail res", res);
  } catch (e) {
    console.log("sendEmail error", e);
  }
  return;
};

module.exports = sendEmail;
