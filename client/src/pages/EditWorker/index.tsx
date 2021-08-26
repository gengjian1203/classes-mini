import React, { Fragment, useEffect, useRef, useState } from "react";
import { AtSearchBar } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Picker, Text } from "@tarojs/components";
import Api from "@/api";
import ConfigTag from "@/config/tag";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import ListNode from "@/components/ListNode";
import usePermission from "@/hooks/usePermission";
import useQueryPageList from "@/hooks/useQueryPageList";
import PinYin from "@/services/PinYin";
import Utils from "@/utils";

import DialogWorker from "./components/DialogWorker";

import "./index.less";

export default function EditWorker() {
  const { params } = useRouter();

  const arrTagInfoList = useRef<any>([]);
  const strSelectTagCode = useRef<any>("");

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 数据是否加载完毕
  const [showListLoadingTip, setShowListLoadingTip] = useState<boolean>(false); // 是否展示分页加载提示
  const [isShowDialogWorker, setShowDialogWorker] = useState<boolean>(false); // 是否展示编辑职工弹窗
  const [objEditWorkerInfo, setEditWorkerInfo] = useState<any>({}); // 创建/编辑 员工信息
  const [strSearchWorkerName, setSearchWorkerName] = useState<string>("");
  const [strSelectTagName, setSelectTagName] = useState<string>("");
  const [paramQueryWorkerList, setParamQueryWorkerList] = useState({});
  const [arrTagNameList, setTagNameList] = useState<Array<string>>([]);
  const [arrWorkerList, setWorkerList] = useState<Array<any>>([]);

  const onLoad = () => {
    arrTagInfoList.current = Object.keys(ConfigTag)
      .map((item) => {
        return ConfigTag[item];
      })
      .filter((item) => {
        return usePermission({ strCheckCompany: item.company });
      });
    const arrTagNameListTmp = arrTagInfoList.current.map((item) => {
      return item.name;
    });
    console.log("onLoad", arrTagInfoList.current, arrTagNameListTmp);
    setTagNameList(arrTagNameListTmp);
    if (arrTagInfoList.current && arrTagInfoList.current.length > 0) {
      const tagInfo = arrTagInfoList.current[0] || {};
      strSelectTagCode.current = tagInfo?.code || "";
      setSearchWorkerName("");
      setSelectTagName(tagInfo?.name || "");
      // 请求员工列表数据并渲染
      setParamQueryWorkerList({ tag: strSelectTagCode.current, name: "" });
    }
  };

  useQueryPageList(
    (res) => {
      const { state, list, totalCount } = res;
      console.log("useQueryPageList", state, list, totalCount);
      switch (state) {
        case "LOADING":
          Taro.showToast({
            title: "加载中",
            icon: "loading",
            duration: 20000,
            mask: true,
          });
          break;
        case "RESULT":
          setWorkerList(
            list.map((item) => {
              return {
                ...item,
                arrSign: item.appBindMemberId
                  ? [
                      {
                        text: "已绑定",
                        style: {
                          backgroundColor: "var(--color-golden-light)",
                          color: "var(--color-golden-dark)",
                          border: `${Taro.pxTransform(
                            2
                          )} solid var(--color-golden-dark)`,
                        },
                      },
                    ]
                  : [
                      {
                        text: "未绑定",
                        style: {
                          backgroundColor: "var(--color-gray-7)",
                          color: "var(--color-gray-4)",
                          border: `${Taro.pxTransform(
                            2
                          )} solid var(--color-golden-dark)`,
                        },
                      },
                    ],
                strLogoBGImage: Boolean(item?.gender !== 2)
                  ? "linear-gradient(135deg, var(--color-man), 80%, var(--color-white, #ffffff))"
                  : "linear-gradient(135deg, var(--color-woman), 80%, var(--color-white, #ffffff))",
              };
            })
          );
          setShowListLoadingTip(false);
          setLoadComplete(true);
          Taro.hideToast();
          break;
        case "REACH_BOTTOM":
          setShowListLoadingTip(true);
          break;
      }
    },
    Api.cloud.fetchWorkerInfo.queryWorkerList,
    paramQueryWorkerList
  );

  useEffect(() => {
    onLoad();
    return () => {};
  }, []);

  // 选择职工类型
  const handleSelectWorkerTagChange = (e) => {
    const current = Number(e.detail.value);
    if (current >= 0) {
      const tagInfo = arrTagInfoList.current[current] || {};
      strSelectTagCode.current = tagInfo?.code || "";
      console.log("handleSelectWorkerTagChange", tagInfo);
      setSearchWorkerName("");
      setSelectTagName(tagInfo?.name || "");
      // 请求员工列表数据并渲染
      setParamQueryWorkerList({ tag: strSelectTagCode.current, name: "" });
    }
  };

  // 搜索数值变化
  const handleSearchChange = (value) => {
    console.log("handleSearchChange", value);
    setSearchWorkerName(value);
  };

  //  点击搜索
  const handleSearchActionClick = () => {
    console.log("handleSearchActionClick");
    setParamQueryWorkerList({
      tag: strSelectTagCode.current,
      name: strSearchWorkerName,
    });
  };

  // 创建职工
  const handleCreateWorkerClick = () => {
    console.log("handleCreateWorkerClick");
    setShowDialogWorker(true);
    setEditWorkerInfo({});
  };

  // 编辑职工
  const handleWorkerEditClick = (info) => {
    console.log("handleWorkerClick", info);
    setShowDialogWorker(true);
    setEditWorkerInfo(info);
  };

  // 删除职工
  const handleWorkerDeleteClick = (info) => {
    console.log("handleWorkerDeleteClick", info);
  };

  // 关闭职工编辑弹窗
  const handleDialogWorkerClose = () => {
    setShowDialogWorker(false);
  };

  return (
    <PageContent
      strNavigationTitle="编辑职工"
      isShowLeftIcon
      isTransparent={false}
    >
      <View className="flex-center-h edit-worker-header">
        <Picker
          mode="selector"
          range={arrTagNameList}
          onChange={handleSelectWorkerTagChange}
        >
          <View className="text-nowrap edit-worker-tag-wrap">
            <Text className="edit-worker-tag-text">{strSelectTagName}</Text>
            <Text className="iconfont iconunfold edit-worker-tag-icon"></Text>
          </View>
        </Picker>
        <AtSearchBar
          value={strSearchWorkerName}
          placeholder="请输入姓名（如：张三）"
          showActionButton
          onChange={handleSearchChange}
          onActionClick={handleSearchActionClick}
        />
      </View>

      <View className="edit-worker-content">
        <ListNode
          isLoadCompleteList={isLoadComplete}
          strType="WORKER"
          showBottomLoadingTip={showListLoadingTip}
          arrList={arrWorkerList}
          onEditClick={handleWorkerEditClick}
          onDeleteClick={handleWorkerDeleteClick}
        />
      </View>

      {/* 创建浮动按钮 */}
      <View className="safe-bottom flex-center-v edit-worker-float-btn-panel">
        <ButtonIcon
          value="iconadd"
          width={100}
          height={100}
          radius={50}
          size={60}
          color="var(--color-primary)"
          onClick={handleCreateWorkerClick}
        />
      </View>

      {/* 编辑职工弹窗 */}
      {isShowDialogWorker && (
        <DialogWorker
          workerInfo={objEditWorkerInfo}
          arrTagNameList={arrTagNameList}
          onDialogWorkerClose={handleDialogWorkerClose}
        />
      )}
    </PageContent>
  );
}
