/**
 * 深拷贝一个对象
 * @param objCheck 待拷贝的对象
 * @return
 */
export const deepClone = objSource => {
	return JSON.parse(JSON.stringify(objSource))
}

export default deepClone
