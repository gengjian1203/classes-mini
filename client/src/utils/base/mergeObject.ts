/**
 * 两个对象相同的属性相加
 * @return
 */
export const mergeObject = (objA, objB) => {
	let objResult = { ...objA, ...objB }
	for (let key in objResult) {
		objResult[key] = objA[key] + objB[key]
	}
	return objResult
}

export default mergeObject
