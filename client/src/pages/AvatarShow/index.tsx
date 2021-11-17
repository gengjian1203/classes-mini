import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import PageContent from "@/components/PageContent";
import PanelBottom from "@/components/PanelBottom";
import useActions from "@/hooks/useActions";
import useCheckLogin from "@/hooks/useCheckLogin";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import shareInfoActions from "@/redux/actions/shareInfo";
import ResourceManager from "@/services/ResourceManager";
import Utils from "@/utils";

import ModuleCanvas from "./components/ModuleCanvas";
// import ModuleJewelry from "./components/ModuleJewelry";
import ModuleButton from "./components/ModuleButton";
import ModuleCanvasSave from "./components/ModuleCanvasSave";

import "./index.less";

export default function AvatarShow() {
  const { path, params } = useDecodeRouter();
  const { title = "" } = params || {};

  const memberInfo = useSelector((state) => state.memberInfo);

  const [canvas, setCanvas] = useState<any>(null);
  const [canvasSave, setCanvasSave] = useState<any>(null);
  const [nAvatarShowListPoint, setAvatarShowListPoint] = useState(0);
  const [arrAvatarShowList, setAvatarShowList] = useState<any>([]);

  const { setShareInfo } = useActions(shareInfoActions);

  // 初始化头像相关信息
  const initAvatarInfo = async (avatarUrl) => {
    const avatarShowInfo = {
      strAvatarImage: await ResourceManager.getUrl(
        Utils.getHDAvatarUrl(avatarUrl)
      ), // 头像底图
      arrAvatarJewelry: [], // 饰品列表(有序)
      strSelectType: "", // 操作状态 // 'BTN_FLIP'-翻转 'BTN_DELETE'-删除 'BTN_ADD'-复制 'BTN_RESIZE'-调整尺寸 'MOVE'-拖动
      objSelectJewelry: {}, // 选中饰品对象
    };
    console.log("initAvatarInfo", avatarShowInfo);
    const arrAvatarShowListTmp = [avatarShowInfo];

    setAvatarShowList(arrAvatarShowListTmp);
  };

  // 分享弹窗
  const handleShowPanelShare = useCheckLogin(() => {
    const objShareParam = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/Main/index",
    });
    setShareInfo({
      isShowPanelShare: true,
      strShareCardTitle: "",
      strShareCardImage: "",
      objShareParam: objShareParam,
    });
  });

  //
  const handleSetSelectType = () => {
    console.log("handleSetSelectType");
  };

  const handleSetSelectJewelry = () => {
    console.log("handleSetSelectJewelry");
  };

  const handleAddAvatarJewelry = () => {
    console.log("handleAddAvatarJewelry");
  };

  const handleRemoveAvatarJewelry = () => {
    console.log("handleRemoveAvatarJewelry");
  };

  const handleUpdateAvatarJewelry = () => {
    console.log("handleUpdateAvatarJewelry");
  };

  const handleSetAvatarImage = async (avatarUrl) => {
    initAvatarInfo(avatarUrl);
    // const avatarShowInfo = {
    //   strAvatarImage: await ResourceManager.getUrl(avatarUrl), // 头像底图
    //   arrAvatarJewelry: [], // 饰品列表(有序)
    //   strSelectType: "", // 操作状态 // 'BTN_FLIP'-翻转 'BTN_DELETE'-删除 'BTN_ADD'-复制 'BTN_RESIZE'-调整尺寸 'MOVE'-拖动
    //   objSelectJewelry: {}, // 选中饰品对象
    // };
    // const arrAvatarShowListTmp = Utils.deepClone(arrAvatarShowList);
    // arrAvatarShowListTmp.push(avatarShowInfo);
    // setAvatarShowListPoint((prevCount) => {
    //   return prevCount + 1;
    // });
    // setAvatarShowList(arrAvatarShowListTmp);
  };

  const onLoad = async () => {
    initAvatarInfo(memberInfo.userAvatarUrl);
    // 设置 canvas 对象
    setCanvas(Taro.createCanvasContext("canvas"));
    setCanvasSave(Taro.createCanvasContext("canvas-save"));
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <PageContent
      customClass="avatar-show-wrap"
      isShowLeftIcon
      strNavigationTitle={title || "头像秀"}
    >
      {/* 头像主页面 */}
      <ModuleCanvas
        canvas={canvas}
        avatarShowInfo={arrAvatarShowList[nAvatarShowListPoint]}
        setSelectType={handleSetSelectType}
        setSelectJewelry={handleSetSelectJewelry}
        addAvatarJewelry={handleAddAvatarJewelry}
        removeAvatarJewelry={handleRemoveAvatarJewelry}
        updateAvatarJewelry={handleUpdateAvatarJewelry}
      />
      {/* 饰品栏 */}
      {/* <ModuleJewelry /> */}
      {/* 按钮区 */}
      <PanelBottom fixed isSafeBottom>
        <ModuleButton
          canvasSave={canvasSave}
          avatarShowInfo={arrAvatarShowList[nAvatarShowListPoint]}
          setAvatarImage={handleSetAvatarImage}
        />
      </PanelBottom>

      {/* 屏外绘制保存的图片 */}
      <ModuleCanvasSave />
    </PageContent>
  );
}
