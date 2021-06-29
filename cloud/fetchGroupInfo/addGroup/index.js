/**
 * addGroup
 * 新建班级
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 创建角色
const createGroup = async (data, db, strMemberId, date, time) => {
  let objResult = {};
  // 创建新用户
  const objGroup = {
    // 创建基本信息
    // 系统级
    sysCountLogin: 0, // 登录次数
    sysCreateDate: date, // 创建时间
    sysCreateTime: time, // 创建时间
    sysUpdateDate: date, // 修改时间
    sysUpdateTime: time, // 修改时间
    // 班级信息
    dataLogo: data.logo || "", // Logo
    dataTitle: data.title || "", // 班级名称
    dataDescribe: data.describe || "", // 班级描述
    dataAddress: data.address || "", // 班级地址
    // 模块模板
    moduleTemplate: [
      { type: "BANNER", content: "" },
      { type: "INFO", content: "" },
      { type: "NOTICE", content: "" },
      { type: "TAB", content: "" },
    ],
    // 冗余信息
    expandArrMasterList: [strMemberId], // 最高管理员
    expandArrAdminList: [], // 管理员
    expandArrStudentList: [], // 班级学生
    expandArrMemberList: [], // 班级家长
  };
  // 创建新的玩家信息
  try {
    console.log("createGroup1", objGroup);
    const res = await db.collection("TB_GROUP").add({ data: objGroup });
    console.log("createGroup2", res._id);
    objResult = {
      data: {
        ...objGroup,
        _id: res._id,
      },
    };
  } catch (e) {
    objResult = {
      data: e,
    };
    console.error("createGroup error", e);
  }

  return objResult;
};

async function addGroup(data, db, strMemberId) {
  let objResult = {};
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

  // 创建班级
  objResult = await createGroup(data, db, strMemberId, date, time);
  // 更新班级列表冗余

  return objResult;
}

module.exports = addGroup;
