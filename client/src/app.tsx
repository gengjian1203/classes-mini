import React, { Component } from "react";
import { Provider } from "react-redux";
import Taro from "@tarojs/taro";
import configStore from "@/redux/store";
import AppService from "@/services/AppService";
import GlobalManager from "@/services/GlobalManager";

import "@/less/iconfont.less";
import "./app.scss";

const store = configStore();

class App extends Component {
  constructor(props) {
    super(props);
    console.log("App constructor");
    AppService.getInstance().init();
  }

  componentDidMount() {}

  componentDidShow() {
    console.log("componentDidShow", process.env.TARO_ENV);
    if (process.env.TARO_ENV === "weapp") {
      const updateManager = Taro.getUpdateManager();
      updateManager?.onUpdateReady(() => {
        GlobalManager.updateMiniProgram = () => {
          Taro.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager?.applyUpdate();
                GlobalManager.isShowUpdateModal = undefined;
              }
            },
          });
        };
        GlobalManager.updateMiniProgram();
      });
    }
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
