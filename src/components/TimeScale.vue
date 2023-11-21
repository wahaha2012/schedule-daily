<template>
  <div>
    <div
      class="time-schedule-item"
      v-for="scale in allScales"
      :key="scale.value"
      :style="`height:${scale.height}px;top:${scale.top}px`"
    >
      <div class="line"></div>
      <div class="text">{{ scale.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTimeRangeMinutes, fullDayTimeLength } from "@/utils/transform";

export default defineComponent({
  name: "TimeScale",
  data() {
    return {
      totalHeight: document.documentElement.clientHeight,
    };
  },
  props: {
    startTime: {
      type: String,
      default: "00:00",
    },
    endTime: {
      type: String,
      default: "00:00",
    },
  },
  computed: {
    allScales() {
      const timeMinutesDiff =
        (getTimeRangeMinutes(this.startTime, this.endTime) ||
          fullDayTimeLength) / 60;
      const result: number[] = [];

      for (let i = 0; i <= timeMinutesDiff; i++) {
        result.push(i);
      }

      // add non-integer
      if (result[result.length - 1] !== timeMinutesDiff) {
        result.push(timeMinutesDiff);
      }

      const unitHeight = this.totalHeight / 24;
      // console.log("unitHeight", unitHeight);
      return result
        .map((scale, i) => ({
          value:
            String(Math.floor(scale)).padStart(2, "0") +
            ":" +
            String((scale * 60) % 60).padStart(2, "0"),
          // rate: scale / 24,
          height: unitHeight * (result[i + 1] ? result[i + 1] - scale : 0),
          top: (scale / 24) * this.totalHeight,
        }))
        .filter((item) => item.height);
    },
  },
});
</script>

<style lang="scss" scoped>
.time-schedule-item {
  position: absolute;
  color: #666;
  width: 100%;
  .text {
    position: absolute;
    left: 6px;
    top: 0;
    font-size: 13px;
  }
  .line {
    border-top: #dedede 1px solid;
    position: absolute;
    right: 0;
    top: 6px;
    width: 23px;
  }
}
</style>
