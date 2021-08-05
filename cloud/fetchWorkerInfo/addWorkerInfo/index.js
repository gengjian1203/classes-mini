/**
 * addWorkerInfo
 * 新增注册员工信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 创建角色
const createWorker = async (data, db, strMemberId, date, time) => {
  // 创建新员工
  let objResult = {};
  const objWorker = {
    // 系统级
    sysUpdateDate: date, // 修改时间
    sysUpdateTime: time, // 修改时间
    // 身份级
    name: data.name, // 名称
    nameSimple: data.nameSimple, // 简称
    gender: data.gender, // 性别
    cellphone: data.cellphone, // 手机号
    tag: data.tag, // 身份标签
    //
    appBindMemberId: "", // 绑定小程序内身份
  };
  // 创建新的员工信息
  try {
    await db.collection("TB_WORKER").add({ data: objWorker });
    objResult = {
      code: 200,
      data: { data: objWorker },
    };
  } catch (e) {
    objResult = {
      code: 500,
      data: e,
    };
    console.error("addWorkerInfo error", e);
  }

  return objResult;
};

async function addWorkerInfo(data, db, strMemberId) {
  let objResult = {};
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

  try {
    objResult = await createWorker(data, db, strMemberId, date, time);
  } catch (e) {
    console.error("addWorkerInfo error", e);
  }

  return objResult;
}

module.exports = addWorkerInfo;
