// pages/posts/posts.js
Page({
  // 产生事件 捕捉事件 回调函数 处理事件
  /**
   * 页面的初始数据
   */
  data: {
    posts_content:[]
  },
  progress: function () {
    // var date = 'Nov 18 2019'
    // var date_ele = document.getElementById('id')
    // date_ele.text = date
    // 网页
    // 在小程序中不存在DOM节点
    // 数据绑定 AngularJS Vue 
    // 数据优先
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content = [{
      post_date: "Nov 18 2019",
      post_title: "正是虾肥蟹壮时",
      post_image: "/images/3.jpg",
      post_content: "橘黄蟹正肥，品尝秋之味。大江东去浪淘尽，数风流人物还看今朝，锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
      view_num: 112,
      collect_num: 96,
      post_author: "/images/4.jpg"
    }, {
      post_date: "Nov 18 2019",
      post_title: "正是虾肥蟹壮时",
      post_image: "/images/3.jpg",
      post_content: "橘黄蟹正肥，品尝秋之味。大江东去浪淘尽，数风流人物还看今朝，锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
      view_num: 112,
      collect_num: 96,
      post_author: "/images/4.jpg"
    }]
   
    this.setData({posts_key:posts_content})
 
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