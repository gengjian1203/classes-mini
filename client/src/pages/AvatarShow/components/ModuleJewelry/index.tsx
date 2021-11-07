import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useActions from "@/hooks/useActions";
import avatarShowInfoActions from "@/redux/actions/avatarShowInfo";
import { UUID } from "@/utils/index";
import ResourceManager from "@/services/ResourceManager";

import { View, Image, ScrollView } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";

import { CANVAS_WIDTH, CANVAS_HEIGHT, arrJewelryList } from "../../utils/const";

import "./index.scss";

interface IModuleJewelryProps {
  content?: string;
}

export default function ModuleJewelry(props: IModuleJewelryProps) {
  const {} = props;

  const [isDisableBtnBack, setDisableBtnBack] = useState<boolean>(false);
  const [isDisableBtnReturn, setDisableBtnReturn] = useState<boolean>(false);
  const [isDisableBtnClean, setDisableBtnClean] = useState<boolean>(false);
  const [isShowJewelryState, setShowJewelryState] = useState<boolean>(true);
  const [nTabCurrent, setTabCurrent] = useState<number>(0);

  const nAvatarShowListPoint = useSelector(
    (state) => state.avatarShowInfo.nAvatarShowListPoint
  );
  const arrAvatarShowList = useSelector(
    (state) => state.avatarShowInfo.arrAvatarShowList
  );

  const {
    initAvatarInfo,
    setAvatarImage,
    setAvatarShowListPoint,
    addAvatarJewelry,
    setSelectJewelry,
  } = useActions(avatarShowInfoActions);

  useEffect(() => {
    const isDisableBtnBackTmp = !(nAvatarShowListPoint > 0);
    const isDisableBtnReturnTmp = !(
      nAvatarShowListPoint <
      arrAvatarShowList.length - 1
    );
    const isDisableBtnCleanTmp = !(
      arrAvatarShowList[nAvatarShowListPoint].arrAvatarJewelry.length > 0
    );
    setDisableBtnBack(isDisableBtnBackTmp);
    setDisableBtnReturn(isDisableBtnReturnTmp);
    setDisableBtnClean(isDisableBtnCleanTmp);
  }, [nAvatarShowListPoint, arrAvatarShowList]);

  // 撤销操作
  const handleJewelryBackClick = () => {
    if (nAvatarShowListPoint > 0) {
      setAvatarShowListPoint(nAvatarShowListPoint - 1);
    } else {
      console.log("handleJewelryBackClick limit.");
    }
  };

  // 恢复操作
  const handleJewelryReturnClick = () => {
    if (nAvatarShowListPoint < arrAvatarShowList.length - 1) {
      setAvatarShowListPoint(nAvatarShowListPoint + 1);
    } else {
      console.log("handleJewelryReturnClick limit.");
    }
  };

  // 清除饰品的所有操作
  const handleJewelryCleanClick = () => {
    Taro.showModal({
      title: "提示",
      content: "是否要清除所有装饰？",
      success: (res) => {
        if (res.confirm) {
          const strAvatarImage =
            arrAvatarShowList[nAvatarShowListPoint].strAvatarImage;
          initAvatarInfo();
          setAvatarImage(strAvatarImage);
        }
      },
    });
  };

  // 切换饰品栏展示/隐藏状态
  const handleJewelryStateSwitch = () => {
    setShowJewelryState((prevState) => {
      return !prevState;
    });
  };

  // 点击饰品
  const handleJewelryCellClick = async (item) => {
    // console.log('handleJewelryCellClick', item)
    const nRandomX = Math.random() * (CANVAS_WIDTH - item.rect.width);
    const nRandomY = Math.random() * (CANVAS_HEIGHT - item.rect.height);
    const objJewelry = {
      ...item,
      id: UUID(),
      rect: {
        ...item.rect,
        x: item.rect.x !== undefined ? item.rect.x : nRandomX,
        y: item.rect.y !== undefined ? item.rect.y : nRandomY,
      },
      value: await ResourceManager.getUrl(item.value),
    };
    addAvatarJewelry(objJewelry);
    setSelectJewelry(objJewelry);
  };

  // 切换tab
  const handleSelectTabClick = (current) => {
    // console.log('handleSelectTabClick', current)
    setTabCurrent(current);
  };

  // 渲染饰品单元
  const renderJewelryCell = (itemCell) => {
    switch (itemCell.type) {
      case "TEXT":
        return <View className="content-text">{itemCell.value}</View>;
      case "IMAGE":
        return (
          <Image
            src={itemCell.valueEG ? itemCell.valueEG : itemCell.value}
            mode="widthFix"
            style="width: 100%;"
          />
        );
      default:
        return <View>{itemCell.value}</View>;
    }
  };

  return (
    <View
      className={
        `avatar-show-jewelry ` +
        `${
          isShowJewelryState
            ? "fade-in-from-bottom-avatar-show-jewelry-header"
            : "fade-out-from-bottom-avatar-show-jewelry-header"
        }`
      }
    >
      {/* 操作区 */}
      <View className="jewelry-header">
        <View className="header-module">
          <AtButton
            type="secondary"
            circle
            size="small"
            disabled={isDisableBtnBack}
            className="header-item flex-center-v iconfont iconshangyibu"
            onClick={handleJewelryBackClick}
          />
          <AtButton
            type="secondary"
            circle
            size="small"
            disabled={isDisableBtnReturn}
            className="header-item flex-center-v iconfont iconxiayibu"
            onClick={handleJewelryReturnClick}
          />
          <AtButton
            type="secondary"
            circle
            size="small"
            disabled={isDisableBtnClean}
            className="header-item flex-center-v iconfont iconshanchu1"
            onClick={handleJewelryCleanClick}
          />
        </View>
        <View className="header-module">
          <AtButton
            type="secondary"
            circle
            size="small"
            className={
              `header-item ` +
              `flex-center-v ` +
              `iconfont ` +
              `${isShowJewelryState ? "iconicon-test2 " : "iconicon-test "}`
            }
            onClick={handleJewelryStateSwitch}
          />
        </View>
      </View>
      {/* 饰品区 */}
      <AtTabs
        tabList={arrJewelryList}
        current={nTabCurrent}
        // scroll
        onClick={handleSelectTabClick}
      >
        {arrJewelryList.map((itemTab, indexTab) => {
          return (
            <AtTabsPane key={indexTab} current={nTabCurrent} index={indexTab}>
              <ScrollView className="jewelry-content" scrollX>
                {itemTab.list.map((itemCell, indexCell) => {
                  return (
                    <View
                      key={indexCell}
                      className="jewelry-item flex-center-v"
                      onClick={() => handleJewelryCellClick(itemCell)}
                    >
                      <View className="item-content flex-center-v">
                        {renderJewelryCell(itemCell)}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
}
