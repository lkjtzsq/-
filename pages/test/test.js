// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[
      {
        iconPath:"/images/icon/site.png",
        id:0,
        latitude:23.099994,
        longitude:113.324520,
        width:50,
        height:50
      }
    ],
    polyline:[
      {
        points:[
          {longitude:113.3245211,latitude:23.10229},
          {longitude:113.324520,latitude:23.21229}
        ],
        color:"#00a7f5",
        width:1,
        dottedLine:true 
      }
    ]
  },
  markertap:function(e){
    console.log(e)
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520
    })
  },
  choseAddress:function(){
    console.log(1)
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  openSetting:function(event){
    wx.openSetting({
      success:function(res){
        console.log(res)
      }
    })
  },
  startRecord:function(){
    wx.startRecord({
      success(res) {
        const tempFilePath = res.tempFilePath
      }
    })
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
  },
  bindGetUserInfo:function(e){
    console.log(e)
  },
  getUserInfo:function(event){
    wx.login({
      success:function(res){
        console.log(res)
        wx.getUserInfo({
          withCredentials:false,
          success:function(res){
            console.log(res)
          },
          fail:function(res){
            console.log("fail")
            console.log(res)
          }
        })
      }
    })
  },
  checkSession:function(event){
    wx.checkSession({
      success:function(res){
        console.log("成功")
        console.log(res)
      },
      fail:function(res){
        console.log("失败")
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onBindChange:function(event){
    console.log(event.detail.value)
  },
  onBindSlider:function(event){
    console.log(event.detail.value)
  },
  onBindRadio:function(event){
    console.log(event.detail.value)
  },
  onBindCheckbox:function(event){
    console.log(event.detail.value)
  },
  formSubmit:function(event){
    console.log(event.detail.value)
  },
  formReset:function(event){
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})