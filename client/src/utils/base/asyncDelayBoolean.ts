/**
 * 同步阻塞等待
 * @param {*} isPass
 * @returns
 */

export const asyncDelayBoolean = async (isPass, timeout = 500) => {
  return new Promise((resolve) => {
    // console.log('asyncDelayBoolean', isPass)
    if (isPass) {
      resolve(isPass);
    } else {
      setTimeout(() => {
        resolve(isPass);
      }, timeout);
    }
  });
};

// export const checkVarComplete = async ({
//   isCheckVar,
//   nTotalCount = 30,
//   timeout = 500,
//   deal = () => {},
// }) => {
//   let result = false;
//   for (let index = 0; index < nTotalCount; index++) {
//     if (await asyncDelayBoolean(Boolean(isCheckVar), timeout)) {
//       result = true;
//       break;
//     } else {
//       deal && deal();
//       console.warn("checkVarComplete bind fail.", isCheckVar);
//     }
//   }
//   return result;
// };

export default asyncDelayBoolean;
