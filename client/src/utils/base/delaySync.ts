/**
 * 同步等待
 * @param time 等待时间
 * @return
 */
export const delaySync = async (time = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

export default delaySync;
