import Taro from "@tarojs/taro";
import React from "react";
import { Canvas } from "@tarojs/components";

import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../utils/const";

import "./index.less";

interface IModuleCanvasSaveProps {}

export default function ModuleCanvasSave(props: IModuleCanvasSaveProps) {
  const {} = props;

  return (
    <Canvas
      canvasId="canvas-save"
      disableScroll
      style={
        `position: fixed; ` +
        `top: -9999px; ` +
        `left: -9999px; ` +
        `width: ${Taro.pxTransform(CANVAS_WIDTH * 2)}; ` +
        `height: ${Taro.pxTransform(CANVAS_HEIGHT * 2)}; `
      }
    />
  );
}
