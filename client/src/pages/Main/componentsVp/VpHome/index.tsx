import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AtButton, AtNoticebar } from "taro-ui";
import Calendar from "taro-calendar-customizable";
import { View, Image } from "@tarojs/components";
import Api from "@/api";
import ButtonIcon from "@/components/ButtonIcon";
import Permission from "@/components/Permission";
import useActions from "@/hooks/useActions";
import useCheckLogin from "@/hooks/useCheckLogin";
import HomeDialogWarning from "@/pages/Main/components/HomeDialogWarning";
import HomeModuleWeather from "@/pages/Main/components/HomeModuleWeather";
import HomeModuleWorker from "@/pages/Main/components/HomeModuleWorker";
import shareInfoActions from "@/redux/actions/shareInfo";
import GlobalManager from "@/services/GlobalManager";
import Utils from "@/utils";

import { getMonthFromDayString } from "./utils";

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

  const taskInfoLocal = useRef({}); // 月份为键的任务字典表，为缓存请求的数据
  const weatherInfoMonthLocal = useRef({}); // 月份为键的天气字典表，为缓存请求的数据

  const [isLoadCompleteWeather, setLoadCompleteWeather] = useState(false); // 天气组件的数据是否加载完成标识
  const [isShowDialogWarning, setShowDialogWarning] = useState(false);
  const [strSelectDay, setSelectDay] = useState(
    GlobalManager.nowDate.todayString || "2021-01-01"
  ); // 日历组件选中日期
  const [strSelectMonth, setSelectMonth] = useState(
    GlobalManager.nowDate.monthString || "2021-01-01"
  ); // 日历组件选中月份
  const [weatherInfoDay, setWeatherInfoDay] = useState({}); // 选中当天的气象数据
  const [taskInfoDay, setTaskInfoDay] = useState({}); // 选中当天的任务数据
  const [warningInfoNow, setWarningInfoNow] = useState<any>([]); // 本日的气象告警信息

  const memberInfo = useSelector((state) => state.memberInfo);

  const { setShareInfo } = useActions(shareInfoActions);

  // 以月为单位请求首页数据
  const queryHomeInfo = async (month = "none") => {
    if (weatherInfoMonthLocal.current[month] || taskInfoLocal.current[month]) {
      return;
    }
    const res = await Api.cloud.fetchAppInfo.queryHomeInfo({
      month: month,
    });
    console.log("VpHome queryHomeInfo", res);
    const { taskInfo = {}, weatherInfoMonth = {}, warningInfo = {} } =
      res || {};
    taskInfoLocal.current[month] = (taskInfo && taskInfo?.data) || [];
    weatherInfoMonthLocal.current[month] =
      (weatherInfoMonth && weatherInfoMonth?.data) || [];
    setWarningInfoNow((warningInfo && warningInfo?.data) || []);
    // setWarningInfoNow(new Array(10).fill(warningInfo?.data[0]));
  };

  // 渲染指定日期的相关数据
  const setDayInfo = async (dayString = "") => {
    if (dayString) {
      const month = getMonthFromDayString(dayString);
      const arrTaskInfo = taskInfoLocal.current[month] || [];
      const arrWeatherInfo = weatherInfoMonthLocal.current[month] || [];

      const taskInfo = arrTaskInfo.find((item) => {
        return item.fxDate === dayString;
      });
      const weatherInfo = arrWeatherInfo.find((item) => {
        return item.fxDate === dayString;
      });
      // console.log("setDayInfo", taskInfo, weatherInfo);
      setSelectDay(dayString);
      setTaskInfoDay(taskInfo);
      setWeatherInfoDay(weatherInfo);
    }
  };

  const onLoad = async () => {
    GlobalManager.nowDate = Utils.getStringDate(new Date());
    await queryHomeInfo(GlobalManager.nowDate.MM);
    setDayInfo(GlobalManager.nowDate.todayString);
    setLoadCompleteWeather(true);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 点击告警条
  const handleWarningInfoClick = (item) => {
    console.log("handleWarningInfoClick", item);
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
    console.log("hanldeBtnTodayClick");
    setDayInfo(GlobalManager.nowDate.todayString);
    setSelectMonth(GlobalManager.nowDate.monthString);
    handleCalendarCurrentViewChange(GlobalManager.nowDate.monthString);
  };

  // 分享按钮点击事件
  const handleBtnShareClick = useCheckLogin(() => {
    const objShareParam = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/Main/index",
    });
    setShareInfo({
      isShowPanelShare: true,
      strShareTitle: "",
      strShareImage: "",
      objShareParam: objShareParam,
    });
  });

  // 模态对话框
  const handleDialogWarningClick = () => {
    setShowDialogWarning(false);
  };

  return (
    <View className="vp-home-content">
      {/* 天气预警组件 */}
      <View className="vp-home-content-module">
        {warningInfoNow &&
          warningInfoNow.map((item, index) => {
            return (
              <View
                key={`notice-bar-${index}`}
                onClick={() => handleWarningInfoClick(item)}
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
          weatherInfoDay={weatherInfoDay}
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
      <Permission
        strCheckTag="WEATHER_TIME"
        customClass="vp-home-content-module"
      >
        <HomeModuleWorker
          isLoadComplete={isLoadCompleteWeather}
          strModuleTitle="短时值班人员"
          arrWorkerList={taskInfoDay && taskInfoDay["WEATHER_TIME"]}
        />
      </Permission>

      {/* 分享浮动按钮 */}
      {/* <View className="safe-bottom flex-center-v vp-home-float-btn-panel">
        <ButtonIcon
          value="iconsend"
          width={100}
          height={100}
          radius={50}
          size={60}
          color="var(--color-primary)"
          onClick={handleBtnShareClick}
        />
      </View> */}

      {/* 告警详细信息弹窗 */}
      {isShowDialogWarning && (
        <HomeDialogWarning
          warningInfoNow={warningInfoNow}
          onDialogWarningClose={handleDialogWarningClick}
        />
      )}
    </View>
  );
}
