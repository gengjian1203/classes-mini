import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtTabs, AtTabsPane, AtButton, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import ButtonIcon from "@/components/ButtonIcon";
import Dialog from "@/components/Dialog";
import LayoutPicker from "@/components/LayoutPicker";
import ListNode from "@/components/ListNode";
import Skeleton from "@/components/Skeleton";
import useDebounce from "@/hooks/useDebounce";

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
  const [isShowDialogSpiderWeiXin, setDialogSpiderWeiXin] = useState<boolean>(
    false
  );
  const [urlServceWeiXin, setUrlServceWeiXin] = useState<string>("");

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
        setDialogSpiderWeiXin(true);
        break;
      }
      default: {
        break;
      }
    }
    setShowLayoutPickerPublish(false);
  };

  // 关闭爬取微信文章弹窗
  const handleDialogSpiderWeiXinClose = () => {
    setDialogSpiderWeiXin(false);
  };

  // 输入微信公众号文章链接
  const handleUrlServceWeiXinChange = useDebounce((value) => {
    setUrlServceWeiXin(value);
  }, 100);

  // 点击爬取微信公众号文章
  const hanldeUrlServceWeiXinClick = async () => {
    Taro.showToast({
      title: "文章爬取中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    const params = {
      urlServce: urlServceWeiXin,
      tabId: showModuleValView[tabCurrent]?.id,
    };
    const res = await Api.cloud.fetchAppInfo.spiderPostInfo(params);
    console.log("handleUrl", res);
    Taro.hideToast();
    if (res && res.length > 0) {
      Taro.showToast({
        title: "爬取成功",
        icon: "success",
      });
      onTabListUpdate && onTabListUpdate();
    } else {
      Taro.showToast({
        title: "该文章已被收录，或搜索不到该文章。",
        icon: "none",
      });
    }
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
          {isShowDialogSpiderWeiXin && (
            <Dialog
              title="爬取微信公众号url"
              titleIcon="iconweixin"
              onDialogClose={handleDialogSpiderWeiXinClose}
            >
              <View className={`flex-center-h ` + `dialog-worker-wrap `}>
                {/* 员工编辑面板 */}
                <View className="dialog-worker-content">
                  <AtInput
                    border={false}
                    name="weixin_urlServce"
                    title="爬取公众号"
                    type="text"
                    placeholder="https://mp.weixin.qq.com/s/JsnvAFe6CNU5c8HbltbqAA"
                    value={urlServceWeiXin}
                    onChange={handleUrlServceWeiXinChange}
                  />
                  <AtButton
                    className=""
                    type="primary"
                    circle
                    onClick={hanldeUrlServceWeiXinClick}
                  >
                    爬取
                  </AtButton>
                </View>
              </View>
            </Dialog>
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
