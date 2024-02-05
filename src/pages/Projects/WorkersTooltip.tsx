import React from "react"
import { Box, Paper, Tooltip } from "@mui/material"
import { UserAvatar } from "../Admin/Stats/StatusLogs"
import { getCurrentWorkingTime } from "../Tools/project/getWorker"
import { Label } from "../Tools/Wakeup/Label"

interface WorkersTooltipProps {
    workers: ProjectWorker[]
    children: React.ReactElement
}

export const WorkersTooltip: React.FC<WorkersTooltipProps> = ({ workers, children }) => {
    return (
        <Tooltip
            placement="right-start"
            enterDelay={0}
            componentsProps={{ tooltip: { sx: { bgcolor: "background.default", padding: 0 } } }}
            title={
                workers.length ? (
                    <Paper
                        sx={{
                            flexDirection: "column",
                            gap: "0.3vw",
                            bgcolor: "background.default",
                            padding: "0.5vw",
                            color: "text.secondary",
                            maxHeight: "40vh",
                            overflowY: "auto",
                        }}
                    >
                        {workers.map((worker) => (
                            <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                                <UserAvatar user={worker.user} avatarSize="2vw" key={worker.id} />
                                <Label label={getCurrentWorkingTime(worker)?.role!} color={"info"} />
                            </Box>
                        ))}
                    </Paper>
                ) : null
            }
        >
            {children}
        </Tooltip>
    )
}
