//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到召唤师峡谷',
    userInfo: {},
    textTxt:'你好',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading:false
  },
  showError:function(){
    wx.showModal({

      title: '标题',

      content: '告知当前状态，信息和解决方法',

      confirmText: '主操作',

      cancelText: '次要操作',

      success: function (res) {

        if (res.confirm) {

          console.log('用户点击主操作')

        } else if (res.cancel) {

          console.log('用户点击次要操作')

        }

      }

    })
  },
  tap:function(){
    var _this=this
    this.setData({

      loading: true

    })
    setTimeout(function(){
      _this.setData({

        loading: false

      })
    },2000)

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   /* wx.showLoading({
      title: '22',
    })*/
    wx.showToast({ // 显示Toast

      title: '已发送',

      icon: 'success',

      duration: 1500

    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
