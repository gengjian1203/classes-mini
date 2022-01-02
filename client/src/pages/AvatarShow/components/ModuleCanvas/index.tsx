import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Canvas } from "@tarojs/components";
import useThrottle from "@/hooks/useThrottle";
import Utils from "@/utils";

import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";
import { drawMainCanvas } from "../../utils/canvas";
import { getSelectType } from "../../utils/index";

import "./index.less";

interface IModuleCanvasProps {
  canvas: any;
  isShowPanelImageCropper: boolean;
  strSelectType: string;
  avatarShowInfo: any;
  setSelectType: (any?: any) => any;
  setSelectJewelry: (any?: any) => any;
  addAvatarJewelry: (any?: any) => any;
  removeAvatarJewelry: (any?: any) => any;
  updateAvatarJewelry: (any?: any) => any;
}

export default function ModuleCanvas(props: IModuleCanvasProps) {
  const {
    canvas,
    isShowPanelImageCropper,
    strSelectType,
    avatarShowInfo,
    setSelectType,
    setSelectJewelry,
    addAvatarJewelry,
    removeAvatarJewelry,
    updateAvatarJewelry,
  } = props;

  const { isShowPanelShare } = useSelector((state) => state.shareInfo);

  const [objTouchPoint, setTouchPoint] = useState<any>({
    nTouchStartX: 0, // 触摸点X起始坐标
    nTouchStartX_offset: 0, // 触摸点X偏移
    nTouchStartY: 0, // 触摸点Y起始坐标
    nTouchStartY_offset: 0, // 触摸点Y偏移
  });

  const isHideCanvas = isShowPanelImageCropper || isShowPanelShare; // 是否隐藏主Canvas组件 （Canvas层级过高）

  const addSameAvatarJewelry = async (objJewelry) => {
    const objJewelryTmp = {
      ...objJewelry,
      id: Utils.UUID(),
      rect: {
        ...objJewelry.rect,
        x: objJewelry.rect.x + 10,
        y: objJewelry.rect.y + 10,
      },
    };
    addAvatarJewelry(objJewelryTmp);
  };

  useEffect(() => {
    drawMainCanvas(canvas, strSelectType, avatarShowInfo, objTouchPoint);
  }, [canvas, strSelectType, avatarShowInfo, objTouchPoint]);

  // 饰品元素选中框，按钮事件响应
  const handleJewelryBorderButtonClick = (type) => {
    switch (type) {
      case "BTN_FLIP": {
        break;
      }
      case "BTN_DELETE": {
        removeAvatarJewelry(avatarShowInfo.objSelectJewelry);
        break;
      }
      case "BTN_ADD": {
        addSameAvatarJewelry(avatarShowInfo.objSelectJewelry);
        break;
      }
      case "BTN_RESIZE": {
        // ... 交互在拖拽处实现
        break;
      }
      case "MOVE": {
        break;
      }
      default: {
        break;
      }
    }
  };

  // Canvas触碰开始
  const handleCanvasTouchStart = (e) => {
    // console.log('handleCanvasTouchStart', e)
    // 初始化数据
    const point = e.touches[0];
    // 获取操作类型
    const objSelectType = getSelectType(point, avatarShowInfo);
    // console.log('getSelectType', objSelectType)
    if (!Utils.checkObjectEmpty(objSelectType)) {
      setSelectType(objSelectType.type);
      const nIndex = avatarShowInfo.arrAvatarJewelry.findIndex((item) => {
        return item.id === objSelectType.id;
      });
      if (nIndex >= 0) {
        setSelectJewelry(avatarShowInfo.arrAvatarJewelry[nIndex]);
      }
      // 点击事件的交互
      handleJewelryBorderButtonClick(objSelectType.type);
    } else {
      setSelectType("");
      setSelectJewelry({});
    }

    // 保存触摸的初始坐标
    setTouchPoint({
      nTouchStartX: point.x,
      nTouchStartY: point.y,
      nTouchStartX_offset: 0,
      nTouchStartY_offset: 0,
    });
  };

  // Canvas触碰移动
  const handleCanvasTouchMove = useThrottle((e) => {
    // console.log("handleCanvasTouchMove", strSelectType);
    if (
      strSelectType === "BTN_RESIZE" || // 改变饰品尺寸
      strSelectType === "MOVE" // 移动饰品位置
    ) {
      const point = e.touches[0];
      const objTouchPointTmp = {
        ...objTouchPoint,
        nTouchStartX_offset: point.x - objTouchPoint.nTouchStartX,
        nTouchStartY_offset: point.y - objTouchPoint.nTouchStartY,
      };
      // console.log("handleCanvasTouchMove", objTouchPointTmp);
      setTouchPoint(objTouchPointTmp);
    }
  }, 50);

  // Canvas触碰停止
  const handleCanvasTouchEnd = (e) => {
    // console.log('handleCanvasTouchEnd', e)
    // 移动饰品位置
    if (strSelectType === "MOVE") {
      const objSelectJewelryTmp = {
        ...avatarShowInfo.objSelectJewelry,
        rect: {
          x:
            avatarShowInfo.objSelectJewelry.rect.x +
            objTouchPoint.nTouchStartX_offset,
          y:
            avatarShowInfo.objSelectJewelry.rect.y +
            objTouchPoint.nTouchStartY_offset,
          width: avatarShowInfo.objSelectJewelry.rect.width,
          height: avatarShowInfo.objSelectJewelry.rect.height,
        },
      };
      // 落实饰品位置
      updateAvatarJewelry(objSelectJewelryTmp);
    }
    // 改变饰品尺寸
    else if (strSelectType === "BTN_RESIZE") {
      const nMaxOffsett =
        objTouchPoint.nTouchStartX_offset > objTouchPoint.nTouchStartY_offset
          ? objTouchPoint.nTouchStartX_offset
          : objTouchPoint.nTouchStartY_offset;

      const objSelectJewelryTmp = {
        ...avatarShowInfo.objSelectJewelry,
        rect: {
          x: avatarShowInfo.objSelectJewelry.rect.x,
          y: avatarShowInfo.objSelectJewelry.rect.y,
          width: avatarShowInfo.objSelectJewelry.rect.width + nMaxOffsett,
          height: avatarShowInfo.objSelectJewelry.rect.height + nMaxOffsett,
        },
      };
      // 落实饰品位置
      updateAvatarJewelry(objSelectJewelryTmp);
    } else {
    }

    // 初始化
    setTimeout(() => {
      setTouchPoint({
        nTouchStartX: 0,
        nTouchStartY: 0,
        nTouchStartX_offset: 0,
        nTouchStartY_offset: 0,
      });
    }, 0);
  };

  return (
    <Fragment>
      <View className="avatar-show-content flex-center-v">
        <Canvas
          canvasId="canvas"
          disableScroll
          style={
            // `${isShowPanelShare ? "position: fixed; " : ""}` +
            `${isHideCanvas ? "top: -9999px; " : ""}` +
            `${isHideCanvas ? "left: -9999px; " : ""}` +
            `width: ${CANVAS_WIDTH}px; ` +
            `height: ${CANVAS_HEIGHT}px; `
          }
          className="avatar-show-canvas"
          onTouchStart={handleCanvasTouchStart}
          onTouchMove={handleCanvasTouchMove}
          onTouchEnd={handleCanvasTouchEnd}
        />
      </View>
    </Fragment>
  );
}
