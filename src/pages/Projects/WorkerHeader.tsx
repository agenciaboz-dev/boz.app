import React from "react"
import { Box } from "@mui/material"
import { isDateInThisWeek } from "../Tools/project/isDateInThisWeek"
import { getCurrentWeekDays } from "../Tools/project/getCurrentWeekDays"
import { DayButton } from "./DayButton"
import { GeneralTimesButton } from "./GeneralTimesButton"

interface WorkerHeaderProps {
    worker: ProjectWorker
    working?: ProjectTime
}

export const WorkerHeader: React.FC<WorkerHeaderProps> = ({ worker, working }) => {
    const week_dates = getCurrentWeekDays()
    const week_times = worker.times.filter((time) => isDateInThisWeek(new Date(Number(time.started))))
    const month_times = worker.times.filter((time) => new Date(Number(time.started)).getMonth() == new Date().getMonth())

    return (
        <Box sx={{ borderBottom: "1px solid", borderColor: "primary.main", width: "100%", justifyContent: "space-between", paddingBottom: "0.5vw" }}>
            {week_dates.map((date) => (
                <DayButton
                    key={date.getTime()}
                    date={date}
                    worker={worker}
                    working={working ? (new Date(Number(working.started)).toDateString() == date.toDateString() ? working : undefined) : undefined}
                />
            ))}
            <GeneralTimesButton working={working} times={week_times} label="total semana" />
            <GeneralTimesButton working={working} times={month_times} label="total mês" />
            <GeneralTimesButton working={working} times={worker.times} label="total" />
        </Box>
    )
}
