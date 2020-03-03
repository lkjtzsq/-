// pages/movies/movies.js
var uitls = require('../../utils/utils.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    searchPannelShow: false,
    searchResult:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3"
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId='+movieId
    })
  },
  onMoreTap: function(event) {
    console.log(event)
    var category = event.currentTarget.dataset.category
    console.log(category)
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this
    wx.request({
      url: url,
      method: "GET",
      success: function(res) {
        console.log(res.data.subjects)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  onBindConfirm: function(event) {
    var text = event.detail.value
    console.log(text)
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
    this.getMovieListData(searchUrl,"searchResult","")
  },
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPannelShow: false,
      searchResult:{}
    })
  },
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPannelShow: true
    })
  },
  processDoubanData: function(moviesDouban, settedKey, categoryTitle) {
    var movies = []
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: uitls.convertToStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverImg: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      movies: movies,
      categoryTitle: categoryTitle
    }
    this.setData(readyData)
  }
})