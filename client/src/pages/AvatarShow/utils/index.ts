import Utils from "@/utils";

import {
  BORDER_BUTTON_SIZE,
  BORDER_BUTTON_RADIUS,
  LIMIE_AVATAR_SHOW_LIST,
} from "../config";

/**
 * 校验是否点击边框按钮上
 * @param point
 * @param avatarShowInfo
 */
const checkBorderButtonClick = (point, objSelectJewelry) => {
  const rect = objSelectJewelry.rect;
  const rectButtonUpLeft = {
    x: rect.x - BORDER_BUTTON_RADIUS,
    y: rect.y - BORDER_BUTTON_RADIUS,
    width: BORDER_BUTTON_SIZE,
    height: BORDER_BUTTON_SIZE,
  };
  const rectButtonUpRight = {
    x: rect.x + rect.width - BORDER_BUTTON_RADIUS,
    y: rect.y - BORDER_BUTTON_RADIUS,
    width: BORDER_BUTTON_SIZE,
    height: BORDER_BUTTON_SIZE,
  };
  const rectButtonDownLeft = {
    x: rect.x - BORDER_BUTTON_RADIUS,
    y: rect.y + rect.height - BORDER_BUTTON_RADIUS,
    width: BORDER_BUTTON_SIZE,
    height: BORDER_BUTTON_SIZE,
  };
  const rectButtonDownRight = {
    x: rect.x + rect.width - BORDER_BUTTON_RADIUS,
    y: rect.y + rect.height - BORDER_BUTTON_RADIUS,
    width: BORDER_BUTTON_SIZE,
    height: BORDER_BUTTON_SIZE,
  };
  // 逻辑判断
  if (
    point.x > rectButtonUpLeft.x &&
    point.x <= rectButtonUpLeft.x + rectButtonUpLeft.width &&
    point.y > rectButtonUpLeft.y &&
    point.y <= rectButtonUpLeft.y + rectButtonUpLeft.height
  ) {
    // console.log('checkBorderButtonClick ', 'BTN_FLIP')
    return "BTN_FLIP";
  } else if (
    point.x > rectButtonUpRight.x &&
    point.x <= rectButtonUpRight.x + rectButtonUpRight.width &&
    point.y > rectButtonUpRight.y &&
    point.y <= rectButtonUpRight.y + rectButtonUpRight.height
  ) {
    // console.log('checkBorderButtonClick ', 'BTN_DELETE')
    return "BTN_DELETE";
  } else if (
    point.x > rectButtonDownLeft.x &&
    point.x <= rectButtonDownLeft.x + rectButtonDownLeft.width &&
    point.y > rectButtonDownLeft.y &&
    point.y <= rectButtonDownLeft.y + rectButtonDownLeft.height
  ) {
    // console.log('checkBorderButtonClick ', 'BTN_ADD')
    return "BTN_ADD";
  } else if (
    point.x > rectButtonDownRight.x &&
    point.x <= rectButtonDownRight.x + rectButtonDownRight.width &&
    point.y > rectButtonDownRight.y &&
    point.y <= rectButtonDownRight.y + rectButtonDownRight.height
  ) {
    // console.log('checkBorderButtonClick ', 'BTN_RESIZE')
    return "BTN_RESIZE";
  } else {
    // console.log('checkBorderButtonClick ', '')
    return "";
  }
};

/**
 * 通过坐标来获取操作状况
 * @param point 坐标
 */
export const getSelectType = (point, avatarShowInfo) => {
  const arrAvatarJewelry = avatarShowInfo.arrAvatarJewelry;
  // 如果有选中的饰品，优先按钮的交互
  if (!Utils.checkObjectEmpty(avatarShowInfo.objSelectJewelry)) {
    const strCheck = checkBorderButtonClick(
      point,
      avatarShowInfo.objSelectJewelry
    );
    if (strCheck) {
      return {
        type: strCheck,
        id: avatarShowInfo.objSelectJewelry.id,
      };
    }
  }
  // 如果没有按钮的交互事件，再去选择其他饰品
  for (let index = arrAvatarJewelry.length - 1; index >= 0; index--) {
    const item = arrAvatarJewelry[index];
    const rect = arrAvatarJewelry[index].rect;
    // console.log(
    // 	'getSelectType',
    // 	point.x,
    // 	point.y,
    // 	item.rect.x,
    // 	item.rect.x + item.rect.width,
    // 	item.rect.y,
    // 	item.rect.y + item.rect.height
    // )
    if (
      point.x > rect.x &&
      point.x <= rect.x + rect.width &&
      point.y > rect.y &&
      point.y <= rect.y + rect.height
    ) {
      return {
        type: "MOVE",
        id: item.id,
      };
    }
  }
  return {};
};

/**
 * 新建操作记录
 * @param draft
 */
export const newAvatarShow = (arrAvatarShowList, nAvatarShowListPoint) => {
  // 清除废弃分支操作
  arrAvatarShowList.splice(nAvatarShowListPoint + 1, 9999);
  // 新建操作记录
  const objAvatarShowNew = Utils.deepClone(
    arrAvatarShowList[nAvatarShowListPoint]
  );
  arrAvatarShowList.push(objAvatarShowNew);
  nAvatarShowListPoint++;
  // 超出列表最大限制则弹出最古老操作记录
  if (arrAvatarShowList.length > LIMIE_AVATAR_SHOW_LIST) {
    arrAvatarShowList.shift();
    nAvatarShowListPoint--;
  }
  return Utils.deepClone({
    arrAvatarShowListClone: arrAvatarShowList,
    nAvatarShowListPointClone: nAvatarShowListPoint,
  });
};

/**
 * 清除头像为空的脏数据操作记录
 * @param draft
 */
export const cleanAvatarShow = (draft) => {
  if (draft.arrAvatarShowList.length >= 2) {
    if (draft.arrAvatarShowList[0].strAvatarImage === "") {
      draft.arrAvatarShowList.shift();
      draft.nAvatarShowListPoint--;
    }
  }
};

export default {
  getSelectType,
  newAvatarShow,
  cleanAvatarShow,
};
