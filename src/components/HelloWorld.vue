<template>
  <div class="daily-schedule">
    <div class="time-scale">
      <TimeScale></TimeScale>
      <div class="current-time" :style="currentTimeStyle">
        <span class="time-info">{{ currentTime }}</span>
      </div>
    </div>
    <div class="schedule">
      <ScheduleItem
        v-for="item in scheduleConfig"
        :item="item"
        :key="item.startTime"
      ></ScheduleItem>
    </div>
    <div class="calendar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "./ScheduleItem.vue";
import TimeScale from "./TimeScale.vue";
import { getTimeRangeMinutes, fullDayTimeLength } from "@/utils/transform";
import { scheduleConfig } from "@/config/schedule";

export default defineComponent({
  name: "ScheduleDaily",
  data() {
    return {
      currentTime: "",
      scheduleConfig,
    };
  },
  // props: {},
  components: {
    ScheduleItem,
    TimeScale,
  },
  mounted() {
    this.updateCurrentTime();
  },
  computed: {
    currentTimeStyle() {
      const timeRangeMinutes = getTimeRangeMinutes("00:00", this.currentTime);
      return `top: ${
        (timeRangeMinutes / fullDayTimeLength) *
          document.documentElement.clientHeight +
        7
      }px`;
    },
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = new Date().toTimeString().slice(0, 5);
      setTimeout(() => {
        this.updateCurrentTime();
      }, 1000 * 60);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.daily-schedule {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // background: rgba(250, 250, 235, 1);
  display: flex;
  .time-scale {
    width: 60px;
    position: relative;
  }
  .schedule {
    padding-top: 7px;
    flex: 1;
    // background-color: rgba(255, 255, 240, 1);
    border-left: #dedede 1px solid;
    border-right: #dedede 1px solid;
  }
  .calendar {
    width: 260px;
  }
  .current-time {
    position: absolute;
    left: 40px;
    top: 0px;
    border-top: rgba(255, 130, 100, 1) 1px solid;
    width: calc(100vw - 300px);
    font-size: 11px;
    color: rgb(255, 230, 230);
    .time-info {
      // position: absolute;
      // left: -34px;
      // top: -6px;
      background: rgba(255, 130, 100, 1);
      border-radius: 0 0 4px 4px;
      display: inline-block;
      padding: 0 2px;
    }
  }
}
</style>
