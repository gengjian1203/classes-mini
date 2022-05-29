# CanvasDraw 组件使用说明

## 组件参数说明

| 参数          | 类型   | 默认         | 含义         | 是否必填 | 说明 |
| :------------ | :----- | :----------- | :----------- | :------- | :--- |
| canvasId      | string | 'canvasDraw' | 画布 Id      | 否       | /    |
| canvasWidth   | number | 300          | 画布宽度     | 否       | /    |
| canvasHeight  | number | 150          | 画布高度     | 否       | /    |
| canvasBGColor | string | '#fff'       | 画布背景色   | 否       | /    |
| canvasQuality | number | 0.92         | 画布压缩比例 | 否       | /    |
| canvasScale   | number | 1            | 画布缩放比例 | 否       | /    |
| canvasConfig  | Array  | []           | 画布元素配置 | 否       | /    |

## canvasConfig 元素说明

### 目前仅支持 text / textMulti / rect / rectArc / line / image 几种类型元素

> text (普通文本类型)

| 参数         | 类型   | 含义                | 是否必填 | 说明                                                       |
| :----------- | :----- | :------------------ | :------: | :--------------------------------------------------------- |
| type         | String | 元素类型            |    是    | text                                                       |
| text         | String | 文本内容            |    是    | /                                                          |
| textAlign    | String | 文本 X 轴样式       |    是    | start / end / left / right / center                        |
| textBaseline | String | 文本 Y 轴样式       |    是    | top / middle / bottom / alphabetic / hanging / ideographic |
| color        | String | 元素颜色            |    是    | /                                                          |
| size         | Number | 文本大小            |    是    | /                                                          |
| x            | Number | 元素左上角 x 轴坐标 |    是    | /                                                          |
| y            | Number | 元素左上角 y 轴坐标 |    是    | /                                                          |

> textMulti (多行文本类型)

| 参数       | 类型   | 含义                | 是否必填 | 说明      |
| :--------- | :----- | :------------------ | :------: | :-------- |
| type       | String | 元素类型            |    是    | textMulti |
| text       | String | 文本内容            |    是    | /         |
| textAlign  | String | 文本样式            |    是    | /         |
| color      | String | 元素颜色            |    是    | /         |
| size       | Number | 文本大小            |    是    | /         |
| x          | Number | 元素左上角 x 轴坐标 |    是    | /         |
| y          | Number | 元素左上角 y 轴坐标 |    是    | /         |
| maxWidth   | Number | 最长宽度            |    是    | /         |
| lineHeight | Number | 每行高度            |    是    | /         |

> rect (矩形类型)

| 参数   | 类型   | 含义                | 是否必填 | 说明 |
| :----- | :----- | :------------------ | :------: | :--- |
| type   | String | 元素类型            |    是    | rect |
| color  | String | 元素颜色            |    是    | /    |
| x      | Number | 元素左上角 x 轴坐标 |    是    | /    |
| y      | Number | 元素左上角 y 轴坐标 |    是    | /    |
| width  | Number | 元素宽度            |    是    | /    |
| height | Number | 元素高度            |    是    | /    |

> rectArc (圆角矩形类型)

| 参数      | 类型   | 含义                | 是否必填 | 说明 |
| :-------- | :----- | :------------------ | :------: | :--- |
| type      | String | 元素类型            |    是    | rect |
| color     | String | 元素颜色            |    是    | /    |
| lineColor | String | 元素颜色            |    是    | /    |
| lineWidth | Number | 矩形线宽            |    是    | /    |
| x         | Number | 元素左上角 x 轴坐标 |    是    | /    |
| y         | Number | 元素左上角 y 轴坐标 |    是    | /    |
| width     | Number | 元素宽度            |    是    | /    |
| height    | Number | 元素高度            |    是    | /    |
| radius    | Number | 圆角半径            |    是    | /    |

> line (线段类型)

| 参数  | 类型   | 含义          | 是否必填 | 说明 |
| :---- | :----- | :------------ | :------: | :--- |
| type  | String | 元素类型      |    是    | line |
| color | String | 元素颜色      |    是    | /    |
| x     | Number | 起点 x 轴坐标 |    是    | /    |
| y     | Number | 起点 y 轴坐标 |    是    | /    |
| x1    | Number | 终点 x 轴坐标 |    是    | /    |
| y1    | Number | 终点 y 轴坐标 |    是    | /    |

> image (图片类型)

| 参数   | 类型   | 含义                | 是否必填 | 说明                 |
| :----- | :----- | :------------------ | :------: | :------------------- |
| type   | String | 元素类型            |    是    | image                |
| src    | String | 图片地址            |    是    | 远程 url/base64 数据 |
| x      | Number | 元素左上角 x 轴坐标 |    是    | /                    |
| y      | Number | 元素左上角 y 轴坐标 |    是    | /                    |
| width  | Number | 元素宽度            |    是    | /                    |
| height | Number | 元素高度            |    是    | /                    |
