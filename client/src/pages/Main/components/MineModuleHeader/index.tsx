import React, { useState, useEffect, Fragment } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import Api from "@/api";
import Config from "@/config";
import useCheckLogin from "@/hooks/useCheckLogin";
import useActions from "@/hooks/useActions";
import memberInfoActions from "@/redux/actions/memberInfo";
import Utils from "@/utils";

import "./index.less";

interface IMemberInfoType {
  _id?: string;
  userAvatarUrl?: string;
  userNickName?: string;
  appBindWorkerId?: string;
  objWorker?: any;
}
interface IMineModuleHeaderParam {
  isLoadComplete?: boolean;
  memberInfo?: IMemberInfoType;
}

export default function MineModuleHeader(props: IMineModuleHeaderParam) {
  const { isLoadComplete, memberInfo } = props;

  const systemInfo = Config.SYSTEM_INFO;
  const isMemberChecked = memberInfo?.appBindWorkerId;
  const { setMemberInfo } = useActions(memberInfoActions);

  // 登录
  const handleLoginClick = useCheckLogin((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleLoginClick");
  });

  // 更新用户信息
  const handleUpdateClick = () => {
    console.log("handleUpdateClick");

    Taro.getUserProfile({
      desc: "请授权您的个人信息",
      success: async (res) => {
        console.log("handleBtnLoginClick", res);
        const objUserInfo: any = res.userInfo;
        if (objUserInfo && !Utils.checkObjectEmpty(objUserInfo)) {
          Taro.showToast({
            title: "同步中",
            icon: "loading",
            duration: 20000,
            mask: true,
          });
          const params = {
            userNickName: objUserInfo.nickName, // 昵称*
            // userNickName: "滴滴答答过", // 昵称*
            userAvatarUrl: objUserInfo.avatarUrl, // 头像*
            userGender: objUserInfo.gender, // 性别*
            userCountry: objUserInfo.country, // 国家*
            userProvince: objUserInfo.province, // 省份*
            userCity: objUserInfo.city, // 城市*
            userLanguage: objUserInfo.language, // 语言*
            userCellphone: objUserInfo.cellphone, // 手机号
          };
          const data = await Api.cloud.fetchMemberInfo.updateMember(params);
          // console.log("handleUpdateClick updateMember", data);
          Taro.hideToast();
          if (data) {
            setMemberInfo(data);
            Taro.showToast({ title: "同步成功", icon: "success" });
          } else {
            Taro.showToast({ title: "同步失败", icon: "none" });
          }
        }
      },
    });
  };

  return (
    <View
      className="module-header-wrap"
      style={
        `height: ${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40 + 150) * 2,
          systemInfo.screenWidth
        )}; ` +
        `top: -${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40) * 2,
          systemInfo.screenWidth
        )}; ` +
        `margin-bottom: -${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40 + 20) * 2,
          systemInfo.screenWidth
        )}; `
      }
    >
      <View className="module-header-mask-circle1" />
      <View className="module-header-mask-circle2" />
      <View className="module-header-mask-circle3" />
      <View className="module-header-mask-circle4" />
      {memberInfo?._id ? (
        <View className="flex-center-h module-header-content">
          <View
            className="flex-center-v module-header-left"
            onClick={handleUpdateClick}
          >
            <Image
              src={memberInfo?.userAvatarUrl}
              mode="scaleToFill"
              className="module-header-left-logo"
            />
            <View className="flex-center-h module-header-logo-update">
              同步
            </View>
          </View>
          <View className="flex-center-v module-header-right">
            <View className="flex-start-h module-header-right-up">
              <Text className="text-ellipsis module-header-right-up-name">
                {memberInfo?.userNickName}
              </Text>
              {isMemberChecked ? (
                <Text className="text-nowrap module-header-checked checked-success">
                  已认证
                </Text>
              ) : (
                <Text className="text-nowrap module-header-checked checked-fail">
                  未认证
                </Text>
              )}
              {/* <Text className="text-nowrap module-header-right-up-level">
                Lv.1
              </Text> */}
            </View>
            {Utils.getTagName(memberInfo?.objWorker?.tag) && (
              <View className="module-header-right-down">
                <Text className="text-nowrap module-header-right-down-tag">
                  {Utils.getTagName(memberInfo?.objWorker?.tag)}
                </Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          className="flex-center-h module-header-content"
          onClick={handleLoginClick}
        >
          <Text className="module-header-login">登录即可享受更多服务</Text>
        </View>
      )}
    </View>
  );
}
