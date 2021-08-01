import checkObjectEmpty from "./base/checkObjectEmpty";
import deepClone from "./base/deepClone";
import deepCompare from "./base/deepCompare";
import getHDAvatarUrl from "./base/getHDAvatarUrl";
import getNowDate from "./base/getNowDate";
import mergeObject from "./base/mergeObject";
import UUID from "./base/UUID";
import ellipsisString from "./format/ellipsisString";
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
  deepClone,
  deepCompare,
  getHDAvatarUrl,
  getNowDate,
  mergeObject,
  router2Params,
  routerAppendParams,
  UUID,
  ellipsisString,
  hiddenString,
  normalDate,
  router2url,
  simpleDate,
  getShareTypeName,
  processSharePath,
  uploadImage,
};
