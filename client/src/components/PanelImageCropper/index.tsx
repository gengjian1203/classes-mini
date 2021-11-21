import React, { useState, useRef, useEffect } from "react";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import PanelBottom from "@/components/PanelBottom";
import Utils from "@/utils";

import "./index.less";

interface IPanelImageCropperParam {
  imgSrc: string;
  disableRotate?: boolean; // 禁止用户旋转
  limitMove?: boolean; // 限制图片移动范围(裁剪框始终在图片内)
  width?: number; // 裁剪框宽度
  height?: number; // 裁剪框高度
  disableWidth?: boolean; // 锁定裁剪框宽度
  disableHeight?: boolean; // 锁定裁剪框高度
  disableRatio?: boolean; // 锁定裁剪框比例
  exportScale?: number; // 输出图片的比例(相对于裁剪框尺寸)
  onImageCropperSave: (any?: any) => any;
  onImageCropperClose: (any?: any) => any;
}

export default function PanelImageCropper(props: IPanelImageCropperParam) {
  const {
    imgSrc,
    limitMove = true,
    disableRotate = true,
    width = 200,
    height = 200,
    disableWidth = false,
    disableHeight = false,
    disableRatio = false,
    exportScale = 6,
    onImageCropperSave,
    onImageCropperClose,
  } = props;

  const { context } = useDecodeRouter();

  const refCropper = useRef(null);

  // 等待 refCropper.current 实例绑定成功，不然首屏加载数据可能会失败
  const getCropperComplete = async () => {
    let result: any = null;
    for (let index = 0; index < 30; index++) {
      if (!refCropper.current) {
        refCropper.current = context.selectComponent("#image-cropper");
      }
      if (await Utils.asyncDelayBoolean(Boolean(refCropper.current))) {
        result = refCropper.current;
        // console.log("getCropperComplete bind success.", refCropper.current);
        break;
      } else {
        console.warn("getCropperComplete bind fail.", refCropper.current);
      }
    }
    return result;
  };

  useEffect(() => {
    Taro.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
  }, []);

  // 实例加载完毕
  const handleCropperLoad = () => {
    console.log("handleCropperLoad");
  };

  // 底片加载完毕
  const handleCropperImageLoad = async (e) => {
    console.log("handleCropperImageLoad", e);
    Taro.hideToast();
    // 重置图片角度、缩放、位置
    const cropper = await getCropperComplete();
    cropper?.imgReset();
  };

  // 点击裁剪区域
  const handleCropperCut = (e) => {
    // console.log("handleCropperCut", e);
    const { url = "" } = e?.detail || {};
    Taro.previewImage({
      current: url,
      urls: [url],
    });
  };

  // 点击重置
  const hanldeBtnResetClick = async () => {
    // console.log("hanldeBtnResetClick");
    const cropper = await getCropperComplete();
    cropper?.imgReset();
  };

  // 点击旋转
  const hanldeBtnRotateClick = async () => {
    console.log("hanldeBtnRotateClick");
    const cropper = await getCropperComplete();
    cropper.setAngle((cropper.data.angle -= 90));
  };

  // 点击保存
  const hanldeBtnSaveClick = async () => {
    // console.log("hanldeBtnSaveClick");
    const cropper = await getCropperComplete();
    cropper.getImg((img) => {
      console.log("hanldeBtnSaveClick", img.url);
      onImageCropperSave && onImageCropperSave(img?.url);
      onImageCropperClose && onImageCropperClose();
    });
  };

  // 点击返回
  const hanldeBtnBackClick = async () => {
    // console.log("hanldeBtnBackClick");
    onImageCropperClose && onImageCropperClose();
  };

  return (
    <View className="flex-start-v panel-image-cropper-wrap">
      <image-cropper
        id="image-cropper"
        imgSrc={imgSrc}
        disable_rotate={disableRotate}
        limit_move={limitMove}
        width={width}
        height={height}
        disable_width={disableWidth}
        disable_height={disableHeight}
        disable_ratio={disableRatio}
        export_scale={exportScale}
        onload={handleCropperLoad}
        onimageload={handleCropperImageLoad}
        ontapcut={handleCropperCut}
      />
      <PanelBottom
        fixed
        isSafeBottom
        customClass={`flex-center-v ` + `panel-image-cropper-footer `}
      >
        {/* 上部 */}
        <View className={`flex-center-v ` + `panel-image-cropper-footer-up `}>
          <View className="panel-image-cropper-tip">
            点击中间裁剪框，可预览裁剪后的图片
          </View>
        </View>
        {/* 下部 */}
        <View className={`flex-around-h ` + `panel-image-cropper-footer-down `}>
          <AtButton type="primary" onClick={hanldeBtnResetClick}>
            重置
          </AtButton>
          <AtButton type="primary" onClick={hanldeBtnRotateClick}>
            旋转
          </AtButton>
          <AtButton type="primary" onClick={hanldeBtnSaveClick}>
            保存
          </AtButton>
          <AtButton type="primary" onClick={hanldeBtnBackClick}>
            返回
          </AtButton>
        </View>
      </PanelBottom>
    </View>
  );
}
