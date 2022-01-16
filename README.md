# classes-mini

《工具箱》小程序端

## 项目文档

### 环境搭建

1. yarn global add @tarojs/cli
   安装 Taro
2. yarn install  
   安装依赖库
3. yarn dev:weapp
   编译项目

### 项目结构

1. 组件设计

   每个组件都是一个文件夹。组件名即为文件夹名。  
   文件夹内包括 index.tsx 以及 index.less。  
   组件内不要使用 redux。  
   所有依赖数据尽量使用 props 传值。  
   内部逻辑实现尽量抽象，不要依赖业务元素。  
   这样以保证其复用性。

   组件传入的每个参数都要注释其意义，以及是否必传。

   1. `公共组件`放到./client/src/components
   2. `局部组件`放到对应页面下的 components 文件夹内

2. 页面设计

   每个页面都是一个文件夹。页面名即为文件夹名。  
   文件夹内包括 components、index.tsx 、 index.less、 index.config.ts

   页面传入的每个参数都要注释其意义，以及是否必传。

   1. `onLoad`生命周期，只用来处理变量初始化
   2. `onShow`生命周期，用来请求接口数据

### git 规范

1. 尊重 master 分支，保证代码是没有风险的，是随时可以打包上线的。
2. 创建分支的时候，同时绑定该分支的版本号。如：br-1.0.0-0115，并同步书写该版本的文档。
3. 按照一定语法去 commit，每一条 commit 由以下几部分构成。

```
  修改类型 + (影响模块) + : + [bug单号] + 问题描述
  如：fix(会员购买页面):[7405-7405]会员等级购买ios购买规避政策
  修改类型分为以下几种：
  feat: 开发新功能
  style: 调整样式
  fix: bug修复
  refactor: 代码重构
  merge: 代码合并
  doc: 书写文档
  config: 调整配置
```

### 代码规范

1. 统一开发环境

   建议 VSCode+Prettier 自动保存即格式化代码。

2. 事件绑定函数命名规范

   开头：固定使用 handle  
   中间模块名称：如：Cell、Item、Cell 等  
   尾部事件名称：如：Click、TouchMove、Change 等  
   例：handleCellClick(e)

3. 自定义函数命名规范

   通过函数名来知道意义。  
   校验类：check 开头  
   处理类：deal 开头  
   方法类： process 开头  
   渲染类： render 开头

4. 组件命名规范

   使用名词开头，后接形容词。  
   如：list-select、module-title、panel-bottom。

5. 路由传值

   由于路由传值都被转为 string 类型。传值 undefined，false，true 等歧义变量，很容易引发隐蔽性 bug。

6. 封装方法传入的参数应是对象

   ```ts
   dealDateInfo(params); // good
   dealDateInfo(data, show, tip, success); // bad
   ```

   如果一个函数需要多个参数实现其逻辑，尽量将这些参数组成一个对象。
   这样的好处在于：

   1. 方便定义类型。
   2. 如果部分参数是非必传的情况，方便处理。
   3. 对于编译器减少 push 函数参数的操作

7. import 书写顺序

   1. 优先引入三方库
   2. 次之引入绝对路径
   3. 最后引入相对路径

   而同级则以引入库的字母顺序排列。

8. TSX 文件书写顺序（待实践）

   1. 自定义变量
   2. 自定义函数
   3. 生命周期
   4. 绑定事件函数
   5. 渲染函数
   6. 主渲染函数

9. 善用 CSS 变量

   颜色、字号、边距、边角已经有规定尺寸，常规情况下，不要直接去写数值。会造成 UI 风格不一致。

10. 数据管理

    前端要有自己的数据管理能力。  
    由于组件设计过程中，组件内的变量命名应该是抽象的。  
    那么在接口获取数据之后，  
    都需要将得到的数据，转换为组件内对应的变量位置装好。
    这样，数据处理位置比较居中，同时也能倒逼设计组件更加抽象化。

### 套路场景

1. 多条件判断。

以`[].includes('')`处理为宜，方便其拓展性。

2. 长列表数据加载。

使用`useQueryPageList`Hook 进行处理。

3. 一行多项。

每项超出部分...

```tsx
<View class="flex-start-h module-wrap">
  <View class="module-left">1111</View>
  <View class="module-mid">
    <View class="text-ellipsis mid-text">abcabcabcabcabcabcabcabcabc</View>
  </View>
  <View class="module-right">2222</View>
</View>
```

```less
.text-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.module-wrap {
  width: 100%;
  .module-left {
    height: 100%;
    flex: 0 0 120px;
  }
  .module-mid {
    flex: 1 1 auto;
    width: 0; /* 此处的宽度为关键 */
    height: 100%;
  }
  .module-right {
    height: 100%;
    flex: 0 0 120px;
  }
}
```

### 性能优化

1. 慎用 redux。由于每次变化会触发全局刷新。建议只存储全局唯一性的值。搞清楚数据纬度：组件纬度、页面纬度、全局纬度。
2. 与渲染无关的数据尽量不要放在 state 中，可以放在 useRef 中。
3. 接口调用应当清晰。由于生命周期的管理混乱，useEffect 的触发条件敏感，项目中接口调用频繁。
4. 善用节流、防抖。usePageScroll 装饰节流、input 装饰防抖。
5. 封装组件的时候，留意不要套多余无意义 View 。以免页面 DOM 层级太深，影响渲染性能。
6. Input 输入框跳位问题。尽量不要对 Input 的 value 二次 setState。或可以用防抖实现。
7. 尽量减少页面的跳转交互。
8. 尝试页面处于 loading 状态时候使用骨架屏。

### 待解决

1. textarea 处于 placeholder 蒙版挡不住。（真机、小程序 bug）
2. textarea iOS 机型、安卓机型内边距不同。（真机、小程序 bug）
3. 底部导航切页面，闪白严重。(可改为切组件，不过数据隔离问题需要精细操作)
4. 定制版本、跨平台版本、主版本 merge 方案。(考虑 webpack 通过后缀名物理隔离编译)
5. 主包超包问题，通过跳转 2 次页面实现。是否能有更好办法。(优先级低)

### 测试视频链接

以下视频皆收集于网络。

```
    http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
    http://www.w3school.com.cn/example/html5/mov_bbb.mp4
    https://www.w3schools.com/html/movie.mp4
    http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
    https://media.w3.org/2010/05/sintel/trailer.mp4
```

以下是来自时光网的视频，点击链接进去是 403，可以复制到地址栏进入：

```
    http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4
    http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4
    http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4
    http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4
    http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4
    http://vfx.mtime.cn/Video/2019/03/18/mp4/190318214226685784.mp4
    http://vfx.mtime.cn/Video/2019/03/19/mp4/190319104618910544.mp4
    http://vfx.mtime.cn/Video/2019/03/19/mp4/190319125415785691.mp4
    http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4
    http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4
    http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4
    http://vfx.mtime.cn/Video/2019/03/13/mp4/190313094901111138.mp4
    http://vfx.mtime.cn/Video/2019/03/12/mp4/190312143927981075.mp4
    http://vfx.mtime.cn/Video/2019/03/12/mp4/190312083533415853.mp4
    http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4
    https://vfx.mtime.cn/Video/2019/01/15/mp4/190115161611510728_480.mp4
```

1、美团外卖：

美团的官方推广有两种，一种是美团联盟，一种是美团分销联盟，美团联盟是必须公司才能申请开通推广平台，同时必须提供发票，如果是个人的话可以通过外卖每天赚参与，也无需提供发票。

美团联盟入口：http://union.meituan.com（注意美团联盟短链接有效期只有30天，失效后，需要30天内更新一次）。
美团分销联盟入口：http://pub.meituan.com（佣金3%，短链接有效期也只有120天）。

2、饿了么：

操作顺序—淘宝联盟 APP 首页>吃喝玩乐>饿了么微信推广活动，佣金比例 3%。
