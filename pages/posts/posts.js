// pages/posts/posts.js
var postData = require("../../data/posts-data.js")
Page({
  // 产生事件 捕捉事件 回调函数 处理事件
  /**
   * 页面的初始数据
   */
  data: {
    posts_content: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts_key: postData.postLists
    })
  },
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap:function(event){
    // target和currentTarget
    // target指的是事件捕获的组件，而currentTarget指的是当前点击的组件
    // target指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})