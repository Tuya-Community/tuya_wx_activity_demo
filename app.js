//app.js
import wxMqtt from './utils/mqtt/wxMqtt'
import { Provider } from './libs/wechat-weapp-redux.min';
import { configStore } from './utils/store/store';

const store = configStore();

App(Provider(store)({

  globalData: {
   
  },
  onLaunch: async function() {

    //自定义头部
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })

    // wx.cloud.init()
    // wxMqtt.connectMqtt()

    wxMqtt.on('close', (errorMsg) => {
      wxMqtt.connectMqtt()
      console.log('errorMsg: mqttClose', errorMsg);
    })

    wxMqtt.on('error', (errorMsg) => {
      wxMqtt.connectMqtt()
      console.log('errorMsg: mqttError', errorMsg);
    })
  }
}))