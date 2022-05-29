import Taro from "@tarojs/taro";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@tarojs/components";
import Utils from "@/utils";

import "./index.less";

interface ICanvasDrawProps {
  canvasId: string;
  canvasWidth: number;
  canvasHeight: number;
  canvasBGColor: string;
  canvasQuality: number;
  canvasScale: number;
  canvasConfig: Array<any>;
  onCanvasDrawComplete: Function;
}

export default function CanvasDraw(props: ICanvasDrawProps) {
  const {
    canvasId = "canvasDraw",
    canvasWidth = 300,
    canvasHeight = 150,
    canvasBGColor = "#fff",
    canvasQuality = 0.92,
    canvasScale = 1,
    canvasConfig = [],
    onCanvasDrawComplete,
  } = props;

  const refCanvasCTX = useRef<any>(null);

  const checkCanvasCTXComplete = async () => {
    let result: boolean = false;
    for (let index = 0; index < 30; index++) {
      if (!refCanvasCTX.current) {
        refCanvasCTX.current = Taro.createCanvasContext(canvasId);
      }
      if (await Utils.asyncDelayBoolean(Boolean(refCanvasCTX.current))) {
        result = true;
        console.log(
          "checkCanvasCTXComplete bind success.",
          refCanvasCTX.current
        );
        break;
      } else {
        console.warn("checkCanvasCTXComplete bind fail.", refCanvasCTX.current);
      }
    }
    return result;
  };

  // 转换坐标位置
  const dealInfo = (info = {}) => {
    const infoClone = Utils.deepClone(info) || {};
    // 需要转换的键值白名单
    const arrKeyList = [
      "size",
      "x",
      "y",
      "x1",
      "y1",
      "maxWidth",
      "lineHeight",
      "lineWidth",
      "radius",
    ];
    Object.keys(infoClone).map((key) => {
      if (arrKeyList.includes(key)) {
        infoClone[key] = infoClone[key] * canvasScale;
      }
    });
    return infoClone;
  };

  // 创建图片标签
  const createImage: any = async (src) => {
    // console.log("createImage");
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = (res) => {
        resolve(img);
      };
    });
  };

  // 绘制普通文本类型
  const draw_text = (info) => {
    const realInfo = dealInfo(info);
    const { text, textAlign, textBaseline, color, size, x, y } = realInfo || {};

    // console.log("draw_text", info, realInfo);
    if (refCanvasCTX.current && text) {
      refCanvasCTX.current.fillStyle = color;
      refCanvasCTX.current.textAlign = textAlign;
      refCanvasCTX.current.textBaseline = textBaseline;
      refCanvasCTX.current.font = `${size}px sans-serif`;
      refCanvasCTX.current.fillText(text, x, y);
      refCanvasCTX.current.save();
    }
  };

  // 绘制多行文本类型
  const draw_textMulti = (info) => {
    const realInfo = dealInfo(info);
    let { text, textAlign, color, size, x, y, maxWidth, lineHeight } =
      realInfo || {};

    // console.log("draw_textMulti", info, realInfo);

    let lineWidth = 0;
    let lastSubStrIndex = 0;
    let lineCount = 1;
    refCanvasCTX.current.fillStyle = color;
    refCanvasCTX.current.font = `${size}px sans-serif`;
    for (let i = 0, len = text.length; i < len; i++) {
      lineWidth += refCanvasCTX.current.measureText(text[i]).width;
      if (lineWidth / maxWidth > lineCount) {
        refCanvasCTX.current.fillText(text.substring(lastSubStrIndex, i), x, y);
        refCanvasCTX.current.save();
        y += lineHeight;
        lastSubStrIndex = i;
        lineCount++;
      }
      if (i === len - 1) {
        refCanvasCTX.current.fillText(
          text.substring(lastSubStrIndex, i + 1),
          x,
          y
        );
        refCanvasCTX.current.save();
      }
    }
  };

  // 绘制矩形类型
  const draw_rect = (info) => {
    const realInfo = dealInfo(info);
    const { color, x, y, width, height } = realInfo || {};
    // console.log("draw_rect", info, realInfo);

    refCanvasCTX.current.fillStyle = color;
    refCanvasCTX.current.fillRect(x, y, width, height);
    refCanvasCTX.current.save();
  };

  // 绘制圆角矩形类型
  const draw_rectArc = (info) => {
    const realInfo = dealInfo(info);
    const { color, lineColor, lineWidth, x, y, width, height, radius } =
      realInfo || {};
    // console.log("draw_rectArc", info, realInfo);

    refCanvasCTX.current.beginPath();
    refCanvasCTX.current.fillStyle = color;
    refCanvasCTX.current.lineWidth = lineWidth;
    refCanvasCTX.current.strokeStyle = lineColor;
    // 起始点
    refCanvasCTX.current.moveTo(x, y + 2 * radius);
    // 左上角
    refCanvasCTX.current.arcTo(x, y, x + radius, y, radius);
    // 右上角
    refCanvasCTX.current.arcTo(x + width, y, x + width, y + radius, radius);
    // 右下角
    refCanvasCTX.current.arcTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
      radius
    );
    // 左下角
    refCanvasCTX.current.arcTo(x, y + height, x, y + height - radius, radius);

    refCanvasCTX.current.closePath();
    refCanvasCTX.current.stroke();
    refCanvasCTX.current.fill();
    refCanvasCTX.current.save();
  };

  // 绘制线段类型
  const draw_line = async (info) => {
    const realInfo = dealInfo(info);
    const { color, x, y, x1, y1 } = realInfo || {};
    // console.log("draw_line", info, realInfo);

    refCanvasCTX.current.strokeStyle = color;
    refCanvasCTX.current.moveTo(x, y);
    refCanvasCTX.current.lineTo(x1, y1);
    refCanvasCTX.current.stroke();
    refCanvasCTX.current.save();
  };

  // 绘制图片类型
  const draw_image = async (info) => {
    const realInfo = dealInfo(info);
    const { src = "", x = 0, y = 0, width = 0, height = 0 } = realInfo || {};
    // console.log("draw_image", info, realInfo);

    if (src) {
      const img = await createImage(src);
      // console.log("createImage", img);
      const drawWidth = width || img.width;
      const drawHeight = height || img.height;
      src && refCanvasCTX.current.drawImage(img, x, y, drawWidth, drawHeight);
      refCanvasCTX.current.save();
    }
  };

  const dealCanvasConfig = async () => {
    console.log("dealCanvasConfig", canvasConfig);

    if (canvasConfig && canvasConfig.length > 0) {
      console.log("CanvasDraw canvasConfig", canvasConfig);
      if (await checkCanvasCTXComplete()) {
        draw_rect({
          color: canvasBGColor,
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
        });
        for (let i = 0; i < canvasConfig.length; i++) {
          const info = canvasConfig[i];
          // TODO: 初始化画笔
          console.log("watch canvasConfig", i, info);
          switch (info?.type) {
            case "text": {
              draw_text(info);
              break;
            }
            case "textMulti": {
              draw_textMulti(info);
              break;
            }
            case "rect": {
              draw_rect(info);
              break;
            }
            case "rectArc": {
              draw_rectArc(info);
              break;
            }
            case "line": {
              draw_line(info);
              break;
            }
            case "image": {
              draw_image(info);
              break;
            }
            default: {
              break;
            }
          }
        }

        console.log("onCanvasDrawComplete0");
        refCanvasCTX.current.draw(false, () => {
          console.log("onCanvasDrawComplete");
          onCanvasDrawComplete && onCanvasDrawComplete();
          // this.canvas.toDataURL("image/jpg")
        });
      }
    }
  };

  useEffect(() => {
    dealCanvasConfig();
  }, [canvasConfig]);

  return (
    <Canvas
      canvasId={canvasId}
      style={{
        width: Taro.pxTransform(canvasWidth),
        height: Taro.pxTransform(canvasHeight),
      }}
    />
  );
}
