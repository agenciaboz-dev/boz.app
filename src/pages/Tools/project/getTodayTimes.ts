export const getTodayTimes = (times: ProjectTime[]) =>
    times.filter((item) => new Date(Number(item.started)).toDateString() == new Date().toDateString())
