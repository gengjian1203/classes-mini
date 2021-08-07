/**
 * 从日期字符串中提取出来月份
 * @param dayString
 * @returns
 */
export const getMonthFromDayString = (dayString: string) => {
  const arrDate = dayString.split("-");
  const month = arrDate[1];
  return month;
};

/**
 * 获取本月度需要请求员工信息字典里不存在的员工信息
 * @param taskListLocal 本月度任务情况
 * @param workerMapLocal 已知员工信息字典
 */
export const getWorkerIdNew = (taskListLocal = [], workerMapLocal = {}) => {
  let arrWorkerIdByAll = [];
  taskListLocal &&
    taskListLocal.map((itemDay) => {
      for (let key in itemDay) {
        if (key === "_id" || key === "fxDate") {
          continue;
        }
        // console.log("queryWorkId itemDay", key, itemDay[key]);
        const arrWorkerIdByDay =
          itemDay[key] &&
          itemDay[key].map((itemTask) => {
            return itemTask.workerId;
          });
        const arrWorkerOldIdByDay =
          itemDay[key] &&
          itemDay[key]
            .map((itemTask) => {
              return itemTask.workerOldId;
            })
            .filter((itemTask) => {
              return itemTask;
            });
        // console.log("queryWorkId arrWorkerIdByDay", arrWorkerIdByDay);
        arrWorkerIdByAll = arrWorkerIdByAll
          .concat(arrWorkerIdByDay)
          .concat(arrWorkerOldIdByDay);
      }
    });
  const arrWorkerId = Array.from(new Set(arrWorkerIdByAll));
  const arrWorkerIdNew = arrWorkerId.filter((item) => {
    return !Boolean(workerMapLocal && workerMapLocal[item]);
  });

  // console.log("queryWorkId", arrWorkerId, arrWorkerIdByAll);
  console.log("queryWorkId", arrWorkerIdNew);
  return arrWorkerIdNew || [];
};

/**
 * 通过任务列表中的员工ID解析出员工信息
 */
export const formatWorkerInfo = (
  workerMapLocal = {},
  taskItem = {},
  taskType = "NONE"
) => {
  const taskInfo = (taskItem && taskItem[taskType]) || [];
  return taskInfo.map((item) => {
    return {
      ...item,
      objWorkerInfo: item.workerId
        ? workerMapLocal[item.workerId] || null
        : null,
      objWorkerOldInfo: item.workerOldId
        ? workerMapLocal[item.workerOldId] || null
        : null,
      // 本地渲染样式所需字段
      renderLocal: {
        isShowWorkerOld: Boolean(item.workerOldId),
        strLogoBGImage: Boolean(workerMapLocal[item.workerId]?.gender !== 2)
          ? "linear-gradient(135deg, var(--color-man), 80%, var(--color-white, #ffffff))"
          : "linear-gradient(135deg, var(--color-woman), 80%, var(--color-white, #ffffff))",
        strOldLogoBGImage: Boolean(
          workerMapLocal[item.workerOldId]?.gender !== 2
        )
          ? "linear-gradient(135deg, var(--color-man), 80%, var(--color-white, #ffffff))"
          : "linear-gradient(135deg, var(--color-woman), 80%, var(--color-white, #ffffff))",
      },
    };
  });
};

export default {
  getMonthFromDayString,
  getWorkerIdNew,
  formatWorkerInfo,
};
