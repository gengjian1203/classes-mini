import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View, Image, Canvas } from "@tarojs/components";

import ButtonIcon from "@/components/ButtonIcon";
import Mask from "@/components/Mask";
import useActions from "@/hooks/useActions";
import useCheckAuthorize from "@/hooks/useCheckAuthorize";
import useThrottle from "@/hooks/useThrottle";
import shareInfoActions from "@/redux/actions/shareInfo";
import QRCodeManager from "@/services/QRCodeManager";
import ResourceManager from "@/services/ResourceManager";
import Utils from "@/utils";

import { PANEL_SHARE_WIDTH, PANEL_SHARE_HEIGHT } from "./utils/config";
import { drawCanvasShare } from "./utils/index";

import "./index.less";

interface IPanelShareProps {}

export default function PanelShare(props: IPanelShareProps) {
  const {} = props;

  const [strSharePhotoUrl, setSharePhotoUrl] = useState<string>("");
  const [canvasShare, setCanvasShare] = useState<any>(null);

  const memberInfo = useSelector((state) => state.memberInfo);
  const {
    isShowPanelShare,
    strShareTitle,
    strShareImage,
    objShareParam,
  } = useSelector((state) => state.shareInfo);
  const { setShareInfo } = useActions(shareInfoActions);

  // 更新海报canvas
  // const updateCanvasShare = async () => {
  //   Taro.showLoading({
  //     title: "生成海报中",
  //     mask: true,
  //   });
  //   const strQRCodeUrlTmp = await ResourceManager.getUrl(
  //     await QRCodeManager.getQRCode(strSharePath)
  //   );
  //   const strShareContentUrlTmp = await ResourceManager.getUrl(strShareContentUrl);
  //   console.log(
  //     "updateCanvasShare strQRCodeUrl",
  //     strQRCodeUrlTmp,
  //     strShareContentUrlTmp
  //   );
  //   drawCanvasShare(canvasShare, strShareContentUrlTmp, strQRCodeUrlTmp, 2);
  //   canvasShare.draw(true, () => {
  //     Taro.hideLoading();
  //     Taro.canvasToTempFilePath({
  //       x: 0,
  //       y: 0,
  //       width: PANEL_SHARE_WIDTH * 2,
  //       height: PANEL_SHARE_HEIGHT * 2,
  //       destWidth: PANEL_SHARE_WIDTH * 2,
  //       destHeight: PANEL_SHARE_HEIGHT * 2,
  //       fileType: "jpg",
  //       canvasId: "canvas-share",
  //       success: (resToCanvas) => {
  //         console.log("resToCanvas", resToCanvas);
  //         setSharePhotoUrl(resToCanvas.tempFilePath);
  //       },
  //       fail: (err) => {
  //         Taro.showToast({
  //           title: "生成海报失败",
  //           icon: "none",
  //         });
  //       },
  //     });
  //   });
  // };

  const onLoad = () => {
    // 设置 canvas 对象
    setCanvasShare(Taro.createCanvasContext("canvas-share"));
  };

  const updateCanvasShare = async () => {
    const srcQRCode = await QRCodeManager.getQRCode(objShareParam);
    console.log("updateCanvasShare", srcQRCode);
    setSharePhotoUrl(srcQRCode);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    console.log("PanelShare", isShowPanelShare);
    if (isShowPanelShare) {
      updateCanvasShare();
    }
    return () => {};
  }, [isShowPanelShare]);

  useShareAppMessage((res) => {
    // const sharePath = processSharePath({
    // 	sharePath: path,
    // 	shareType: strShareType,
    // })
    console.log("useShareAppMessage1", objShareParam);
    const title = strShareTitle || "分享一个小程序，快来看看吧！";
    const imageUrl =
      strShareImage ||
      "http://image.mamicode.com/info/201808/20180828195242126065.png";
    const path = objShareParam?.sharePathFull || "/pages/Loading/index";
    console.log("useShareAppMessage2", path);

    return {
      title,
      imageUrl,
      path,
    };
  });

  // 保存海报
  const handleSaveClick = useThrottle(
    useCheckAuthorize("scope.writePhotosAlbum", () => {
      console.log("handleSaveClick");
      Taro.getImageInfo({
        src: strSharePhotoUrl,
        success: (res) => {
          console.log("getImageInfo res.", res);
          Taro.saveImageToPhotosAlbum({
            filePath: strSharePhotoUrl,
            success: (resSaveImage) => {
              console.log("saveImageToPhotosAlbum res.", resSaveImage);
              Taro.showToast({
                title: "保存成功",
                icon: "success",
              });
            },
            fail: (errSaveImage) => {
              console.log("saveImageToPhotosAlbum err.", errSaveImage);
              if (
                errSaveImage.errMsg !== "saveImageToPhotosAlbum:fail cancel"
              ) {
                Taro.showToast({
                  title: "保存失败",
                  icon: "none",
                });
              }
            },
          });
        },
        fail: (err) => {
          console.log("getImageInfo err.", err);
        },
      });
    })
  );

  // 关闭分享
  const handlePanelShareClose = () => {
    setShareInfo({ isShowPanelShare: false });
  };

  return (
    <Fragment>
      {isShowPanelShare && (
        <Mask>
          <View
            className={`share-content `}
            style={
              `width: ${PANEL_SHARE_WIDTH}px;` +
              `height: ${PANEL_SHARE_HEIGHT}px;`
            }
          >
            <Image
              className="share-img"
              style={
                `width: ${PANEL_SHARE_WIDTH}px;` +
                `height: ${PANEL_SHARE_HEIGHT}px;`
              }
              src={strSharePhotoUrl}
              mode="widthFix"
              showMenuByLongpress
            />
            {/* <AtButton className="content-btn-icon flex-center-v content-btn-left">
              <View className="iconfont iconicon-test1"></View>
            </AtButton> */}
            {/* <AtButton className="content-btn-icon flex-center-v content-btn-right">
              <View className="iconfont iconicon-test3"></View>
            </AtButton> */}
          </View>
          <View className="share-text">长按图片，可快捷转发哦！</View>
          {/* 按钮区域 */}
          <View className="share-button-wrap flex-around-h">
            <View className="share-button flex-between-v">
              <ButtonIcon
                value="iconweixin"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#04be02"
                openType="share"
              />
              <View className="btn-text">分享</View>
            </View>
            <View className="share-button flex-between-v">
              <ButtonIcon
                value="iconxiazai"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#0084ff"
                onClick={handleSaveClick}
              />
              <View className="btn-text">保存</View>
            </View>
            <View className="share-button flex-between-v">
              <ButtonIcon
                value="iconshanchu2"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#f7b500"
                onClick={handlePanelShareClose}
              />
              <View className="btn-text">关闭</View>
            </View>
          </View>

          {/* 屏外绘制分享的海报 */}
          <Canvas
            canvasId="canvas-share"
            disableScroll
            style={
              `position: fixed; ` +
              `top: -999px; ` +
              `left: -999px; ` +
              `width: ${PANEL_SHARE_WIDTH * 2}px; ` +
              `height: ${PANEL_SHARE_HEIGHT * 2}px; `
            }
          />
        </Mask>
      )}
    </Fragment>
  );
}
