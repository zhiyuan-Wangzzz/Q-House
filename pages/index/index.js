import * as http from "../../network/index";
Page({
  data: {
    tasks: {},
    tabIndex: 0,
    showAddTaskDialog: false,
    taskContent: "",
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
        type: "default",
        text: "取消",
        value: 0
      },
      {
        type: "primary",
        text: "确认",
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
      showAddTaskDialog: true
    });
  },

  getTasks() {
    http.get("/tasks").then(res => {
      this.setData({
        tasks: res.data.data
      });
    });
  },

  open: function() {
    this.setData({
      show: true
    });
  },
  buttontap(e) {
    if (e.detail.index === 1 && this.data.taskContent.trim()) {
      console.log("add task");
      const data = { content: this.data.taskContent, status: 0 };
      http
        .post("/tasks", data)
        .then(res => {
          console.log(res);
          const tasks = this.data.tasks;
          tasks[0].push(res.data.data);
          this.setData({
            tasks
          });
        })
        .catch(err => console.log(err));
    }
    this.setData({
      showAddTaskDialog: false,
      taskConent: ""
    });
  },

  taskInput(e) {
    this.setData({
      taskContent: e.detail.value
    });
  },

  checkboxTap(e) {
    const indexStr = e.detail.value;
    console.log(indexStr);
    const indexArr = indexStr.split(" ");
    const tasks = this.data.tasks;
    const task = tasks[indexArr[0]][indexArr[1]];
    task.status = +e.detail.checked;
    http.put("/tasks", { id: task._id, status: task.status });
  },
  onLoad: function() {},
  getUserInfo: function(e) {}
});
