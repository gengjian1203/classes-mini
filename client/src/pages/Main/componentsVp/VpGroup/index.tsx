import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";
import Api from "@/api";
import Banner from "@/components/Banner";
import Menu from "@/components/Menu";
import Tab from "@/components/Tab";
import GroupInfo from "@/pages/Main/components/GroupInfo";
import CloudFileManager from "@/services/CloudFileManager";

import "./index.less";

interface IVpGroupParam {
  isLoadComplete?: boolean;
  isTabListLoadComplete?: boolean;
  arrTabPostList?: any; // 帖子列表
  onTabChange?: (any?: any) => void; // 切换tab
}

export default function VpGroup(props: IVpGroupParam) {
  const {
    isLoadComplete = true,
    isTabListLoadComplete = true,
    arrTabPostList = [],
    onTabChange,
  } = props;

  const {
    configInfo: { strGroupId },
  } = useSelector((state) => state.appInfo);

  const [objGroupDetail, setGroupDetail] = useState<any>({});

  const onLoad = async () => {
    const params = {
      groupId: strGroupId,
    };
    const res = await Api.cloud.fetchGroupInfo.queryGroupDetail(params);
    console.log("VpGroup", res);
    setGroupDetail(res);
    // 如果有TAB类型，则触发加载第一项tab
    const nIndexTab = res?.moduleTemplate?.findIndex(
      (itemModule, indexModule) => {
        return itemModule.type === "TAB";
      }
    );
    if (nIndexTab >= 0) {
      const itemModule = res?.moduleTemplate[nIndexTab];
      if (itemModule?.content?.length > 0) {
        const itemTab = itemModule?.content[0];
        onTabChange && onTabChange(itemTab);
      }
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleBannerClick = (e) => {
    // console.log("handleBannerClick", e);
  };

  const handleTabChange = (objTab) => {
    // console.log("handleTabChange", objTab);
    onTabChange && onTabChange(objTab);
  };

  const renderGroupModule = () => {
    return objGroupDetail?.moduleTemplate?.map((itemModule, indexModule) => {
      let objAny: any = null;

      switch (itemModule.type) {
        case "BANNER": {
          objAny = itemModule?.content?.map((item, index) => {
            return {
              url: CloudFileManager.getCloudUrl(item),
            };
          });
          break;
        }
        case "INFO": {
          objAny = {
            dataAddress: objGroupDetail?.dataAddress,
            dataDescribe: objGroupDetail?.dataDescribe,
            dataLatitude: objGroupDetail?.dataLatitude,
            dataLongitude: objGroupDetail?.dataLongitude,
            dataLogo: objGroupDetail?.dataLogo,
            dataTitle: objGroupDetail?.dataTitle,
            dataCellphone: objGroupDetail?.dataCellphone,
          };
          break;
        }
        case "MENU": {
          objAny = itemModule?.content?.map((item, index) => {
            return {
              ...item,
              icon: CloudFileManager.getCloudUrl(item.icon),
            };
          });
          break;
        }
        case "TAB": {
          objAny = itemModule?.content;
          break;
        }
        default: {
          break;
        }
      }

      return {
        BANNER: (
          <Banner
            customClass="group-module-wrap"
            arrBannerList={objAny}
            key={`group-module-${indexModule}`}
            onBannerClick={handleBannerClick}
          />
        ),
        INFO: (
          <GroupInfo
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
            dataAddress={objAny?.dataAddress}
            dataDescribe={objAny?.dataDescribe}
            dataLatitude={objAny?.dataLatitude}
            dataLongitude={objAny?.dataLongitude}
            dataLogo={objAny?.dataLogo}
            dataTitle={objAny?.dataTitle}
            dataCellphone={objAny?.dataCellphone}
          />
        ),
        MENU: (
          <Menu
            customClass="group-module-wrap"
            showModuleValView={objAny}
            key={`group-module-${indexModule}`}
          />
        ),
        TAB: (
          <Tab
            isLoadCompleteList={isTabListLoadComplete}
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
            showModuleValView={objAny}
            arrList={arrTabPostList}
            onTabChange={handleTabChange}
          />
        ),
      }[itemModule.type];
    });
  };

  return (
    <View className="vp-group-wrap">
      <View className="flex-start-v vp-group-content">
        {renderGroupModule()}
      </View>
    </View>
  );
}
