export const getDateTimes = (times: ProjectTime[], date: Date) =>
    times.filter((item) => new Date(Number(item.started)).toDateString() == date.toDateString())
