import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AtButton, AtNoticebar } from "taro-ui";
import Calendar from "taro-calendar-customizable";
import { View, Image } from "@tarojs/components";
import Api from "@/api";
import ConfigTag from "@/config/tag";
import Permission from "@/components/Permission";
import usePermission from "@/hooks/usePermission";
import HomeDialogWarning from "@/pages/Main/components/HomeDialogWarning";
import HomeModuleWeather from "@/pages/Main/components/HomeModuleWeather";
import HomeModuleWorker from "@/pages/Main/components/HomeModuleWorker";
import GlobalManager from "@/services/GlobalManager";
import Utils from "@/utils";

import {
  getMonthFromDayString,
  getWorkerIdNew,
  formatWorkerInfo,
} from "./utils";

import "./index.less";

interface IVpHomeParam {
  isLoadComplete?: boolean;
}

const customStyleGenerator = (params) => {
  // console.log("customStyleGenerator", params);
  const isToday = params.fullDateStr === GlobalManager?.nowDate?.todayString;
  return {
    dateStyle: {
      backgroundColor: params.selected ? "var(--color-primary)" : "",
      height: "2.3rem",
    },
    lunarStyle: {
      textDecorationColor: isToday
        ? "var(--color-primary-dark)"
        : "transparent",
      textDecorationLine: isToday ? "underline" : "none",
    },
  };
};

export default function VpHome(props: IVpHomeParam) {
  const { isLoadComplete = true } = props;

  const taskListLocal = useRef([]); // 月份为键的任务字典表，为缓存请求的数据
  const weatherMonthListLocal = useRef({}); // 月份为键的天气字典表，为缓存请求的数据
  const workerMapLocal = useRef({}); // 月份为键的天气字典表，为缓存请求的数据

  const [isLoadCompleteWeather, setLoadCompleteWeather] = useState(false); // 天气组件的数据是否加载完成标识
  const [isShowDialogWarning, setShowDialogWarning] = useState(false);
  const [strSelectDay, setSelectDay] = useState(
    GlobalManager.nowDate.todayString || "2021-01-01"
  ); // 日历组件选中日期
  const [strSelectMonth, setSelectMonth] = useState(
    GlobalManager.nowDate.monthString || "2021-01-01"
  ); // 日历组件选中月份
  const [warningListNow, setWarningListNow] = useState<any>([]); // 本日的气象告警信息
  const [weatherItemDay, setWeatherItemDay] = useState({}); // 选中当天的气象数据
  const [arrTaskItemWeatherTime, setTaskItemWeatherTime] = useState([]); // 选中当天的短时任务数据

  const memberInfo = useSelector((state) => state.memberInfo);

  // 缓存请求到的员工信息放入字典中
  const setWorkerMapLocal = async (month) => {
    const arrWorkerIdNew = getWorkerIdNew(
      taskListLocal.current[month],
      workerMapLocal.current
    );
    if (arrWorkerIdNew && arrWorkerIdNew.length > 0) {
      const params = { arrId: arrWorkerIdNew };
      const resWorker = await Api.cloud.fetchWorkerInfo.queryWorker(params);
      // console.log("queryWorker", resWorker);
      for (let item of resWorker) {
        workerMapLocal.current[item._id] = item;
      }
    }
  };

  // 以月为单位请求首页数据
  const queryHomeInfo = async (month = "none") => {
    if (weatherMonthListLocal.current[month] || taskListLocal.current[month]) {
      return;
    }
    // 请求接口数据
    const objTaskType = {};
    Object.keys(ConfigTag)
      .filter((item) => {
        return usePermission({ strCheckCompany: ConfigTag[item].company });
      })
      .map((item) => {
        objTaskType[item] = true;
      });
    // console.log("queryHomeInfo arrTaskType", objTaskType);
    const res = await Api.cloud.fetchAppInfo.queryHomeInfo({
      objTaskType: objTaskType,
      month: month,
    });
    // console.log("VpHome queryHomeInfo", res);

    // 通过数据进行渲染
    const { taskList = {}, weatherMonthList = {}, warningList = {} } =
      res || {};
    taskListLocal.current[month] = (taskList && taskList?.data) || [];
    weatherMonthListLocal.current[month] =
      (weatherMonthList && weatherMonthList?.data) || [];
    await setWorkerMapLocal(month);
    setWarningListNow((warningList && warningList?.data) || []);
    // setWarningListNow(new Array(10).fill(warningList?.data[0]));
  };

  // 渲染指定日期的相关数据
  const setDayInfo = async (dayString = "") => {
    if (dayString) {
      const month = getMonthFromDayString(dayString);
      const arrTaskList = taskListLocal.current[month] || [];
      const arrWeatherList = weatherMonthListLocal.current[month] || [];

      const taskItem = arrTaskList.find((item) => {
        return item.fxDate === dayString;
      });
      const weatherItem = arrWeatherList.find((item) => {
        return item.fxDate === dayString;
      });
      // console.log("setDayInfo", taskItem, weatherItem);
      setSelectDay(dayString);
      setWeatherItemDay(weatherItem);
      const arrTaskItemWeatherTimeTmp = formatWorkerInfo(
        workerMapLocal.current,
        taskItem,
        ConfigTag["WEATHER_TIME"]?.code || ""
      );
      // console.log("setDayInfo", taskItem, arrTaskItemWeatherTimeTmp);
      setTaskItemWeatherTime(arrTaskItemWeatherTimeTmp);
    }
  };

  const onLoad = async () => {
    GlobalManager.nowDate = Utils.getStringDate(new Date());
    const month = getMonthFromDayString(GlobalManager.nowDate.monthString);
    await queryHomeInfo(month);
    setDayInfo(GlobalManager.nowDate.todayString);
    setLoadCompleteWeather(true);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 点击告警条
  const handleWarningItemClick = (item) => {
    // console.log("handleWarningItemClick", item);
    setShowDialogWarning(true);
  };

  // 点击日历指定日期
  const handleCalendarDayClick = (value) => {
    // console.log("handleCalendarDayClick", value);
    const dayString = value?.value;
    setDayInfo(dayString);
  };

  // 日历切换回调事件
  const handleCalendarCurrentViewChange = (value) => {
    // console.log("handleCalendarCurrentViewChange", value);
    const month = getMonthFromDayString(value);
    setSelectMonth(value);
    queryHomeInfo(month);
  };

  // 回到今天按钮事件
  const hanldeBtnTodayClick = () => {
    // console.log("hanldeBtnTodayClick");
    setDayInfo(GlobalManager.nowDate.todayString);
    setSelectMonth(GlobalManager.nowDate.monthString);
    handleCalendarCurrentViewChange(GlobalManager.nowDate.monthString);
  };

  // 模态对话框
  const handleDialogWarningClick = () => {
    setShowDialogWarning(false);
  };

  return (
    <View className="vp-home-content">
      {/* 天气预警组件 */}
      <View className="vp-home-content-module">
        {warningListNow &&
          warningListNow.map((item, index) => {
            return (
              <View
                key={`notice-bar-${index}`}
                onClick={() => handleWarningItemClick(item)}
              >
                <AtNoticebar icon="volume-plus" single>
                  {item.title}
                </AtNoticebar>
              </View>
            );
          })}
      </View>
      {/* 天气组件 */}
      <View className="vp-home-content-module">
        <HomeModuleWeather
          isLoadComplete={isLoadCompleteWeather}
          strSelectDay={strSelectDay}
          weatherInfoDay={weatherItemDay}
        />
      </View>
      {/* 日历组件 */}
      <View className="vp-home-content-module">
        <Calendar
          selectedDate={strSelectDay}
          currentView={strSelectMonth}
          mode="lunar"
          marks={[
            { value: "2021-08-11", color: "red", markSize: "9px" },
            { value: "2021-08-12", color: "pink", markSize: "9px" },
            { value: "2021-08-13", color: "gray", markSize: "9px" },
            { value: "2021-08-14", color: "yellow", markSize: "9px" },
            { value: "2021-08-15", color: "darkblue", markSize: "9px" },
            { value: "2021-08-16", color: "pink", markSize: "9px" },
            { value: "2021-09-17", color: "green", markSize: "9px" },
          ]}
          extraInfo={[
            { value: "2021-09-21", text: "生日", color: "red" },
            { value: "2021-09-22", text: "休假", color: "darkblue" },
            { value: "2021-09-23", text: "会议", color: "gray" },
          ]}
          bodyStyle={{ marginBottom: "-1rem" }}
          customStyleGenerator={customStyleGenerator}
          onDayClick={handleCalendarDayClick}
          onCurrentViewChange={handleCalendarCurrentViewChange}
        />
        <AtButton
          className="module-calendar-btn-today"
          onClick={hanldeBtnTodayClick}
        >
          回到今天
        </AtButton>
      </View>

      {/* 短时值班人员组件 */}
      <Permission strCheckCompany={ConfigTag["WEATHER_TIME"]?.company || ""}>
        <View className="vp-home-content-module">
          <HomeModuleWorker
            isLoadComplete={isLoadCompleteWeather}
            strModuleTitle="短时值班人员"
            arrWorkerList={arrTaskItemWeatherTime}
          />
        </View>
      </Permission>

      {/* 告警详细信息弹窗 */}
      {isShowDialogWarning && (
        <HomeDialogWarning
          warningInfoNow={warningListNow}
          onDialogWarningClose={handleDialogWarningClick}
        />
      )}
    </View>
  );
}
