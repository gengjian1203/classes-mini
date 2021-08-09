import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AtList, AtListItem, AtSwipeAction } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import Api from "@/api";
import ConfigTag from "@/config/tag";
import PageContent from "@/components/PageContent";
import ListNode from "@/components/ListNode";
import usePermission from "@/hooks/usePermission";
import Utils from "@/utils";

import "./index.less";

export default function EditWorker() {
  const { params } = useRouter();

  const [arrTagList, setTagList] = useState([]);

  const memberInfo = useSelector((state) => state.memberInfo);

  const onLoad = () => {
    const arrTagListInfo = Object.keys(ConfigTag)
      .map((item) => {
        return ConfigTag[item];
      })
      .filter((item) => {
        return usePermission({ strCheckCompany: item.company });
      });
    const arrTagListName = arrTagListInfo.map((item) => {
      return item.name;
    });
    setTagList(arrTagListName);
  };

  useEffect(() => {
    onLoad();
    return () => {};
  }, []);

  // 选择职工类型
  const handleSelectWorkerTagClick = () => {
    console.log("handleSelectWorkerTagClick");
  };

  //
  const handlePickerChange = () => {};

  // 创建职工
  const handleCreateWorkerClick = () => {
    console.log("handleCreateWorkerClick");
  };

  const handleWorkerClick = (itemWorker, itemOptions) => {
    console.log("handleWorkerClick", itemWorker, itemOptions);
  };

  return (
    <PageContent
      strNavigationTitle="编辑职工"
      isShowLeftIcon
      isTransparent={false}
      customClass=""
    >
      <AtList>
        <Picker
          mode="selector"
          range={arrTagList}
          onChange={handlePickerChange}
        >
          <AtListItem
            iconInfo={{
              size: 24,
              color: "var(--color-primary)",
              value: "iconfont icongroup",
            }}
            title="职工类型"
            extraText="详细信息"
            arrow="right"
          />
        </Picker>
        <AtListItem
          iconInfo={{
            size: 24,
            color: "var(--color-primary)",
            value: "iconfont icongroup",
          }}
          title="创建职工"
          onClick={handleCreateWorkerClick}
        />
      </AtList>

      <ListNode
        isLoadCompleteList
        strType="WORKER"
        showBottomLoadingTip={false}
        arrList={[]}
        onDetailClick={() => {}}
      />
    </PageContent>
  );
}
