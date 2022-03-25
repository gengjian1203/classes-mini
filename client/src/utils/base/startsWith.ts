/**
 * 判断字符串是否某字符串开头
 * @param {*} source
 * @param {*} start
 * @returns
 */
export const startsWith = (source, start) => {
  return source.slice(0, start.length) === start;
};

export default startsWith;
