import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import DialogSpider from "@/components/DialogSpider";
import LayoutPicker from "@/components/LayoutPicker";
import ListNode from "@/components/ListNode";
import Skeleton from "@/components/Skeleton";

import "./index.less";

interface ITabParam {
  isLoadComplete?: boolean;
  isLoadCompleteList?: boolean;
  showModuleValView?: Array<any>;
  arrList?: any; // 帖子列表
  showBottomLoadingTip?: boolean; // 是否展示触底加载提示
  customClass?: string;
  onDetailClick?: (any?: any) => void; // 点击帖子
  onTabChange?: (any?: any) => void; // 切换tab
  onTabListUpdate?: (any?: any) => void;
}

export default function Tab(props: ITabParam) {
  const {
    isLoadComplete = true,
    isLoadCompleteList = true,
    showModuleValView = [],
    arrList = [],
    showBottomLoadingTip = false,
    customClass = "",
    onDetailClick,
    onTabChange,
    onTabListUpdate,
  } = props;

  const [tabCurrent, setTabCurrent] = useState<number>(0);
  const [isShowLayoutPickerPublish, setShowLayoutPickerPublish] = useState<
    boolean
  >(false);
  const [isShowDialogSpider, setDialogSpider] = useState<boolean>(false);
  const [objDialogSpiderParentInfo, setDialogSpiderParentInfo] = useState<any>(
    {}
  );

  const { isEasterEgg } = useSelector((state) => state.appInfo);

  // 切换tab
  const handleTabChange = (current) => {
    if (tabCurrent === current) {
      return;
    }
    setTabCurrent(current);
    onTabChange && onTabChange(showModuleValView[current]);
  };

  // 点击帖子
  const handleDetailClick = (item) => {
    onDetailClick && onDetailClick(item);
  };

  // 点击发布按钮
  const handleBtnPublishClick = () => {
    console.log("handleBtnPublishClick", arrList[tabCurrent]);
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
        setDialogSpiderParentInfo(showModuleValView[tabCurrent]);
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
    onTabListUpdate && onTabListUpdate();
  };

  // 关闭爬取微信文章弹窗
  const handleDialogSpiderClose = () => {
    setDialogSpider(false);
  };

  return (
    <View className={`tab-wrap ${customClass} `}>
      {isLoadComplete ? (
        <Fragment>
          <AtTabs
            animated
            current={tabCurrent}
            scroll={showModuleValView.length > 5}
            tabList={showModuleValView}
            onClick={handleTabChange}
          >
            {showModuleValView.map((item, index) => (
              <AtTabsPane current={tabCurrent} index={index} key={index}>
                <ListNode
                  isLoadCompleteList={isLoadCompleteList}
                  strType={item?.type || "MOMENT"}
                  arrList={arrList}
                  showBottomLoadingTip={showBottomLoadingTip}
                  customClass="tab-list-wrap"
                  onDetailClick={handleDetailClick}
                />
              </AtTabsPane>
            ))}
          </AtTabs>
          {/* 发布按钮 */}
          {(true || isEasterEgg) && (
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
          )}
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
      ) : (
        <View className="flex-between-h">
          {[0, 1, 2].map((item, index) => {
            return (
              <Skeleton
                key={index}
                row={1}
                rowProps={{ width: "30%", height: 20 }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
