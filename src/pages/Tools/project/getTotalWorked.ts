export const getTotalWorked = (times: ProjectTime[]) => {
    const worked_milliseconds = times.reduce((total, current) => {
        return (Number(current.worked) || new Date().getTime() - Number(current.started)) + total
    }, 0)

    return worked_milliseconds
}

export const formatTotalWorked = (worked_milliseconds: number, no_milli?: boolean) => {
    // Convert milliseconds to hours and minutes
    const hours = Math.floor(worked_milliseconds / 3600000)
    const minutes = Math.floor((worked_milliseconds % 3600000) / 60000)
    const seconds = Math.floor((worked_milliseconds % 60000) / 1000)

    // Format hours and minutes as HH:mm
    const formattedTime = `${hours.toString().padStart(2, "0")}h${minutes.toString().padStart(2, "0")}`
    const formattedTimeNoMIlli = `${hours.toString().padStart(2, "0")}h${minutes.toString().padStart(2, "0")}`
    return no_milli ? formattedTimeNoMIlli : formattedTime
}
