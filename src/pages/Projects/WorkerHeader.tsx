import React from "react"
import { Box, MenuItem, SxProps } from "@mui/material"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"
import { getWeekDay } from "../Tools/project/getWeekDay"
import { isDateInThisWeek } from "../Tools/project/isDateInThisWeek"
import { getCurrentWeekDays } from "../Tools/project/getCurrentWeekDays"

interface WorkerHeaderProps {
    worker: ProjectWorker
}

export const WorkerHeader: React.FC<WorkerHeaderProps> = ({ worker }) => {
    const week_dates = getCurrentWeekDays()
    const week_times = worker.times.filter((time) => isDateInThisWeek(new Date(Number(time.started))))
    const month_times = worker.times.filter((time) => new Date(Number(time.started)).getMonth() == new Date().getMonth())

    const button_style: SxProps = { flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, borderRight: "1px solid" }

    return (
        <Box sx={{ borderBottom: "1px solid", borderColor: "primary.main", width: "100%", justifyContent: "space-between", paddingBottom: "0.5vw" }}>
            {week_dates.map((date) => {
                const times = worker.times.filter((time) => new Date(Number(time.started)).getDate() == date.getDate())
                const worked_time = getTotalWorked(times)
                const formatted_time = formatTotalWorked(worked_time, true)
                const active = date.getDate() == new Date().getDate()

                return (
                    <MenuItem key={date.getTime()} sx={{ padding: 0, minWidth: 0, minHeight: 0, ...button_style }} disabled={active}>
                        <Box sx={{ fontSize: "1.2rem" }}>{getWeekDay(date.getDay())}</Box>
                        <Box>{formatted_time}</Box>
                    </MenuItem>
                )
            })}
            <Box sx={button_style}>
                <Box sx={{ fontSize: "1.2rem" }}>{"total semana"}</Box>
                <Box>{formatTotalWorked(getTotalWorked(week_times), true)}</Box>
            </Box>
            <Box sx={button_style}>
                <Box sx={{ fontSize: "1.2rem" }}>{"total mês"}</Box>
                <Box>{formatTotalWorked(getTotalWorked(month_times), true)}</Box>
            </Box>
            <Box sx={{ ...button_style, borderRight: "" }}>
                <Box sx={{ fontSize: "1.2rem" }}>{"total"}</Box>
                <Box>{formatTotalWorked(getTotalWorked(worker.times), true)}</Box>
            </Box>
        </Box>
    )
}
