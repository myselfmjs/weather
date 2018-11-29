//
var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  data: {
    // weatherData:''
    city: "",
    district:"",
    region:"", //默认下拉城市
    today: {},
    future: {},

  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'A2EBZ-YKCW3-OZA33-YFX2B-3IBWO-GUBAE'
    });
    this.loadInfo();
  },

  onShow:function(){
    this.loadInfo();
  },

  //自定义获取位置
  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //var speed = res.speed
        //var accuracy = res.accuracy
        page.loadCity(latitude, longitude);
      }
    })
  },

  //自定义获取城市
  loadCity: function (latitude, longitude) {
    var page = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude, // 使用 wx.getLocation 的返回值
        longitude: longitude
      },
      success: function (res) {
        if (res.status == 0) {
          // 获取到城市名
          let province = res.result.ad_info.province;
          let city = res.result.ad_info.city;
          let district = res.result.ad_info.district;
          var region = [province,city,district]
          page.setData({
            region:region,
          }),
          //city = city.replace("市", "");
          page.loadWeather(city,district);
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        //  console.log(res);
      }
    });
  },

  //自定义获取天气
  loadWeather: function (city, district) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({
          today: today,
          future: future,
          city: city,
          district, district
        });
      }
    })
  },
  //城市选择跳转
  // queryItemClick: function(){
  //   console.log("123123213")
  //   wx.navigateTo({
  //     url: '../index/index',
  //   })
  // },

  //城市选择
  bindRegionChange: function (e) {
    var page = this;
    var city = e.detail.value[1]
    var district = e.detail.value[2]
    page.loadWeather(city,district)
   
  }

})