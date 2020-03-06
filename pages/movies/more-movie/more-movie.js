// pages/movies/more-movie/more-movie.js
var uitl = require('../../../utils/utils.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId
    })
  },
  processDoubanData(moviesDouban) {

    var movies = []
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: uitl.convertToStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverImg: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {}

    // 如果要绑定新加载的数据，那么需要同旧有的数据合并到一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.data.isEmpty=false
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    console.log("加载更多...")
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    uitl.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh:function(){
    console.log("加载更多...")
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    this.data.movies={}
    this.data.isEmpty=true
    uitl.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category
    wx.setNavigationBarTitle({
      title: category
    })
    var dataUrl = ""
    switch (category) {
      case "正在热映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    }
    this.data.requestUrl = dataUrl
    uitl.http(dataUrl, this.processDoubanData)
  }
})