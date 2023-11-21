<template>
  <div class="schedule-item" :style="styleText">
    <div class="title">{{ item.title }}</div>
    <div class="description">{{ item.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTimeRangeMinutes, fullDayTimeLength } from "@/utils/transform";

export default defineComponent({
  name: "ScheduleItem",
  data() {
    return {
      totalHeight: document.documentElement.clientHeight,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    styleText() {
      const { startTime, endTime, bgColor, color } = this.item;
      const timeLength = getTimeRangeMinutes(startTime, endTime);
      return `background-color: ${bgColor};color:${color}; height:${
        (timeLength / fullDayTimeLength) * this.totalHeight
      }px`;
    },
  },
});
</script>

<style lang="scss" scoped>
.schedule-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  border-bottom: #dedede 1px dashed;
  .title {
    font-weight: 500;
    padding: 4px 10px;
    // background-color: rgba(255, 255, 255, 1);
    border-radius: 6px;
    margin-left: 6px;
  }
  .description {
    padding: 10px;
    line-height: 1.5;
    // text-indent: 2em;
  }
}
</style>
