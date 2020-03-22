import * as http from "../../network/index";
Page({
  data: {
    tasks: {},
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
    //todo title太长
    dialogButtons: [{ text: "取消" }, { text: "确定" }],

    show: false,
        buttons: [
            {
                type: 'default',
                text: '取消',
                value: 0
            },
            {
                type: 'primary',
                text: '确认',
                value: 1
            }
        ]
  },
  tapMath() {
    wx.navigateTo({
      url: "../math/math"
    });
  },
  tabChange(e) {
    const index = e.detail.index;
    console.log(index);
    this.setData({
      tabIndex: index
    });
    if (index === 1) {
      this.getTasks();
    }
  },
  doneTap(e) {
    let index = e.currentTarget.dataset.index;
    const tasks = this.data.tasks;
    tasks[index].done = !tasks[index].done;
    this.setData({
      tasks
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
      show: true
    });
  },
  confirmAddTask(e) {
    this.setData({
      showAddTaskDialog: false
    });
  },

  getTasks() {
    http.get("/tasks").then(res => {
      this.setData({
        tasks: res.data.data
      });
    });
  },

  open: function () {
    this.setData({
        show: true
    })
},
buttontap(e) {
    console.log(e.detail)
},
  onLoad: function() {},
  getUserInfo: function(e) {}
});
