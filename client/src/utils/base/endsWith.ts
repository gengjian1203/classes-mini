/**
 * 判断字符串是否某字符串结尾
 * @param {*} source
 * @param {*} end
 * @returns
 */
export const endsWith = (source, end) => {
  return source.indexOf(end, source.length - end.length) !== -1;
};

export default endsWith;
