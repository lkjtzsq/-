var postsData = require("../../../data/posts-data.js")
var app = getApp()

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(option) {
    var globalData = app.globalData.g_isPlayingMusic
    var postId = option.id;
    this.setData({
      postId: postId
    })
    var postData = postsData.postLists[postId];
    this.setData({
      postData
    });
    // var postCollected = {
    //   1:"true",
    //   2:"false",
    //   3:"true"
    // }
    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = []
      postsCollected[postId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()

  },
  setMusicMonitor: function() {
    // 监听音乐启动事件
    var that = this
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.postId
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(function(){
       that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync("posts_collected")
    var postCollected = postsCollected[this.data.postId]
    postCollected = !postCollected
    postsCollected[this.data.postId] = postCollected
    this.showModal(postsCollected, postCollected);
  },
  showModal: function(postsCollected, postCollected) {
    var _this = this
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected)
          _this.setData({
            collected: postCollected
          })
          _this.showToast(postsCollected, postCollected)
        }
      }
    })
  },
  showToast: function(postsCollected, postCollected) {
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: "success",
      duration: 1000
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405F80",
      success: function(res) {
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: '用户是否取消?' + res.cancel + '现在无法实现分享功能，什么时候能支持呢'
        })
      }
    })
  },
  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postLists[this.data.postId].music.url,
        title: postsData.postLists[this.data.postId].music.title,
        coverImgUrl: postsData.postLists[this.data.postId].music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})