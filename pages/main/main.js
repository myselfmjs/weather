//
var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  data: {

    // weatherData:''

    city: "",

    today: {},

    future: {},

  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'A2EBZ-YKCW3-OZA33-YFX2B-3IBWO-GUBAE'
    });
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
    // wx.getLocation({

    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度

    //   success: function (res) {

    //     var latitude = res.latitude

    //     var longitude = res.longitude

    //     console.log(latitude, longitude);

    //     page.loadCity(latitude, longitude);

    //   }

    // })

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
        console.log(res);
        if (res.status == 0) {
          // 获取到城市名
          let city = res.result.ad_info.city;
          city = city.replace("市", "");
          page.setData({
            city: city
          });
          page.loadWeather(city);
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        //  console.log(res);
      }
    });

    // wx.request({

    //   url: 'http://api.map.baidu.com/geocoder/v2/?ak=weather&location=' + latitude + ',' + longitude + '&output=json',

    //   header: {

    //     'content-type': 'application/json'

    //   },

    //   success: function (res) {

    //     console.log(res);

    //     var city = res.data.result.addressComponent.city;

    //     city = city.replace("市", "");

    //     page.setData({

    //       city: city

    //     });

    //     page.loadWeather(city);

    //   }

    // })

  },

  //自定义获取天气

  loadWeather: function (city) {

    var page = this;

    wx.request({

      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,

      header: {

        'content-type': 'application/json'

      },

      success: function (res) {

        console.log(res);

        var future = res.data.data.forecast;

        var todayInfo = future.shift();

        var today = res.data.data;

        today.todayInfo = todayInfo;

        page.setData({

          today: today,

          future: future,

        });

      }

    })

  }

})