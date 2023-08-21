import { Box } from "@mui/material"
import { TableColumn } from "react-data-table-component"

const calculateMinutesDifference = (start: string, end: string): number => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return (endDate.getTime() - startDate.getTime()) / 1000 / 60
}

export const buildWorkedHours = (logs: StatusLog[]) => {
    const groupedByDay = logs.reduce<Record<string, StatusLog[]>>((acc, item) => {
        const date = new Date(item.datetime).getDate()
        acc[date] = acc[date] || []
        acc[date].push(item)
        return acc
    }, {})

    // If you want the result to be an array of arrays
    const days = Object.values(groupedByDay)

    const connectedTimes = days.map((logs) => {
        // Reduce the logs to calculate the total connected time
        logs.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
        const lunchMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                // If the status is connected, meeting, or pause
                if (status == 4) {
                    // If there's no start time, this is the beginning of a connected period
                    if (!acc.lunchStartTime) {
                        acc.lunchStartTime = new Date(datetime)
                    }
                }

                // If the status is disconnected or this is the last log
                if ((status === 1 || status === 2 || status === 3 || index === logs.length - 1) && acc.lunchStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.lunchStartTime.getTime()) / 1000 / 60
                    acc.lunchStartTime = null // Reset the start time
                }

                return acc
            },
            { totalMinutes: 0, lunchStartTime: null as Date | null }
        )

        const totalMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                // If the status is connected, meeting, or pause
                if (status === 1 || status === 2 || status === 3) {
                    // If there's no start time, this is the beginning of a connected period
                    if (!acc.connectedStartTime) {
                        acc.connectedStartTime = new Date(datetime)
                    }
                }

                // If the status is disconnected or this is the last log
                if ((status === 0 || status === 4 || index === logs.length - 1) && acc.connectedStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.connectedStartTime.getTime()) / 1000 / 60
                    acc.connectedStartTime = null // Reset the start time
                }

                return acc
            },
            { totalMinutes: 0, connectedStartTime: null as Date | null }
        )

        const time = new Date()
        const lunchTime = new Date()

        time.setHours(0, 0, 0, 0)
        lunchTime.setHours(0, 0, 0, 0)

        // Add the total connected minutes
        time.setMinutes(totalMinutes.totalMinutes)
        lunchTime.setMinutes(lunchMinutes.totalMinutes)

        // Format the time
        const formattedTime = time.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })
        const formattedLunchTime = lunchTime.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })

        return { date: logs[0].datetime, minutes: formattedTime, lunch: formattedLunchTime }
    })

    const columns: TableColumn<{
        date: string
        minutes: string
        lunch: string
    }>[] = [
        {
            name: "Data",
            selector: (row) => row.date,
            sortable: true,
            cell: (row) => <Box>{new Date(row.date).toLocaleDateString("pt-br")}</Box>,
            width: "10vw",
        },
        {
            name: "Horas",
            selector: (row) => row.minutes,
            sortable: true,
            cell: (row) => <Box>{row.minutes}</Box>,
            width: "5vw",
            center: true,
        },
        {
            name: "Almoço",
            selector: (row) => row.lunch,
            sortable: true,
            cell: (row) => <Box>{row.lunch}</Box>,
            width: "10vw",
            right: true,
        },
    ]

    return { data: connectedTimes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), columns }
}
