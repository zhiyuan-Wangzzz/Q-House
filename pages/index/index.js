Page({
  data: {
    tabIndex: 0,
    showAddTaskDialog: false,
    list: [
      {
        text: "题库",
        iconPath: "../../../image/icon_API.png",
        selectedIconPath: "../../../image/icon_API_HL.png",
        dot: true
      },
      {
        text: "打卡",
        iconPath: "../../../image/icon_component.png",
        selectedIconPath: "../../../image/icon_component_HL.png",
        badge: "laoma"
      }
    ],
    slideButtons: [
      {
        type: "warn",
        text: "删除",
        extClass: "test"
      }
    ],
    tasks: [
      { title: "1", content: "c1", done: false },
      { title: "2", content: "c2", done: false },
      { title: "3", content: "c3", done: false }
    ],
    dialogButtons: [{ text: "取消" }, { text: "确定" }]
  },
  tapMath() {
    wx.navigateTo({
      url: "../math/math"
    });
  },
  tabChange(e) {
    console.log("tab change", e);
    this.setData({
      tabIndex: e.detail.index
    });
    wx.request({
      url: "https://api.ofzhiyuan.wang/haha", //仅为示例，并非真实的接口地址
      success: function(res) {
        console.log(res);
      }
    });
    console.log(this.data.tabIndex);
  },
  doneTap(e) {
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    const tasks = this.data.tasks;
    tasks[index].done = true;
    this.setData({
      tasks: tasks
    });
  },
  slideButtonTap(e) {
    this.data.tasks.splice(e.target.id, 1);
    var tasks = this.data.tasks;
    this.setData({
      tasks
    });
  },
  showAddTask(e) {
    this.setData({
      showAddTaskDialog: true
    });
  },
  confirmAddTask(e) {
    this.setData({
      showAddTaskDialog: false
    });
  },
  onLoad: function() {},
  getUserInfo: function(e) {}
});
