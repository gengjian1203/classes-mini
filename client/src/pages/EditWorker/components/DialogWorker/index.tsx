import React, { useState, useEffect, Fragment } from "react";
import {
  AtForm,
  AtList,
  AtListItem,
  AtInput,
  AtButton,
  AtSearchBar,
} from "taro-ui";
import Taro from "@tarojs/taro";
import { View, Image, Text, Picker, ScrollView } from "@tarojs/components";
import Api from "@/api";
import Dialog from "@/components/Dialog";
import ListNode from "@/components/ListNode";
import ConfigTag from "@/config/tag";
import useDebounce from "@/hooks/useDebounce";
import Utils from "@/utils";

import "./index.less";

interface IWorkerInfo {
  appBindMemberId?: string; // ""
  cellphone?: string; // "9292922929"
  gender?: number; // 1
  name?: string; // "貂蝉"
  nameFirstLetter?: string; // "D"
  nameLetter?: string; //"DC"
  nameSimple?: string; //"貂蝉"
  arrMemberInfo?: Array<any>; // [{}]
  sysCreateDate?: string; // "2021-08-10T09:18:23.045Z";
  sysUpdateDate?: string; // "2021-08-10T09:18:23.045Z";
  sysUpdateTime?: string; // "2021-8-10 17:18:23";
  tag?: string; // "WEATHER_TIME";
  _id?: string; // "cd045e756112445f04cc2c873a0a97d3";
}

interface IDialogWorkerParam {
  workerInfo?: IWorkerInfo;
  arrTagNameList?: Array<string>;
  onDialogWorkerClose?: any;
}

const objWorkerGender = {
  1: "男",
  2: "女",
};

export default function DialogWorker(props: IDialogWorkerParam) {
  const { workerInfo = {}, arrTagNameList = [], onDialogWorkerClose } = props;

  const [isShowMemberList, setShowMemberList] = useState<boolean>(false);
  const [isShowMemberListFirst, setShowMemberListFirst] = useState<boolean>(
    true
  );
  // 第一分页
  const [strWorkerId, setWorkerId] = useState<string>("");
  const [strWorkerName, setWorkerName] = useState<string>("");
  const [strWorkerCellphone, setWorkerCellphone] = useState<string>("");
  const [strWorkerGender, setWorkerGender] = useState<number>(2);
  const [strWorkerTag, setWorkerTag] = useState<string>("");
  const [objBindMemberInfo, setBindMemberInfo] = useState<any>({});
  // 第二分页
  const [isLoadCompleteMemberList, setLoadCompleteMemberList] = useState<
    boolean
  >(false);
  const [strSearchMemberName, setSearchMemberName] = useState<string>("");
  const [arrMemberList, setMemberList] = useState<Array<any>>([]);
  const [nMemberCount, setMemberCount] = useState<number>(0);
  const [showMemberListLoadingTip, setMemberListLoadingTip] = useState<boolean>(
    false
  );

  useEffect(() => {
    setWorkerId(workerInfo?._id || "");
    setWorkerName(workerInfo?.name || "");
    setWorkerCellphone(workerInfo?.cellphone || "");
    setWorkerGender(workerInfo?.gender || 2);
    setWorkerTag(workerInfo?.tag || "");
    const objBindMemberInfoTmp = (workerInfo?.arrMemberInfo || [])[0] || {};
    setBindMemberInfo(objBindMemberInfoTmp);
  }, [workerInfo]);

  const resetPageMember = () => {
    setLoadCompleteMemberList(false);
    setSearchMemberName("");
    setMemberList([]);
    setMemberCount(0);
    setMemberListLoadingTip(false);
  };

  // 关闭职工编辑弹窗
  const handleDialogWorkerClose = (e) => {
    onDialogWorkerClose && onDialogWorkerClose(e);
  };

  // 姓名数值变化
  const handleNameChange = useDebounce((value) => {
    console.log("handleNameChange", value);
    setWorkerName(value);
  }, 200);

  // 手机数值变化
  const handleCellphoneChange = useDebounce((value) => {
    console.log("handleNameChange", value);
    setWorkerCellphone(value);
  }, 200);

  // 性别数值变化
  const handleGenderChange = useDebounce((e) => {
    console.log("handleGenderChange", e);
    const value = e?.detail?.value || "1"; // 默认取女
    const strWorkerGender = value === "1" ? 2 : 1; // 如果是'1'那就是女(2)，否则如果是字符'0'那就是男(1)
    setWorkerGender(strWorkerGender);
  }, 200);

  // 组别数值变化
  const handleTagNameChange = useDebounce((e) => {
    console.log("handleTagNameChange", e);
    const value = Number(e?.detail?.value || "0"); // 默认取第一项
    // const tagSelect = arrTagNameList[value] || "";
    const selectTagName = arrTagNameList[value] || "";
    let selectTagCode = "";
    Object.values(ConfigTag).forEach((itemConfig) => {
      if (selectTagName === itemConfig.name) {
        selectTagCode = itemConfig.code;
      }
    });
    setWorkerTag(selectTagCode);
  }, 200);

  // 搜索成员姓名
  const handleSearchMemberNameChange = useDebounce((value) => {
    console.log("handleNameChange", value);
    setSearchMemberName(value);
  }, 200);

  // 确认搜索
  const handleSearchMemberNameClick = useDebounce(async () => {
    setLoadCompleteMemberList(false);
    const param = {
      name: strSearchMemberName,
    };
    const res = await Api.cloud.fetchMemberInfo.queryMemberList(param);
    console.log("handleSearchMemberNameClick", res);
    const { dataList, totalCount } = res || {};
    const list = new Array(10).fill(dataList[0]);
    setMemberList(
      list.map((item) => {
        return {
          // ...item,
          name: item?.userNickName,
          logo: item?.userAvatarUrl,
        };
      })
    );
    setMemberCount(totalCount);
    setLoadCompleteMemberList(true);
  }, 200);

  const hanldeBtnBindClick = useDebounce(() => {
    console.log("hanldeBtnBindClick");
  }, 200);

  // 点击切换至绑定用户页面
  const handleBindMemberClick = (value) => {
    console.log("handleBindMemberClick", value);
    setShowMemberList(true);
    setShowMemberListFirst(false);
    handleSearchMemberNameClick();
  };

  // 点击切换回编辑员工页面
  const handleDialogWorkBackClick = (value) => {
    console.log("handleBindMemberClick", value);
    setShowMemberList(false);
    setTimeout(() => {
      resetPageMember();
    }, 500);
  };

  // 保存按钮
  const hanldeBtnSaveClick = () => {};

  // 创建按钮
  const hanldeBtnCreateClick = () => {};

  return (
    <Dialog
      title="职工信息"
      titleIcon="iconaddressbook_fill"
      onDialogClose={handleDialogWorkerClose}
      renderHeader={() => {
        return (
          isShowMemberList && (
            <View
              className="flex-center-v dialog-worker-back"
              onClick={handleDialogWorkBackClick}
            >
              <View className="iconfont iconreturn dialog-worker-back-icon" />
            </View>
          )
        );
      }}
    >
      <View
        className={
          `flex-center-h ` +
          `dialog-worker-wrap ` +
          `${
            isShowMemberList
              ? "animation-content-move "
              : isShowMemberListFirst
              ? ""
              : "animation-content-reset "
          }`
        }
      >
        {/* 员工编辑面板 */}
        <View className="dialog-worker-content">
          <AtInput
            name="name"
            border={false}
            title="姓名"
            type="text"
            placeholder="张三"
            value={strWorkerName}
            onChange={handleNameChange}
          />
          <AtInput
            name="cellphone"
            border={false}
            title="手机号码"
            type="phone"
            placeholder="手机号码"
            value={strWorkerCellphone}
            onChange={handleCellphoneChange}
          />
          <Picker
            mode="selector"
            range={["男", "女"]}
            onChange={handleGenderChange}
          >
            <AtListItem
              title="性别"
              extraText={objWorkerGender[strWorkerGender] || "女"}
              hasBorder={false}
              arrow="down"
            />
          </Picker>
          <Picker
            mode="selector"
            range={arrTagNameList}
            onChange={handleTagNameChange}
          >
            <AtListItem
              title="组别"
              extraText={ConfigTag[strWorkerTag]?.name || ""}
              hasBorder={false}
              arrow="down"
            />
          </Picker>
          <AtListItem
            title="绑定微信"
            extraText={objBindMemberInfo.userNickName}
            hasBorder={false}
            arrow="right"
            onClick={handleBindMemberClick}
          />
          {strWorkerId ? (
            <AtButton
              className="dialog-worker-btn"
              type="primary"
              circle
              onClick={hanldeBtnCreateClick}
            >
              保存
            </AtButton>
          ) : (
            <AtButton
              className="dialog-worker-btn"
              type="primary"
              circle
              onClick={hanldeBtnSaveClick}
            >
              创建
            </AtButton>
          )}
        </View>
        {/* 绑定成员面板 */}
        <View className="flex-center-v dialog-member-content">
          <AtSearchBar
            value={strSearchMemberName}
            placeholder="请输入微信昵称（如：张三）"
            showActionButton
            onChange={handleSearchMemberNameChange}
            onActionClick={handleSearchMemberNameClick}
          />
          <ScrollView scrollY className="dialog-member-scroll">
            <ListNode
              isLoadCompleteList={isLoadCompleteMemberList}
              strType="MEMBER"
              customClass="dialog-member-list"
              showBottomLoadingTip={showMemberListLoadingTip}
              arrList={arrMemberList}
            />
          </ScrollView>
          <AtButton
            className="dialog-worker-btn"
            type="primary"
            circle
            onClick={hanldeBtnBindClick}
          >
            绑定
          </AtButton>
        </View>
      </View>
    </Dialog>
  );
}
