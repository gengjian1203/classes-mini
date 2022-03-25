import asyncDelayBoolean from "./base/asyncDelayBoolean";
import checkObjectEmpty from "./base/checkObjectEmpty";
import checkObjectEqual from "./base/checkObjectEqual";
import deepClone from "./base/deepClone";
import deepCompare from "./base/deepCompare";
import delaySync from "./base/delaySync";
import endsWith from "./base/endsWith";
import getDeviceSize from "./base/getDeviceSize";
import getHDAvatarUrl from "./base/getHDAvatarUrl";
import getStringDate from "./base/getStringDate";
import getTextLength from "./base/getTextLength";
import mergeObject from "./base/mergeObject";
import startsWith from "./base/startsWith";
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
import chooseImage from "./upload/chooseImage";
import uploadImage from "./upload/uploadImage";

export default {
  shareType,
  asyncDelayBoolean,
  checkObjectEmpty,
  checkObjectEqual,
  deepClone,
  deepCompare,
  delaySync,
  endsWith,
  getDeviceSize,
  getHDAvatarUrl,
  getStringDate,
  getTextLength,
  mergeObject,
  router2Params,
  routerAppendParams,
  startsWith,
  UUID,
  ellipsisString,
  getTagName,
  hiddenString,
  normalDate,
  router2url,
  simpleDate,
  getShareTypeName,
  processSharePath,
  chooseImage,
  uploadImage,
};
