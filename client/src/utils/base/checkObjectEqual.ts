/**
 * 校验两个对象是否相同
 * @param o1 待检验的对象
 * @param o2 待检验的对象
 * @return true-相同 false-不相同
 */
export const checkObjectEqual = (o1, o2) => {
  const props1 = Object.getOwnPropertyNames(o1);
  const props2 = Object.getOwnPropertyNames(o2);
  if (props1.length != props2.length) {
    return false;
  }
  for (let i = 0, max = props1.length; i < max; i++) {
    const propName = props1[i];
    if (o1[propName] !== o2[propName]) {
      return false;
    }
  }
  return true;
};
export default checkObjectEqual;
