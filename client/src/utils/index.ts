import checkObjectEmpty from "./base/checkObjectEmpty";
import checkObjectEqual from "./base/checkObjectEqual";
import deepClone from "./base/deepClone";
import deepCompare from "./base/deepCompare";
import delaySync from "./base/delaySync";
import getDeviceSize from "./base/getDeviceSize";
import getHDAvatarUrl from "./base/getHDAvatarUrl";
import getStringDate from "./base/getStringDate";
import getTextLength from "./base/getTextLength";
import mergeObject from "./base/mergeObject";
import UUID from "./base/UUID";
import ellipsisString from "./format/ellipsisString";
import getTagName from "./format/getTagName";
import hiddenString from "./format/hiddenString";
import normalDate from "./format/normalDate";
import router2url from "./format/router2url";
import router2Params from "./format/router2Params";
import routerAppendParams from "./format/routerAppendParams";
import simpleDate from "./format/simpleDate";
import { shareType, getShareTypeName } from "./share/getShareTypeName";
import processSharePath from "./share/processSharePath";
import uploadImage from "./upload/uploadImage";

export default {
  shareType,
  checkObjectEmpty,
  checkObjectEqual,
  deepClone,
  deepCompare,
  delaySync,
  getDeviceSize,
  getHDAvatarUrl,
  getStringDate,
  getTextLength,
  mergeObject,
  router2Params,
  routerAppendParams,
  UUID,
  ellipsisString,
  getTagName,
  hiddenString,
  normalDate,
  router2url,
  simpleDate,
  getShareTypeName,
  processSharePath,
  uploadImage,
};
