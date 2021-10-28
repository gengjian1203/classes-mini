import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";
import Api from "@/api";
import Banner from "@/components/Banner";
import Menu from "@/components/Menu";
import Tab from "@/components/Tab";
import GroupInfo from "@/pages/Main/components/GroupInfo";
import GroupNotive from "@/pages/Main/components/GroupNotive";
import CloudFileManager from "@/services/CloudFileManager";

import "./index.less";

interface IVpGroupParam {
  isLoadComplete?: boolean;
}

export default function VpGroup(props: IVpGroupParam) {
  const { isLoadComplete = true } = props;

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
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleBannerClick = (e) => {
    // console.log("handleBannerClick", e);
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
        case "NOTICE": {
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
        NOTICE: (
          <GroupNotive
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
          />
        ),
        TAB: (
          <Tab
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
            showModuleValView={[
              { title: "全部" },
              { title: "日常" },
              { title: "推荐" },
            ]}
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
