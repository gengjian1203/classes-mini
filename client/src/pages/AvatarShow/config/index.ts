export const CANVAS_WIDTH = 350; // 画布宽
export const CANVAS_HEIGHT = 350; // 画布高
export const CANVAS_SAVE_WIDTH = 1080; // 保存图片宽度
export const CANVAS_SAVE_HEIGHT = 1080; // 保存图片高度

export const SIZE_TEXT = 50; // 文字尺寸
export const SIZE_IMAGE = 128; // 图片尺寸

export const BORDER_COLOR = "#ffffff";
export const BORDER_BUTTON_SIZE = 20; // 选中框按钮尺寸
export const BORDER_BUTTON_RADIUS = BORDER_BUTTON_SIZE / 2;

// 饰品列表
export const arrJewelryList = [
  {
    title: "中秋",
    list: [
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: CANVAS_WIDTH - 100,
          y: 0,
          width: 100,
          height: 120,
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
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
        value: "",
        valueEG: "",
        rect: {
          x: 0,
          y: 0,
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 100),
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: 0,
          y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 116),
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 116),
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: 0,
          y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 86),
          width: CANVAS_WIDTH,
          height: Math.floor((CANVAS_WIDTH / 300) * 86),
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: CANVAS_WIDTH - 120,
          y: CANVAS_HEIGHT - 120,
          width: 120,
          height: 120,
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
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
    title: "贴纸",
    list: [
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: CANVAS_WIDTH - 80,
          y: 0,
          width: 80,
          height: 80,
        },
      },
      {
        type: "IMAGE",
        value: "",
        valueEG: "",
        rect: {
          x: 0,
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
    ],
  },
  {
    title: "生肖",
    list: [
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
  {
    title: "圣诞",
    list: [
      {
        type: "IMAGE",
        value: "",
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: "",
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: "",
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
        },
      },
      {
        type: "IMAGE",
        value: "",
        rect: {
          width: SIZE_IMAGE,
          height: SIZE_IMAGE,
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
  arrJewelryList,
  arrActionSheetList,
};
