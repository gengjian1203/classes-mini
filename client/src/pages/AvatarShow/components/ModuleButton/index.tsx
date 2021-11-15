import React, { Fragment, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AtButton, AtActionSheet, AtActionSheetItem } from "taro-ui";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import Api from "@/api";
import useCheckAuthorize from "@/hooks/useCheckAuthorize";
import useCheckLogin from "@/hooks/useCheckLogin";
import useThrottle from "@/hooks/useThrottle";
import ResourceManager from "@/services/ResourceManager";
import Utils from "@/utils";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_SAVE_WIDTH,
  CANVAS_SAVE_HEIGHT,
  arrActionSheetList,
} from "../../config";
import { drawCanvasSave } from "../../utils/canvasSave";

import "./index.less";

interface IModuleBottomProps {
  avatarShowInfo?: any;
  setAvatarImage?: (any?: any) => any;
  setSelectJewelry?: (any?: any) => any;
}

export default function ModuleButton(props: IModuleBottomProps) {
  const { avatarShowInfo, setAvatarImage, setSelectJewelry } = props;

  const memberInfo = useSelector((state) => state.memberInfo);

  const avatarUrl = useRef("");
  const [isShowActionSheet, setShowActionSheet] = useState<boolean>(false); // 是否展示弹窗
  const [canvasSave, setCanvasSave] = useState<any>(null);

  // 保存并导出头像
  const saveAndExportAvatar = () => {
    console.log("exportAndSaveAvatar");
    Taro.showLoading({
      title: "保存中...",
    });
    drawCanvasSave(canvasSave, avatarShowInfo);
    canvasSave.draw(true, () => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        destWidth: CANVAS_SAVE_WIDTH,
        destHeight: CANVAS_SAVE_HEIGHT,
        fileType: "jpg",
        canvasId: "canvas-save",
        success: (resToCanvas) => {
          console.log("resToCanvas", resToCanvas);
          // 保存到相册
          Taro.saveImageToPhotosAlbum({
            filePath: resToCanvas.tempFilePath,
            success: (resSaveImage) => {
              console.log("resSaveImage", resSaveImage);
              Taro.showToast({
                title: "保存成功",
                icon: "success",
                complete: (res) => {
                  // 打开分享面板
                  // onShowPanelShare(true, resToCanvas.tempFilePath);
                },
              });
            },
            fail: (err) => {
              Taro.showToast({
                title: "保存失败",
                icon: "none",
                complete: (res) => {
                  // 打开分享面板
                  // onShowPanelShare(true, resToCanvas.tempFilePath);
                },
              });
            },
          });
        },
        fail: (err) => {
          Taro.showToast({
            title: "保存失败",
            icon: "none",
          });
        },
      });
    });
  };

  // 点击使用自身头像
  const funToggleAvatar = () => {
    Taro.getUserProfile({
      desc: "请授权您的个人信息",
      complete: async (resUserProfile) => {
        console.log("handleBtnLoginClick", resUserProfile);
        const { userInfo }: any = resUserProfile || {};
        if (userInfo && !Utils.checkObjectEmpty(userInfo)) {
          console.log("handleBtnLoginClick", userInfo?.avatarUrl);
          setAvatarImage && setAvatarImage(userInfo?.avatarUrl);
        } else {
          Taro.showToast({
            title: "获取头像信息失败",
            icon: "none",
          });
        }
      },
    });
  };

  // 点击拍照
  const funToggleCamera = async () => {
    setAvatarImage && setAvatarImage(await Utils.chooseImage("camera", 1));
  };

  // 从手机相册选择
  const funToggleAlbum = async () => {
    setAvatarImage && setAvatarImage(await Utils.chooseImage("album", 1));
  };

  const onLoad = () => {
    // 设置 canvas 对象
    setCanvasSave(Taro.createCanvasContext("canvas-save"));
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 授权回调，无论是否同意都弹出弹窗
  const handleGetUserInfo = useThrottle(
    useCheckLogin(() => {
      setShowActionSheet(true);
    })
  );

  // 点击保存图片
  const handleButtonSaveClick = useThrottle(
    useCheckLogin(
      useCheckAuthorize("scope.writePhotosAlbum", () => {
        console.log("handleButtonSaveClick");
        // setSelectJewelry({});
        saveAndExportAvatar();
      })
    )
  );

  // 底部弹窗的关闭事件
  const handleActionSheetClose = () => {
    console.log("handleActionSheetClose");
    setShowActionSheet(false);
  };

  // 底部弹窗项的点击事件
  const handleActionSheetItemClick = (item) => {
    console.log("handleActionSheetItemClick", item);
    switch (item.code) {
      case "toggle-avatar":
        funToggleAvatar();
        break;
      case "toggle-camera":
        funToggleCamera();
        break;
      case "toggle-album":
        funToggleAlbum();
        break;
      default:
        break;
    }
    setShowActionSheet(false);
  };

  return (
    <Fragment>
      <View className={`avatar-show-button safe-bottom`}>
        <AtButton
          className="bottom-button"
          type="secondary"
          openType="getUserInfo"
          circle
          onClick={handleGetUserInfo}
        >
          更换图片
        </AtButton>
        <AtButton
          className="bottom-button"
          type="primary"
          circle
          onClick={handleButtonSaveClick}
        >
          保存分享
        </AtButton>
      </View>

      {/* 弹窗区 */}
      <AtActionSheet
        isOpened={isShowActionSheet}
        cancelText="取消"
        onCancel={handleActionSheetClose}
        onClose={handleActionSheetClose}
      >
        {arrActionSheetList.map((item, index) => {
          return (
            <AtActionSheetItem
              key={index}
              onClick={() => handleActionSheetItemClick(item)}
            >
              {item.name}
            </AtActionSheetItem>
          );
        })}
      </AtActionSheet>
    </Fragment>
  );
}
