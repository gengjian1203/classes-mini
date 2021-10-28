import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
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
  onTabChange?: (any?: any) => void; // 切换tab
  onDetailClick?: (any?: any) => void; // 点击帖子
}

export default function Tab(props: ITabParam) {
  const {
    isLoadComplete = true,
    isLoadCompleteList = true,
    showModuleValView = [],
    arrList = [],
    showBottomLoadingTip = false,
    customClass = "",
    onTabChange,
    onDetailClick,
  } = props;

  const [tabCurrent, setTabCurrent] = useState<number>(0);

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
                  onDetailClick={handleDetailClick}
                />
              </AtTabsPane>
            ))}
          </AtTabs>
          {/* 分享浮动按钮 */}
          {isEasterEgg && (
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
