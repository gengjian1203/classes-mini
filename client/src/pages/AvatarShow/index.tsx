import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import PageContent from "@/components/PageContent";
import PanelBottom from "@/components/PanelBottom";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import ResourceManager from "@/services/ResourceManager";
import Utils from "@/utils";

import ModuleButton from "./components/ModuleButton";
import ModuleCanvas from "./components/ModuleCanvas";
import ModuleCanvasSave from "./components/ModuleCanvasSave";
import ModuleJewelry from "./components/ModuleJewelry";

import { arrBorderButtonList, arrJewelryList } from "./config";
import { newAvatarShow, cleanAvatarShow } from "./utils";

import "./index.less";

interface IAvatarInfoType {
  strAvatarImage: string; // '', // 头像底图
  arrAvatarJewelry: Array<any>; // [], // 饰品列表(有序)
  // strSelectType: string; // '', // 操作状态 // 'BTN_FLIP' - 翻转 'BTN_DELETE' - 删除 'BTN_ADD' - 复制 'BTN_RESIZE' - 调整尺寸 'MOVE' - 拖动
  objSelectJewelry: any; // {}; // 选中饰品对象
}

export default function AvatarShow() {
  const { path, params } = useDecodeRouter();
  const { title = "" } = params || {};

  const memberInfo = useSelector((state) => state.memberInfo);

  const avatarUrlNow = useRef<string>("");
  const [canvas, setCanvas] = useState<any>(null);
  const [canvasSave, setCanvasSave] = useState<any>(null);
  const [strSelectType, setSelectType] = useState<string>("");
  const [nAvatarShowListPoint, setAvatarShowListPoint] = useState(0);
  const [arrAvatarShowList, setAvatarShowList] = useState<
    Array<IAvatarInfoType | never>
  >([]);

  // 初始化头像相关信息
  const initAvatarInfo = async (avatarUrl) => {
    if (avatarUrl) {
      avatarUrlNow.current = avatarUrl;
    }
    const avatarShowInfo = {
      strAvatarImage: await ResourceManager.getUrl(
        Utils.getHDAvatarUrl(avatarUrlNow.current)
      ), // 头像底图
      arrAvatarJewelry: [], // 饰品列表(有序)
      // strSelectType: "", // 操作状态 // 'BTN_FLIP'-翻转 'BTN_DELETE'-删除 'BTN_ADD'-复制 'BTN_RESIZE'-调整尺寸 'MOVE'-拖动
      objSelectJewelry: {}, // 选中饰品对象
    };
    console.log("initAvatarInfo", avatarShowInfo);
    const arrAvatarShowListTmp = [avatarShowInfo];

    setAvatarShowListPoint(0);
    setAvatarShowList(arrAvatarShowListTmp);
  };

  // 初始化选中边框按钮
  const initBorderButton = async () => {
    console.log("initBorderButton");
    const arrPromiseList: Array<Promise<string>> = [];
    arrBorderButtonList.map((itemButton, indexButton) => {
      arrPromiseList.push(
        ResourceManager.getUrl(itemButton.url).catch(() => {})
      );
    });

    const res = await Promise.all(arrPromiseList);
    console.log("initBorderButton res", res);
  };

  // 初始化饰品相关信息
  const initJewelryList = async () => {
    console.log("initJewelryList");
    const arrPromiseList: Array<Promise<string>> = [];
    arrJewelryList.map((itemTab, indexTab) => {
      if (itemTab?.list?.length > 0) {
        itemTab?.list?.map((itemJewelry, indexJewelry) => {
          arrPromiseList.push(
            ResourceManager.getUrl(itemJewelry.value).catch(() => {})
          );
        });
      }
    });
    const res = await Promise.all(arrPromiseList);
    console.log("initJewelryList res", res);
  };

  // 初始化头像秀信息
  const handleInitAvatarInfo = () => {
    initAvatarInfo(avatarUrlNow.current);
  };

  // 设置当前操作类型
  const handleSetSelectType = (strSelectTypeTmp) => {
    console.log("handleSetSelectType", strSelectTypeTmp);
    setSelectType(strSelectTypeTmp);
  };

  // 设置选中的挂件
  const handleSetSelectJewelry = (objJewelryTmp) => {
    console.log("handleSetSelectJewelry", objJewelryTmp);
    const arrAvatarShowListClone = Utils.deepClone(arrAvatarShowList);
    arrAvatarShowListClone[
      nAvatarShowListPoint
    ].objSelectJewelry = objJewelryTmp;

    setAvatarShowList(arrAvatarShowListClone);
  };

  // 新增头像秀挂件
  const handleAddAvatarJewelry = (objJewelryTmp) => {
    console.log("handleAddAvatarJewelry", objJewelryTmp);
    const { arrAvatarShowListClone, nAvatarShowListPointClone } = newAvatarShow(
      arrAvatarShowList,
      nAvatarShowListPoint
    );
    arrAvatarShowListClone[nAvatarShowListPointClone].arrAvatarJewelry.push(
      objJewelryTmp
    );
    arrAvatarShowListClone[
      nAvatarShowListPointClone
    ].objSelectJewelry = objJewelryTmp;

    setAvatarShowList(arrAvatarShowListClone);
    setAvatarShowListPoint(nAvatarShowListPointClone);
  };

  // 移除头像秀挂件
  const handleRemoveAvatarJewelry = (objJewelryTmp) => {
    console.log("handleRemoveAvatarJewelry");
    const { arrAvatarShowListClone, nAvatarShowListPointClone } = newAvatarShow(
      arrAvatarShowList,
      nAvatarShowListPoint
    );

    const objNewAvatarShow = arrAvatarShowListClone[nAvatarShowListPointClone];
    const nIndex = objNewAvatarShow.arrAvatarJewelry.findIndex((item) => {
      return item.id === objJewelryTmp.id;
    });
    if (nIndex >= 0) {
      // objNewAvatarShow.strSelectType = "";
      objNewAvatarShow.objSelectJewelry = {};
      objNewAvatarShow.arrAvatarJewelry.splice(nIndex, 1);
    }
    setSelectType("");
    setAvatarShowList(arrAvatarShowListClone);
    setAvatarShowListPoint(nAvatarShowListPointClone);
  };

  // 更新头像秀挂件
  const handleUpdateAvatarJewelry = (objJewelryTmp) => {
    console.log("handleUpdateAvatarJewelry");
    const { arrAvatarShowListClone, nAvatarShowListPointClone } = newAvatarShow(
      arrAvatarShowList,
      nAvatarShowListPoint
    );

    const objNewAvatarShow = arrAvatarShowListClone[nAvatarShowListPointClone];
    const nIndex = objNewAvatarShow.arrAvatarJewelry.findIndex((item) => {
      return item.id === objJewelryTmp.id;
    });
    if (nIndex >= 0) {
      objNewAvatarShow.objSelectJewelry = objJewelryTmp;
      objNewAvatarShow.arrAvatarJewelry[nIndex] = objJewelryTmp;
    }
    setSelectType("");
    setAvatarShowList(arrAvatarShowListClone);
    setAvatarShowListPoint(nAvatarShowListPointClone);
  };

  // 设置头像底片
  const handleSetAvatarImage = async (avatarUrl) => {
    initAvatarInfo(avatarUrl);
  };

  // 设置当前操作列表指针
  const handleSetAvatarShowListPoint = (nAvatarShowListPointTmp) => {
    console.log("handleSetAvatarShowListPoint");
    setAvatarShowListPoint(nAvatarShowListPointTmp);
  };

  const onLoad = async () => {
    // 设置 canvas 对象
    setCanvas(Taro.createCanvasContext("canvas"));
    setCanvasSave(Taro.createCanvasContext("canvas-save"));
    //
    initAvatarInfo(memberInfo.userAvatarUrl);
    initBorderButton();
    initJewelryList();
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
        strSelectType={strSelectType}
        avatarShowInfo={arrAvatarShowList[nAvatarShowListPoint]}
        setSelectType={handleSetSelectType}
        setSelectJewelry={handleSetSelectJewelry}
        addAvatarJewelry={handleAddAvatarJewelry}
        removeAvatarJewelry={handleRemoveAvatarJewelry}
        updateAvatarJewelry={handleUpdateAvatarJewelry}
      />
      {/* 饰品栏 */}
      <ModuleJewelry
        nAvatarShowListPoint={nAvatarShowListPoint}
        arrAvatarShowList={arrAvatarShowList}
        initAvatarInfo={handleInitAvatarInfo}
        setAvatarShowListPoint={handleSetAvatarShowListPoint}
        addAvatarJewelry={handleAddAvatarJewelry}
      />
      {/* 按钮区 */}
      <PanelBottom fixed isSafeBottom>
        <ModuleButton
          canvasSave={canvasSave}
          avatarShowInfo={arrAvatarShowList[nAvatarShowListPoint]}
          setAvatarImage={handleSetAvatarImage}
          setSelectJewelry={handleSetSelectJewelry}
        />
      </PanelBottom>

      {/* 屏外绘制保存的图片 */}
      <ModuleCanvasSave />
    </PageContent>
  );
}
