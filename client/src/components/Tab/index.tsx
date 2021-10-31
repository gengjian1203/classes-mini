import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { View } from "@tarojs/components";
import ButtonFloat from "@/components/ButtonFloat";
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

  // 成功发布文章回调
  const handleDialogSpiderSuccess = () => {
    onTabListUpdate && onTabListUpdate();
  };

  useEffect(() => {
    console.log("Tab useEffect", tabCurrent);
    setDialogSpiderParentInfo(showModuleValView[tabCurrent]);
  }, [tabCurrent]);

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
          {isEasterEgg && (
            <ButtonFloat
              objDialogSpiderParentInfo={objDialogSpiderParentInfo}
              onDialogSpiderSuccess={handleDialogSpiderSuccess}
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
