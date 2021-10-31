import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import Skeleton from "@/components/Skeleton";

import "./index.less";

interface IMenuParam {
  isLoadComplete?: boolean;
  showModuleValView?: Array<any>;
  customClass?: string;
  onMenuItemClick?: (any?: any) => {};
}

export default function Menu(props: IMenuParam) {
  const {
    isLoadComplete = true,
    showModuleValView = [],
    customClass = "",
    onMenuItemClick = () => {},
  } = props;

  // 点击菜单项
  const handleMenuItemClick = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    onMenuItemClick && onMenuItemClick(item);
  };

  return (
    <View className={`flex-between-h menu-wrap ${customClass} `}>
      {isLoadComplete ? (
        <Fragment>
          {showModuleValView?.map((item, index) => (
            <View key={index} className="flex-center-v menu-item">
              <ButtonIcon
                value={item.icon}
                width={100}
                height={100}
                radius={20}
                size={50}
                color={item.color}
                onClick={(e) => handleMenuItemClick(e, item)}
              />
              <View className={`menu-item-title`}>{item.title}</View>
            </View>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <Skeleton
                key={index}
                loading={!isLoadComplete}
                type="column"
                avatar
                title
                titleWidth="80%"
                customClass="menu-item"
              />
            );
          })}
        </Fragment>
      )}
    </View>
  );
}
