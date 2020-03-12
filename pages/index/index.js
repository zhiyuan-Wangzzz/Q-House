//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabIndex:0,
    list: [{
      "text": "题库",
      "iconPath": "../../../image/icon_API.png",
      "selectedIconPath": "../../../image/icon_API_HL.png",
      dot: true
    },
    {
      "text": "打卡",
      "iconPath": "../../../image/icon_component.png",
      "selectedIconPath": "../../../image/icon_component_HL.png",
      badge: 'laoma'
    }],
      radioItems: [
        { name: 'cell standard', value: '0', checked: true },
        { name: 'cell standard', value: '1' }
      ],
      checkboxItems: [
        { name: 'standard is dealt for u.', value: '0', checked: true },
        { name: 'standard is dealicient for u.', value: '1' }
      ],
    slideButtons: [ {
      text: '完成',
      extClass: 'test',
    }, {
      type: 'warn',
      text: '删除',
      extClass: 'test',
    }],
    array:[{title:'1',content:'c1'},
      { title: '2', content: 'c2' },
      { title: '3', content: 'c3' }]
  },
  tapMath(){
    wx.navigateTo({
      url: "../math/math"
    })
  },
  tabChange(e) {
    console.log('tab change', e)
    this.setData({
      tabIndex:e.detail.index
    })
    console.log(this.data.tabIndex)
  },
  slideButtonTap(e) {
    this.data.array.splice(e.target.id,1)
    var arr=this.data.array
    this.setData({
      array:arr
    })
    console.log(this.data.array)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        nbTitle: '新标题',
        nbLoading: true,
      
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
