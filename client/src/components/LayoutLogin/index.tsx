import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { AtButton, AtFloatLayout } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Api from "@/api";
import useActions from "@/hooks/useActions";
import appInfoActions from "@/redux/actions/appInfo";
import memberInfoActions from "@/redux/actions/memberInfo";
import Utils from "@/utils";

import "./index.less";

interface ILayoutLoginParam {}

export default function LayoutLogin(props: ILayoutLoginParam) {
  const {} = props;

  const { objSourceInfo } = useSelector((state) => state.shareInfo);
  const { isShowLayoutLogin } = useSelector((state) => state.appInfo);

  const { setShowLayoutLogin } = useActions(appInfoActions);
  const { setMemberInfo } = useActions(memberInfoActions);

  const [isLogining, setLogining] = useState<boolean>(false);

  // 关闭浮动弹层
  const handleLayoutLoginClose = () => {
    setShowLayoutLogin(false);
  };

  const handleGetUserInfo = async (e) => {
    console.log("handleGetUserInfo", e);
    const objUserInfo = e.detail.userInfo;
    if (objUserInfo && !Utils.checkObjectEmpty(objUserInfo)) {
      setLogining(true);
      objUserInfo.shareSourceID = objSourceInfo.sourceID;
      objUserInfo.shareShareType = objSourceInfo.shareType;
      objUserInfo.shareSharePath = objSourceInfo.sharePath;
      const res = await Api.cloud.fetchMemberInfo.addMember(objUserInfo);
      console.log("handleGetUserInfo addMemberInfo", res);
      setMemberInfo(res.data);
      setLogining(false);
      setShowLayoutLogin(false);
      Taro.showToast({
        title: "登录成功",
        icon: "success",
      });
    }
  };

  const handleBtnLoginClick = async () => {
    Taro.getUserProfile({
      desc: "请授权您的个人信息",
      success: async (res) => {
        console.log("handleBtnLoginClick", res);
        const objUserInfo: any = res.userInfo;
        if (objUserInfo && !Utils.checkObjectEmpty(objUserInfo)) {
          setLogining(true);
          objUserInfo.shareSourceID = objSourceInfo.sourceID;
          objUserInfo.shareShareType = objSourceInfo.shareType;
          objUserInfo.shareSharePath = objSourceInfo.sharePath;
          const res = await Api.cloud.fetchMemberInfo.addMember(objUserInfo);
          console.log("handleGetUserInfo addMemberInfo", res);
          setLogining(false);
          setShowLayoutLogin(false);
          if (res && res.data) {
            setMemberInfo(res.data);
            Taro.showToast({
              title: "登录成功",
              icon: "success",
            });
          } else {
            Taro.showToast({
              title: "登录失败",
              icon: "none",
            });
          }
        }
      },
    });
  };

  return (
    <AtFloatLayout
      isOpened={isShowLayoutLogin}
      onClose={handleLayoutLoginClose}
    >
      <View className="layout-login-panel">
        <View className="layout-login-title">
          <Text className="iconfont iconpeople_fill layout-login-icon"></Text>
          <Text className="layout-login-title-text">班级圈圈</Text>
        </View>
        <AtButton
          openType="getUserInfo"
          type="primary"
          circle
          className="layout-login-btn"
          loading={isLogining}
          // onGetUserInfo={handleGetUserInfo}
          onClick={handleBtnLoginClick}
        >
          微信快捷登录
        </AtButton>
        <View
          className="flex-center-v layout-login-cancel"
          onClick={handleLayoutLoginClose}
        >
          <Text className="layout-login-cancel-text">暂不登录</Text>
        </View>
      </View>
    </AtFloatLayout>
  );
}
