import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";
import Api from "@/api";
import Banner from "@/components/Banner";
import GroupInfo from "@/pages/Main/components/GroupInfo";
import GroupNotive from "@/pages/Main/components/GroupNotive";
import GroupTab from "@/pages/Main/components/GroupTab";
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
    console.log("handleBannerClick", e);
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
          break;
        }
        case "NOTICE": {
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
            arrBannerList={objAny}
            key={`group-module-${indexModule}`}
            onBannerClick={handleBannerClick}
          />
        ),
        INFO: <GroupInfo key={`group-module-${indexModule}`} />,
        NOTICE: <GroupNotive key={`group-module-${indexModule}`} />,
        TAB: <GroupTab key={`group-module-${indexModule}`} />,
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
