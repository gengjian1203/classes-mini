import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import DialogSpider from "@/components/DialogSpider";
import LayoutPicker from "@/components/LayoutPicker";

import "./index.less";

interface IButtonFloatParam {
  objDialogSpiderParentInfo?: any;
  onDialogSpiderSuccess?: (any?: any) => void;
}

export default function ButtonFloat(props: IButtonFloatParam) {
  const { objDialogSpiderParentInfo, onDialogSpiderSuccess } = props;

  const [isShowLayoutPickerPublish, setShowLayoutPickerPublish] = useState<
    boolean
  >(false);
  const [isShowDialogSpider, setDialogSpider] = useState<boolean>(false);

  // 点击发布按钮
  const handleBtnPublishClick = () => {
    setShowLayoutPickerPublish(true);
  };

  // 关闭发布选择弹窗
  const handleLayoutPickerClose = () => {
    setShowLayoutPickerPublish(false);
  };

  // 点击发布选择项
  const handleLayoutPickerItemClick = (item) => {
    console.log("handleLayoutPickerItemClick", item);
    switch (item.code) {
      case "WEIXIN": {
        setDialogSpider(true);
        break;
      }
      default: {
        break;
      }
    }
    setShowLayoutPickerPublish(false);
  };

  // 成功爬取文章回调
  const handleDialogSpiderSuccess = () => {
    onDialogSpiderSuccess && onDialogSpiderSuccess();
  };

  // 关闭爬取微信文章弹窗
  const handleDialogSpiderClose = () => {
    setDialogSpider(false);
  };

  return (
    <Fragment>
      {/* 发布按钮 */}
      <View className="safe-bottom flex-center-v tab-float-btn-panel">
        <ButtonIcon
          value="iconadd"
          width={100}
          height={100}
          radius={50}
          size={60}
          color="var(--color-primary)"
          onClick={handleBtnPublishClick}
        />
      </View>
      {/* 底部浮层选择 */}
      <LayoutPicker
        isShowLayoutPicker={isShowLayoutPickerPublish}
        arrPickerList={[{ title: "爬取微信文章", code: "WEIXIN" }]}
        onLayoutPickerClose={handleLayoutPickerClose}
        onLayoutPickerItemClick={handleLayoutPickerItemClick}
      />
      {/* 弹窗 */}
      {isShowDialogSpider && (
        <DialogSpider
          objParentInfo={objDialogSpiderParentInfo}
          onDialogSpiderSuccess={handleDialogSpiderSuccess}
          onDialogSpiderClose={handleDialogSpiderClose}
        />
      )}
    </Fragment>
  );
}
