/**
 * 对比两个对象是否相等
 * @param objA 待比较对象
 * @param objB 待比较对象
 * @return
 */
export const deepCompare = (objA, objB) => {
	return JSON.stringify(objA) === JSON.stringify(objB)
}

export default deepCompare
