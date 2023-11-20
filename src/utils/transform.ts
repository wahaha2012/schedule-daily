/**
 * get time range diff minutes
 * @param startTime
 * @param endTime
 * @returns
 */
export const getTimeRangeMinutes = (startTime: string, endTime: string) => {
  const timeArr = [...startTime.split(":"), ...endTime.split(":")].map((t) =>
    Number(t)
  );
  const startTimeMinutes = timeArr[0] * 60 + timeArr[1];
  const endTimeMinutes = timeArr[2] * 60 + timeArr[3];

  return endTimeMinutes - startTimeMinutes;
};

export const fullDayTimeLength = getTimeRangeMinutes("00:00", "24:00");
