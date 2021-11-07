import Taro from "@tarojs/taro";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useActions from "@/hooks/useActions";
import avatarShowInfoActions from "@/redux/actions/avatarShowInfo";
import memberActions from "@/redux/actions/memberInfo";
import webApi from "@/api";
import useCheckAuthorize from "@/hooks/useCheckAuthorize";
import useCheckLogin from "@/hooks/useCheckLogin";
import useThrottle from "@/hooks/useThrottle";
import { checkObjectEmpty, getHDAvatarUrl, uploadImage } from "@/utils/index";

import { View } from "@tarojs/components";
import { AtButton, AtActionSheet, AtActionSheetItem } from "taro-ui";

import { drawCanvasSave } from "../../utils/canvasSave";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_SAVE_WIDTH,
  CANVAS_SAVE_HEIGHT,
  arrActionSheetList,
} from "../../utils/const";

import "./index.less";

interface IModuleBottomProps {
  onShowPanelShare: any;
}

export default function ModuleButton(props: IModuleBottomProps) {
  const { onShowPanelShare = () => true } = props;

  const [isShowActionSheet, setShowActionSheet] = useState<boolean>(false); // 是否展示弹窗
  const [canvasSave, setCanvasSave] = useState<any>(null);

  const isPhoneX = useSelector((state) => state.appInfo.isPhoneX);
  const memberInfo = useSelector((state) => state.memberInfo);
  const avatarShowInfo = useSelector(
    (state) =>
      state.avatarShowInfo.arrAvatarShowList[
        state.avatarShowInfo.nAvatarShowListPoint
      ]
  );

  const { initAvatarInfo, setAvatarImage, setSelectJewelry } = useActions(
    avatarShowInfoActions
  );
  const { updateAvatarUrl } = useActions(memberActions);

  // 选择图片
  const chooseImage = (
    sourceType: "album" | "camera" | "user" | "environment"
  ) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [sourceType],
      success: async (resChoose) => {
        Taro.showLoading({
          title: "加载中...",
        });
        console.log("funToggleCamera", resChoose);
        if (
          resChoose.tempFiles[0] &&
          resChoose.tempFiles[0].size > 1024 * 1024
        ) {
          Taro.showToast({
            title: "图片不能大于1M",
            icon: "none",
          });
          return;
        }
        const strTempPath = resChoose.tempFilePaths[0];
        const res = await uploadImage(strTempPath, "temp/");
        console.log("uploadImage", res);
        Taro.hideLoading();
        if (res === "") {
          Taro.showToast({
            title: "图片上传失败，请重新上传",
            icon: "none",
          });
        } else if (res === "DANGER IMAGE") {
          Taro.showToast({
            title: "图片疑似有敏感内容，请更换其他图片",
            icon: "none",
          });
        } else {
          initAvatarInfo();
          setAvatarImage(strTempPath);
        }
      },
    });
  };

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
                  onShowPanelShare(true, resToCanvas.tempFilePath);
                },
              });
            },
            fail: (err) => {
              Taro.showToast({
                title: "保存失败",
                icon: "none",
                complete: (res) => {
                  // 打开分享面板
                  onShowPanelShare(true, resToCanvas.tempFilePath);
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
    Taro.downloadFile({
      url: getHDAvatarUrl(memberInfo.user_avatarUrl),
      success: (res) => {
        console.log("AvatarShow downloadFile", res);
        setAvatarImage(res.tempFilePath);
      },
    });
  };

  // 点击拍照
  const funToggleCamera = () => {
    chooseImage("camera");
  };

  // 从手机相册选择
  const funToggleAlbum = () => {
    chooseImage("album");
  };

  const onLoad = () => {
    // 设置 canvas 对象
    setCanvasSave(Taro.createCanvasContext("canvas-save"));
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 授权回调，无论是否同意都弹出弹窗。同意则拉取最新头像url，如果有变化同步更新Redux、异步更新数据库数据
  const handleGetUserInfo = async (e) => {
    const objUserInfo = e.detail.userInfo;
    if (objUserInfo && !checkObjectEmpty(objUserInfo)) {
      console.log("handleGetUserInfo", objUserInfo);
      if (objUserInfo.avatarUrl !== memberInfo.user_avatarUrl) {
        updateAvatarUrl(objUserInfo.avatarUrl);
        const param = {
          user_avatarUrl: objUserInfo.avatarUrl,
        };
        webApi.memberInfo.updateAvatarUrl(param);
      }
    }
    setShowActionSheet(true);
  };

  // 点击保存图片
  const handleButtonSaveClick = () => {
    console.log("handleButtonSaveClick");
    setSelectJewelry({});
    saveAndExportAvatar();
  };

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
      <View
        className={`avatar-show-button ` + `${isPhoneX ? "safe-bottom " : ""}`}
      >
        <AtButton
          className="bottom-button"
          type="secondary"
          openType="getUserInfo"
          circle
          onGetUserInfo={handleGetUserInfo}
        >
          更换头像
        </AtButton>
        <AtButton
          className="bottom-button"
          type="primary"
          circle
          onClick={useThrottle(
            useCheckLogin(
              useCheckAuthorize("scope.writePhotosAlbum", handleButtonSaveClick)
            )
          )}
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
