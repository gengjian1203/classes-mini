import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AtActivityIndicator } from "taro-ui";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View, Image, Canvas } from "@tarojs/components";

import ButtonIcon from "@/components/ButtonIcon";
import Skeleton from "@/components/Skeleton";
import Mask from "@/components/Mask";
import useActions from "@/hooks/useActions";
import useCheckAuthorize from "@/hooks/useCheckAuthorize";
import useThrottle from "@/hooks/useThrottle";
import shareInfoActions from "@/redux/actions/shareInfo";
import QRCodeManager from "@/services/QRCodeManager";
import StorageManager from "@/services/StorageManager";
import ResourceManager from "@/services/ResourceManager";
import Utils from "@/utils";

import { PANEL_SHARE_WIDTH, PANEL_SHARE_HEIGHT } from "./utils/config";
import { drawCanvasShare } from "./utils/index";

import "./index.less";

interface IPanelShareProps {}

export default function PanelShare(props: IPanelShareProps) {
  const {} = props;

  const [isShowBtnRefresh, setShowBtnRefresh] = useState<boolean>(false);
  const [strSharePhotoUrl, setSharePhotoUrl] = useState<string>("");
  const [canvasShare, setCanvasShare] = useState<any>(null);

  const {
    isShowPanelShare,
    strShareTitle,
    strShareImage,
    objShareParam,
  } = useSelector((state) => state.shareInfo);
  const { setShareInfo } = useActions(shareInfoActions);

  const objMemberInfo = StorageManager.getStorageSync("memberInfo");

  const onLoad = () => {
    // 设置 canvas 对象
    setCanvasShare(Taro.createCanvasContext("canvas-share"));
  };

  const updateCanvasShare = async () => {
    setShowBtnRefresh(false);
    const [srcQRCode, strShareContentUrlTmp] = await Promise.all([
      QRCodeManager.getQRCode(objShareParam),
      await ResourceManager.getUrl(
        "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/share_thumb.jpg"
      ),
    ]);
    // console.log("updateCanvasShare", srcQRCode, strShareContentUrlTmp);
    await drawCanvasShare(canvasShare, strShareContentUrlTmp, srcQRCode, 2);
    canvasShare.draw(true, () => {
      // Taro.hideLoading();
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: PANEL_SHARE_WIDTH * 2,
        height: PANEL_SHARE_HEIGHT * 2,
        destWidth: PANEL_SHARE_WIDTH * 2,
        destHeight: PANEL_SHARE_HEIGHT * 2,
        fileType: "jpg",
        canvasId: "canvas-share",
        success: (resToCanvas) => {
          console.log("canvasToTempFilePath success.", resToCanvas);
          setSharePhotoUrl(resToCanvas.tempFilePath);
        },
        fail: (errToCanvas) => {
          console.log("canvasToTempFilePath fail.", errToCanvas);
          setShowBtnRefresh(true);
          Taro.showToast({ title: "生成海报失败", icon: "none" });
        },
      });
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    // console.log("PanelShare", isShowPanelShare);
    if (isShowPanelShare) {
      updateCanvasShare();
    }
    return () => {};
  }, [isShowPanelShare]);

  useShareAppMessage((res) => {
    const objShareParamDefault = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/Main/index",
    });
    console.log("useShareAppMessage1", objShareParam, objShareParamDefault);
    const title = strShareTitle || "分享一个小程序，快来看看吧！";
    const imageUrl =
      strShareImage ||
      "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/share_thumb.jpg";
    const path =
      objShareParam?.sharePathFull ||
      objShareParamDefault?.sharePathFull ||
      "/pages/Loading/index";

    console.log("useShareAppMessage2", path);

    return {
      title,
      imageUrl,
      path,
    };
  });

  const saveImage = () => {
    // console.log("handleSaveClick");
    Taro.getImageInfo({
      src: strSharePhotoUrl,
      success: (res) => {
        // console.log("getImageInfo res.", res);
        Taro.saveImageToPhotosAlbum({
          filePath: strSharePhotoUrl,
          success: (resSaveImage) => {
            // console.log("saveImageToPhotosAlbum res.", resSaveImage);
            Taro.showToast({
              title: "保存成功",
              icon: "success",
            });
          },
          fail: (errSaveImage) => {
            // console.log("saveImageToPhotosAlbum err.", errSaveImage);
            if (errSaveImage.errMsg !== "saveImageToPhotosAlbum:fail cancel") {
              Taro.showToast({
                title: "保存失败",
                icon: "none",
              });
            }
          },
        });
      },
      fail: (err) => {
        console.error("getImageInfo err.", err);
      },
    });
  };

  // 刷新海报图
  const handleBtnRefreshPhotoClick = () => {
    updateCanvasShare();
  };

  // 保存海报
  const handleSaveClick = useThrottle(
    useCheckAuthorize("scope.writePhotosAlbum", () => {
      if (strSharePhotoUrl) {
        saveImage();
      } else {
        if (isShowBtnRefresh) {
          handleBtnRefreshPhotoClick();
        } else {
          Taro.showToast({
            title: "海报生成中",
            icon: "none",
            mask: true,
            duration: 20000,
          });
        }
      }
    })
  );

  // 关闭分享
  const handlePanelShareClose = () => {
    setShareInfo({ isShowPanelShare: false });
  };

  return (
    <Fragment>
      {isShowPanelShare && (
        <Mask customClass="flex-start-v panel-share-content">
          {strSharePhotoUrl ? (
            // <Skeleton
            //   loading={!strSharePhotoUrl}
            //   animate={!isShowBtnRefresh}
            //   row={1}
            //   rowProps={{
            //     width: 2 * PANEL_SHARE_WIDTH,
            //     height: 2 * PANEL_SHARE_HEIGHT,
            //   }}
            //   customClass="panel-share-img"
            // >
            <Image
              className="panel-share-img"
              src={strSharePhotoUrl}
              mode="widthFix"
              showMenuByLongpress
            />
          ) : (
            // DOM模拟海报
            <View
              className="flex-start-v panel-share-simple-wrap"
              style={{
                width: Taro.pxTransform(2 * PANEL_SHARE_WIDTH),
                height: Taro.pxTransform(2 * PANEL_SHARE_HEIGHT),
              }}
            >
              <Image
                className="panel-share-img"
                src="cloud://dev-8panu.6465-dev-8panu-1300943416/resource/share_thumb.jpg"
                mode="aspectFill"
              />
              <View className="flex-center-h panel-share-simple-footer">
                <View className="panel-share-simple-footer-left">
                  <Image
                    className="panel-share-simple-footer-left-avatar"
                    src={objMemberInfo?.userAvatarUrl || ""}
                    mode="scaleToFill"
                  />
                  <View className="panel-share-simple-footer-left-text">
                    {objMemberInfo?.userNickName || ""}
                  </View>
                  <View className="panel-share-simple-footer-left-text">
                    分享给你一个小程序~
                  </View>
                </View>
                <View className="flex-center-v panel-share-simple-footer-right">
                  {isShowBtnRefresh ? (
                    <View className="panel-share-button-refresh">
                      <ButtonIcon
                        value="iconrefresh"
                        width={100}
                        height={100}
                        radius={50}
                        size={60}
                        color="#9e9e9e"
                        onClick={handleBtnRefreshPhotoClick}
                      />
                    </View>
                  ) : (
                    <AtActivityIndicator
                      size={64}
                      color="var(--color-gray-5)"
                    />
                  )}
                </View>
              </View>
            </View>
          )}

          {strSharePhotoUrl && (
            <View className="panel-share-text">长按图片，可快捷转发哦！</View>
          )}
          {/* 按钮区域 */}
          <View className="flex-around-h panel-share-footer">
            <View className="flex-between-v share-button">
              <ButtonIcon
                value="iconweixin"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#04be02"
                openType="share"
              />
              <View className="share-button-text">分享</View>
            </View>
            <View className="flex-between-v share-button">
              <ButtonIcon
                value="iconxiazai"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#0084ff"
                onClick={handleSaveClick}
              />
              <View className="share-button-text">保存</View>
            </View>
            <View className="flex-between-v share-button">
              <ButtonIcon
                value="iconshanchu2"
                width={100}
                height={100}
                radius={50}
                size={60}
                color="#f7b500"
                onClick={handlePanelShareClose}
              />
              <View className="share-button-text">关闭</View>
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
