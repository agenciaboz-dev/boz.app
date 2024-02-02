export const getTotalWorked = (worker: ProjectWorker) => {
    const worked_milliseconds = worker.times.reduce((total, current) => {
        return (Number(current.worked) || new Date().getTime() - Number(current.started)) + total
    }, 0)

    return worked_milliseconds
}

export const formatTotalWorked = (worked_milliseconds: number) => {
    // Convert milliseconds to hours and minutes
    const hours = Math.floor(worked_milliseconds / 3600000)
    const minutes = Math.floor((worked_milliseconds % 3600000) / 60000)
    const seconds = Math.floor((worked_milliseconds % 60000) / 1000)

    // Format hours and minutes as HH:mm
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    return formattedTime
}
