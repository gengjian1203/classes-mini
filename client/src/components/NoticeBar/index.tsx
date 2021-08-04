import React, { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Utils from "@/utils";

import "./index.less";

interface INoticeBarParam {
  content?: string;
  onNoticeBarClick?: any;
}

export default function NoticeBar(props: INoticeBarParam) {
  const { content = "", onNoticeBarClick } = props;

  const SIZE_WIDTH = 750; // 屏幕宽度
  const SIZE_FONT = 12; // 半角字符宽度
  const SIZE_STEP = 80; // 每步位移宽度

  const timerBKMove = useRef<NodeJS.Timeout>(null);
  const nLoopMax = useRef<number>(10); // 每次位移SIZE_STEP宽度
  const nLoopCurrentCount = useRef<number>(0);
  const [nLoopCurrent, setLoopCurrent] = useState<number>(0); // 当前循环次数
  const [isBKMove, setBKMove] = useState(true);

  useEffect(() => {
    timerBKMove.current = setInterval(() => {
      nLoopCurrentCount.current =
        (nLoopCurrentCount.current + 1) % nLoopMax.current;
      // console.log("nLoopCurrentTmp", nLoopCurrentCount.current);
      setLoopCurrent(nLoopCurrentCount.current);
      setBKMove(false);
      setTimeout(() => {
        setBKMove(true);
      }, 0);
    }, 700);
    return () => {
      if (timerBKMove.current) {
        clearInterval(timerBKMove.current);
      }
    };
  }, []);

  useEffect(() => {
    const length = Utils.getTextLength(content);
    nLoopMax.current = Math.ceil((SIZE_FONT * length + SIZE_WIDTH) / SIZE_STEP);
    // console.log("NoticeBar getLength", length, nLoopMax.current);
  }, [content]);

  const handleNoticeBarClick = (e) => {
    onNoticeBarClick && onNoticeBarClick(e);
  };

  return (
    <View
      className="flex-center-v notice-bar-wrap"
      onClick={handleNoticeBarClick}
    >
      <View className="flex-between-h notice-bar-panel">
        <View className="iconfont iconsystemprompt_fill notice-bar-icon" />
        <View className="notice-bar-content">
          <Text
            className={
              `notice-bar-content-text ` +
              `${isBKMove ? "notice-bar-content-text-move " : ""}`
            }
            style={{
              left: Taro.pxTransform(SIZE_WIDTH - SIZE_STEP * nLoopCurrent),
            }}
          >
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
}
