function convertToStarArray(stars){
  var num = stars.toString().substring(0,1)
  var array = []
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1)
    }else{
      array.push(0)
    }
  }
  return array
}
function http(url,callback) {
  wx.request({
    url: url,
    method: "GET",
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
module.exports ={
  convertToStarArray: convertToStarArray,
  http:http
}