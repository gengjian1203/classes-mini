import CloudFileManager from "@/services/CloudFileManager";
import ResourceManager from "@/services/ResourceManager";

export const CANVAS_WIDTH = 350; // 画布宽
export const CANVAS_HEIGHT = 350; // 画布高
export const CANVAS_SAVE_WIDTH = 1080; // 保存图片宽度
export const CANVAS_SAVE_HEIGHT = 1080; // 保存图片高度

export const SIZE_TEXT = 50; // 文字尺寸
export const SIZE_IMAGE = 128; // 图片尺寸

export const BORDER_COLOR = "#ffffff";
export const BORDER_COLOR_CORE = "#000000";
export const BORDER_BUTTON_SIZE = 20; // 选中框按钮尺寸
export const BORDER_BUTTON_RADIUS = BORDER_BUTTON_SIZE / 2;

export const LIMIE_AVATAR_SHOW_LIST = 10; // 操作记录存储上线

// 默认头像
export const strAvatarDefaultUrl = CloudFileManager.getCloudUrl(
  "avatar/default.png"
);

// 选中边框按钮列表
export const arrBorderButtonList = [
  {
    type: "FLIP",
    url: CloudFileManager.getCloudUrl("avatar/button/flip.png"),
  },
  {
    type: "ADD",
    url: CloudFileManager.getCloudUrl("avatar/button/add.png"),
  },
  {
    type: "DELETE",
    url: CloudFileManager.getCloudUrl("avatar/button/delete.png"),
  },
  {
    type: "RESIZE",
    url: CloudFileManager.getCloudUrl("avatar/button/resize.png"),
  },
];

// 饰品列表
export const arrJewelryList = [
  {
    title: "中秋",
    list: [
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/zhongqiu_00.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/zhongqiu_00.jpg"),
        rect: {
          x: CANVAS_WIDTH - 100,
          y: 0,
          width: 100,
          height: 120,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/zhongqiu_01.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/zhongqiu_01.jpg"),
        rect: {
          x: CANVAS_WIDTH - 120,
          y: CANVAS_HEIGHT - 120,
          width: 120,
          height: 120,
        },
      },
    ],
  },
  {
    title: "国庆",
    list: [
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/guoqing_00.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/guoqing_00.jpg"),
        rect: {
          x: 0,
          y: 0,
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 100),
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/guoqing_01.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/guoqing_01.jpg"),
        rect: {
          x: 0,
          y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 116),
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 116),
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/guoqing_02.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/guoqing_02.jpg"),
        rect: {
          x: 0,
          y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 86),
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 86),
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/guoqing_03.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/guoqing_03.jpg"),
        rect: {
          x: CANVAS_WIDTH - 120,
          y: CANVAS_HEIGHT - 120,
          width: 120,
          height: 120,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/guoqing_04.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/guoqing_04.jpg"),
        rect: {
          x: CANVAS_WIDTH - 120,
          y: CANVAS_HEIGHT - 109,
          width: 120,
          height: 109,
        },
      },
    ],
  },
  {
    title: "圣诞",
    list: [
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl(
          "avatar/jewelry/shengdanlaoren.png"
        ),
        valueEG: CloudFileManager.getCloudUrl(""),
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/shengdanmao.png"),
        valueEG: CloudFileManager.getCloudUrl(""),
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/shengdanshu.png"),
        valueEG: CloudFileManager.getCloudUrl(""),
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/xueren.png"),
        valueEG: CloudFileManager.getCloudUrl(""),
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
    ],
  },
  {
    title: "贴纸",
    list: [
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/hongdian.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/hongdian.jpg"),
        rect: {
          x: CANVAS_WIDTH - 80,
          y: 0,
          width: 80,
          height: 80,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/shanchu.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/shanchu.jpg"),
        rect: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        },
      },
      {
        type: "IMAGE",
        value: CloudFileManager.getCloudUrl("avatar/jewelry/princess.png"),
        valueEG: CloudFileManager.getCloudUrl("avatar/eg/princess.png"),
        rect: {
          x: CANVAS_WIDTH - 180,
          y: 0,
          width: 100,
          height: 100,
        },
      },
    ],
  },
  {
    title: "emoji",
    list: [
      {
        type: "TEXT",
        value: "🍀",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "💗",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "💄",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "✨",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🎁",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "💩",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "😙",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "😎",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "😁",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "👿",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐭",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐂",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐯",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐰",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐉",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐍",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐴",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐑",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐵",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐔",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐩",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
      {
        type: "TEXT",
        value: "🐷",
        rect: {
          width: SIZE_TEXT,
          height: SIZE_TEXT,
        },
      },
    ],
  },
];

// 底部弹窗列表
export const arrActionSheetList = [
  {
    code: "toggle-avatar",
    openType: "",
    name: "使用自身头像",
  },
  {
    code: "toggle-camera",
    openType: "",
    name: "拍照",
  },
  {
    code: "toggle-album",
    openType: "",
    name: "从手机相册选择",
  },
];

export default {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_SAVE_WIDTH,
  CANVAS_SAVE_HEIGHT,
  SIZE_TEXT,
  SIZE_IMAGE,
  BORDER_COLOR,
  BORDER_BUTTON_SIZE,
  BORDER_BUTTON_RADIUS,
  LIMIE_AVATAR_SHOW_LIST,
  strAvatarDefaultUrl,
  arrBorderButtonList,
  arrJewelryList,
  arrActionSheetList,
};
