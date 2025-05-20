(function () {
  var currentTimeLine = document.getElementById("currentTimeLine");
  var currentTime = document.getElementById("currentTime");
  var totalHeight = document.documentElement.clientHeight;

  var bgColors = [
    "#ffe6e6",
    "#fff3e6",
    "#fdffe6",
    "#efffe6",
    "#e6ffea",
    "#e6fff7",
    "#e6f9ff",
    "#e6ebff",
    "#eee6ff",
    "#fbe6ff",
  ];

  var textColors = [
    "#993d3d",
    "#996f3d",
    "#92993d",
    "#60993d",
    "#3d994c",
    "#3d997d",
    "#3d8399",
    "#3d5199",
    "#5b3d99",
    "#8c3d99",
  ];

  var scheduleConfig = [
    {
      startTime: "00:00",
      endTime: "06:00",
      title: "Sleep",
      // description: "Sleep Time",
      bgColor: bgColors[7],
      color: textColors[7],
    },
    {
      startTime: "06:00",
      endTime: "07:00",
      title: "Breakfirst",
      // description: "Have a breakfirst",
      bgColor: bgColors[1],
      color: textColors[1],
    },
    {
      startTime: "07:00",
      endTime: "08:00",
      title: "Traffic",
      // description: "Go to school & work",
      bgColor: bgColors[4],
      color: textColors[4],
    },
    {
      startTime: "08:00",
      endTime: "09:30",
      title: "Study",
      // description: "Learn good things",
      bgColor: bgColors[5],
      color: textColors[5],
    },
    {
      startTime: "09:30",
      endTime: "11:30",
      title: "Work",
      bgColor: bgColors[6],
      color: textColors[6],
    },
    {
      startTime: "11:30",
      endTime: "13:00",
      title: "Lunch",
      bgColor: bgColors[1],
      color: textColors[1],
    },
    {
      startTime: "13:00",
      endTime: "15:00",
      title: "Work",
      bgColor: bgColors[6],
      color: textColors[6],
    },
    {
      startTime: "15:00",
      endTime: "17:00",
      title: "Study",
      bgColor: bgColors[5],
      color: textColors[5],
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      title: "Supper",
      bgColor: bgColors[1],
      color: textColors[1],
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      title: "Study",
      bgColor: bgColors[5],
      color: textColors[5],
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      title: "Relex",
      bgColor: bgColors[9],
      color: textColors[9],
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      title: "Wash & Clean",
      bgColor: bgColors[2],
      color: textColors[2],
    },
    {
      startTime: "21:00",
      endTime: "23:59",
      title: "Sleep",
      bgColor: bgColors[7],
      color: textColors[7],
    },
  ];

  function padStart(str, length, prefix) {
    const len = String(str).length;
    const result = [];
    for (var i = len; i < length; i++) {
      result.push(prefix || "0");
    }
    result.push(str);
    return result.join("");
  }

  function getTimeRangeMinutes(startTime, endTime) {
    var startArr = startTime.split(":");
    var endArr = endTime.split(":");
    var timeArr = [
      Number(startArr[0]),
      Number(startArr[1]),
      Number(endArr[0]),
      Number(endArr[1]),
    ];

    var startTimeMinutes = timeArr[0] * 60 + timeArr[1];
    var endTimeMinutes = timeArr[2] * 60 + timeArr[3];

    return endTimeMinutes - startTimeMinutes;
  }

  var fullDayTimeLength = getTimeRangeMinutes("00:00", "24:00");

  // time scales
  var timeScales = {
    create() {
      var scaleContainer = document.getElementById("scaleContainer");
      var timeMinutesDiff =
        (getTimeRangeMinutes("00:00", "00:00") || fullDayTimeLength) / 60;
      var result = [];

      for (var i = 0; i <= timeMinutesDiff; i++) {
        result.push(i);
      }

      // add non-integer
      if (result[result.length - 1] !== timeMinutesDiff) {
        result.push(timeMinutesDiff);
      }

      var unitHeight = totalHeight / 24;
      for (var j = 0; j < result.length; j++) {
        var scale = result[j];
        var item = {
          value:
            padStart(String(Math.floor(scale)), 2) +
            ":" +
            padStart(String((scale * 60) % 60), 2),
          height: unitHeight * (result[j + 1] ? result[j + 1] - scale : 0),
          top: (scale / 24) * totalHeight,
        };

        if (item.height) {
          var node = document.createElement("div");
          node.className = "time-schedule-item";
          node.style.cssText =
            "height:" + item.height + "px; top:" + item.top + "px;";
          node.innerHTML =
            '<div class="line"></div><div class="text">' +
            item.value +
            "</div>";

          scaleContainer.appendChild(node);
        }
      }
    },
  };
  timeScales.create();

  // schedules
  var schedules = {
    create() {
      var scheduleContainer = document.getElementById("schedule");
      scheduleContainer.style.cssText =
        "background-color: " + scheduleConfig[0].bgColor;

      for (var i = 0; i < scheduleConfig.length; i++) {
        var item = scheduleConfig[i];

        const timeLength = getTimeRangeMinutes(item.startTime, item.endTime);

        var node = document.createElement("div");
        node.className = "schedule-item";
        node.style.cssText =
          "background-color:" +
          item.bgColor +
          "; color:" +
          item.color +
          "; height:" +
          (timeLength / fullDayTimeLength) * totalHeight +
          "px";
        node.innerHTML =
          '<div class="title">' +
          item.title +
          '</div><div class="description">' +
          (item.description || "") +
          "</div>";

        scheduleContainer.appendChild(node);
      }
    },
  };
  schedules.create();

  // time line
  var scheduleManager = {
    currentTime: "",
    updateCurrentTime() {
      // eslint-disable-next-line
      var self = this;

      this.currentTime = new Date().toTimeString().slice(0, 5);
      currentTime.innerText = new Date().toTimeString().slice(0, 8);

      this.updateTimeStyle();

      setTimeout(function () {
        self.updateCurrentTime();
      }, 1000 * 1);
    },

    updateTimeStyle() {
      var timeRangeMinutes = getTimeRangeMinutes("00:00", this.currentTime);
      currentTimeLine.style.top =
        (timeRangeMinutes / fullDayTimeLength) *
          document.documentElement.clientHeight +
        7 +
        "px";
    },
  };

  scheduleManager.updateCurrentTime();
})();
