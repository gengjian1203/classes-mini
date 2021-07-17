import React, { Fragment, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ModuleECharts from "@/components/ModuleECharts";
import PageContent from "@/components/PageContent";
import * as echarts from "@/componentsWx/ec-canvas/echarts";

import "./index.less";

export default function EChartsDemo() {
  const {
    path,
    params: { id = "" },
  } = useRouter();

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 是否加载完毕
  const [ec1, setEC1] = useState({});
  const [chart1, setChart1] = useState({});
  const [option1, setOption1] = useState({});
  const [ec2, setEC2] = useState({});
  const [chart2, setChart2] = useState({});
  const [option2, setOption2] = useState({});

  // 初始化图表
  const initChart1 = (canvas, width, height) => {
    const chartTmp = echarts.init(canvas, null, {
      width: width,
      height: height,
    });
    canvas.setChart(chartTmp);
    setChart1(chartTmp);
    console.log("initChart1", chartTmp);
    return chartTmp;
  };

  const initChart2 = (canvas, width, height) => {
    const chartTmp = echarts.init(canvas, null, {
      width: width,
      height: height,
    });
    canvas.setChart(chartTmp);
    setChart2(chartTmp);
    console.log("initChart2", chartTmp);
    return chartTmp;
  };

  useEffect(() => {
    Taro.hideShareMenu();
    setEC1({
      onInit: initChart1,
    });
    setEC2({
      onInit: initChart2,
    });
    setLoadComplete(true);
  }, []);

  const handleTestClick = () => {
    console.log("handleTestClick");
    const option = {
      title: {
        text: "堆叠区域图",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    setOption1(option);
    setOption2(option);
  };

  return (
    <PageContent
      strNavigationTitle="多ECharts视图demo"
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent
      customClass="flex-center-v e-charts-demo-wrap"
    >
      {isLoadComplete && (
        <Fragment>
          <View onClick={handleTestClick}>EChartsDemo EChartsDemo</View>
          <ModuleECharts
            idECharts="mychart-1"
            ec={ec1}
            chart={chart1}
            option={option1}
          />
          <View>11111</View>
          <ModuleECharts
            idECharts="mychart-2"
            ec={ec2}
            chart={chart2}
            option={option2}
          />
        </Fragment>
      )}
    </PageContent>
  );
}
