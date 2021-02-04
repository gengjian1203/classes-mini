/**
 * 校验该参数是不是空对象
 * @param objCheck 待检验的对象
 * @return true-为空对象 false-不为空对象
 */
export const checkObjectEmpty = objCheck => {
	return JSON.stringify(objCheck) === '{}'
}

export default checkObjectEmpty
