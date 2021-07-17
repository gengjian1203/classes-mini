import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IModuleEChartsParam {
  idECharts?: string;
  ec?: any;
  chart?: any;
  option?: any;
}

export default function ModuleECharts(props: IModuleEChartsParam) {
  const {
    idECharts = "mychart-area",
    ec = {},
    chart = {},
    option = {},
  } = props;

  useEffect(() => {
    console.log("ModuleECharts option", chart, option);
    chart && chart.setOption && chart.setOption(option);
  }, [option]);

  return (
    <View className="module-e-charts-wrap">
      <ec-canvas id={idECharts} canvas-id={idECharts} ec={ec} />
    </View>
  );
}
