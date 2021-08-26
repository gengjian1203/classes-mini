import React, { useState, useEffect, Fragment } from "react";
import { AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import Dialog from "@/components/Dialog";
import Utils from "@/utils";

import "./index.less";

interface IWarningInfo {
  _id: string; // "14139e126100ac1400594e240d76286b";
  id: string; // "10119010420210728083327399883061";
  dateEndTime: string; // "2021-07-29T00:33:00.000Z";
  datePubTime: string; // "2021-07-28T00:33:00.000Z";
  dateStartTime: string; // "2021-07-28T00:33:00.000Z";
  endTime: string; // "2021-07-29T08:33+08:00";
  level: string; // "蓝色";
  pubTime: string; // "2021-07-28T08:33+08:00";
  related: string; // "10119010420210728002351260611224";
  sender: string; // "南京市气象台";
  simpleEndTime: string; // "2021-6-29 09:39:00"
  simplePubTime: string; // "2021-6-28 09:27:00"
  simpleStartTime: string; // "2021-6-28 09:39:00"
  startTime: string; // "2021-07-28T08:33+08:00";
  status: string; // "update";
  text: string; // "南京市气象台2021年07月28日08时33分变更发布暴雨蓝色预警信号：预计未来24小时内，我市六合区和浦口区等地的部分地区将出现12小时50毫米以上的降雨，其它地区将出现12小时10到30毫米的降雨。请注意防范。";
  timestampEndTime: number; // 1627518780000;
  timestampPubTime: number; // 1627432380000;
  timestampStartTime: number; // 1627432380000;
  title: string; // "南京市气象台发布暴雨蓝色预警[Ⅳ级/一般]";
  type: string; // "11B03";
  typeName: string; // "暴雨";
}

interface IHomeDialogWarningParam {
  warningInfoNow?: Array<IWarningInfo>;
  onDialogWarningClose?: any;
}

export default function HomeDialogWarning(props: IHomeDialogWarningParam) {
  const { warningInfoNow = [], onDialogWarningClose } = props;

  const [nCurrentFlash, setCurrentFlash] = useState(-1);

  // 闪烁指定项
  const flashItem = (index = -1, count = 0) => {
    setTimeout(() => {
      if (count > 0) {
        setCurrentFlash(index);
        setTimeout(() => {
          setCurrentFlash(-1);
          flashItem(index, count - 1);
        }, 1000);
      }
    }, 0);
  };

  // 关闭气象告警弹窗
  const handleDialogClose = (e) => {
    onDialogWarningClose && onDialogWarningClose(e);
  };

  // 长按告警信息
  const handleWarningItemLongPress = (item, index) => {
    // console.log("handleWarningItemLongPress", item);
    const strLineTitle = `标题：${item.title}`; // 告警标题
    const strLineTime =
      `时间：` + `${item.simpleStartTime} ~ ${item.simpleEndTime}`; // 告警时间
    const strLineTag = `标签：【${item.typeName}】、【${item.level}】`; // 告警标签
    const strLineDesc = `详细：${item.text}`; // 告警内容
    Taro.setClipboardData({
      data:
        `${strLineTitle}\n` +
        `${strLineTime}\n` +
        `${strLineTag}\n` +
        `${strLineDesc}\n`,
      success: () => {
        flashItem(index, 2);
      },
    });
  };

  return (
    <Dialog
      title="气象告警信息"
      titleIcon="iconwarning_fill"
      customClass="dialog-warning-content"
      isScrollY
      strShowBottomTip="长按可复制对应信息"
      onDialogClose={handleDialogClose}
    >
      {warningInfoNow &&
        warningInfoNow.map((item, index) => {
          return (
            <View
              className="dialog-warning-item"
              onLongPress={() => handleWarningItemLongPress(item, index)}
            >
              <View
                className={`${nCurrentFlash === index ? "item-flash " : ""}`}
              >
                <View className="dialog-warning-item-title">
                  <View className="dialog-warning-item-up-title-text">
                    {item.title}
                  </View>
                </View>
                <View className="dialog-warning-item-time">
                  <View className="dialog-warning-item-time-text">
                    {`${item.simpleStartTime} ~ ${item.simpleEndTime}`}
                  </View>
                </View>
                <View className="flex-start-h dialog-warning-item-tag">
                  <AtTag
                    size="small"
                    active
                    className="dialog-warning-item-tag-node"
                  >
                    {item.typeName}
                  </AtTag>
                  <AtTag
                    size="small"
                    active
                    className="dialog-warning-item-tag-node"
                  >
                    {item.level}
                  </AtTag>
                </View>
                <View className="dialog-warning-item-desc">
                  <View className="dialog-warning-item-desc-text">
                    {item.text}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </Dialog>
  );
}
