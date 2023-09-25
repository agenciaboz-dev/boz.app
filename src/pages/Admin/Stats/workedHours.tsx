import { Box } from "@mui/material"
import { TableColumn } from "react-data-table-component"

export const buildWorkedHours = (logs: StatusLog[]) => {
    const groupedByDay = logs.reduce<Record<string, StatusLog[]>>((acc, item) => {
        const date = new Date(item.datetime).toDateString()
        acc[date] = acc[date] || []
        acc[date].push(item)
        return acc
    }, {})

    const days = Object.values(groupedByDay)

    const connectedTimes = days.map((logs) => {
        logs.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())

        const meetingMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                if (status == 2) {
                    if (!acc.meetingStartTime) {
                        acc.meetingStartTime = new Date(datetime)
                    }
                }

                if ((status === 0 || status === 1 || status === 3 || status === 4 || index === logs.length - 1) && acc.meetingStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.meetingStartTime.getTime()) / 1000 / 60
                    acc.meetingStartTime = null
                }

                return acc
            },
            { totalMinutes: 0, meetingStartTime: null as Date | null }
        )

        const pauseMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                if (status == 3) {
                    if (!acc.pauseStartTime) {
                        acc.pauseStartTime = new Date(datetime)
                    }
                }

                if ((status === 0 || status === 1 || status === 2 || status === 4 || index === logs.length - 1) && acc.pauseStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.pauseStartTime.getTime()) / 1000 / 60
                    acc.pauseStartTime = null
                }

                return acc
            },
            { totalMinutes: 0, pauseStartTime: null as Date | null }
        )

        const lunchMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                if (status == 4) {
                    if (!acc.lunchStartTime) {
                        acc.lunchStartTime = new Date(datetime)
                    }
                }

                if ((status === 0 || status === 1 || status === 2 || status === 3 || index === logs.length - 1) && acc.lunchStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.lunchStartTime.getTime()) / 1000 / 60
                    acc.lunchStartTime = null
                }

                return acc
            },
            { totalMinutes: 0, lunchStartTime: null as Date | null }
        )

        const totalMinutes = logs.reduce(
            (acc, log, index) => {
                const { status, datetime } = log

                if (status === 1 || status === 2 || status === 3) {
                    if (!acc.connectedStartTime) {
                        acc.connectedStartTime = new Date(datetime)
                    }
                }

                if ((status === 0 || status === 4 || index === logs.length - 1) && acc.connectedStartTime) {
                    const endTime = new Date(datetime)
                    acc.totalMinutes += (endTime.getTime() - acc.connectedStartTime.getTime()) / 1000 / 60
                    acc.connectedStartTime = null
                }

                return acc
            },
            { totalMinutes: 0, connectedStartTime: null as Date | null }
        )

        const time = new Date()

        const lunchTime = new Date()
        time.setHours(0, 0, 0, 0)
        time.setMinutes(totalMinutes.totalMinutes)
        const formattedTime = time.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })

        lunchTime.setHours(0, 0, 0, 0)
        lunchTime.setMinutes(lunchMinutes.totalMinutes)
        const formattedLunchTime = lunchTime.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })

        const pauseTime = new Date()
        pauseTime.setHours(0, 0, 0, 0)
        pauseTime.setMinutes(pauseMinutes.totalMinutes)
        const formattedPauseTime = pauseTime.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })

        const meetingTime = new Date()
        meetingTime.setHours(0, 0, 0, 0)
        meetingTime.setMinutes(meetingMinutes.totalMinutes)
        const formattedMeetingTime = meetingTime.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })

        return { date: logs[0].datetime, minutes: formattedTime, lunch: formattedLunchTime, pause: formattedPauseTime, meeting: formattedMeetingTime }
    })

    const columns: TableColumn<{
        date: string
        minutes: string
        lunch: string
        pause: string
        meeting: string
    }>[] = [
        {
            name: "Data",
            selector: (row) => row.date,
            sortable: true,
            cell: (row) => <Box>{new Date(row.date).toLocaleDateString("pt-br")}</Box>,
            width: "5vw",
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
            name: "Reunião",
            selector: (row) => row.meeting,
            sortable: true,
            cell: (row) => <Box>{row.meeting}</Box>,
            width: "5.1vw",
            center: true,
        },
        {
            name: "Pausa",
            selector: (row) => row.pause,
            sortable: true,
            cell: (row) => <Box>{row.pause}</Box>,
            width: "4.5vw",
            center: true,
        },
        {
            name: "Almoço",
            selector: (row) => row.lunch,
            sortable: true,
            cell: (row) => <Box>{row.lunch}</Box>,
            width: "5vw",
            right: true,
        },
    ]

    return { data: connectedTimes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), columns }
}
