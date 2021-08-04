/**
 * 全角文字的长度
 * @param 输入文字
 * @return 文字长度
 */
export const getTextLength = (str: string) => {
  const len = str.length;
  let realLength = 0;
  let charCode = -1;

  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);

    if (charCode >= 0 && charCode <= 254) {
      // 0-255中的全角文字，依次对应下面的字符
      // ¢ , £ , § , ¨ , « , ¬ , ¯ , ° , ± , ´ , µ , ¶ , · , ¸ , » , × , ÷
      if (
        [
          162,
          163,
          167,
          168,
          171,
          172,
          175,
          176,
          177,
          180,
          181,
          182,
          183,
          184,
          187,
          215,
          247,
        ].includes(charCode)
      ) {
        realLength += 2;
      } else {
        realLength += 1;
      }
    } else if (charCode >= 65377 && charCode <= 65439) {
      if (charCode === 65381) {
        // '･'该字符的长度为两个字节
        realLength += 2;
      } else {
        realLength += 1;
      }
    } else {
      realLength += 2;
    }
  }
  return realLength;
};

export default getTextLength;
