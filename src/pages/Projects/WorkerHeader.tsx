import React from "react"
import { Box, MenuItem, SxProps } from "@mui/material"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"
import { getWeekDay } from "../Tools/project/getWeekDay"
import { isDateInThisWeek } from "../Tools/project/isDateInThisWeek"

interface WorkerHeaderProps {
    worker: ProjectWorker
}

export const WorkerHeader: React.FC<WorkerHeaderProps> = ({ worker }) => {
    const week_times = worker.times.filter((time) => isDateInThisWeek(new Date(Number(time.started))))
    const month_times = worker.times.filter((time) => new Date(Number(time.started)).getMonth() == new Date().getMonth())

    const button_style: SxProps = { flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, borderRight: "1px solid" }

    return (
        <Box sx={{ borderBottom: "1px solid", borderColor: "primary.main", width: "100%", justifyContent: "space-between", paddingBottom: "0.5vw" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const times = worker.times.filter((time) => new Date(Number(time.started)).getDay() == day - 1)
                const worked_time = getTotalWorked(times)
                const formatted_time = formatTotalWorked(worked_time, true)
                const active = day == new Date().getDay()

                return (
                    <MenuItem key={day} sx={{ padding: 0, minWidth: 0, minHeight: 0, ...button_style }} disabled={active}>
                        <Box sx={{ fontSize: "1.2rem" }}>{getWeekDay(day - 1)}</Box>
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
