import React from "react"
import { Box } from "@mui/material"

interface WorkerContainerProps {
    worker: Worker
}

export const WorkerContainer: React.FC<WorkerContainerProps> = ({ worker }) => {
    return (
        <Box sx={{}}>
            <Box>{worker.user.name}</Box>
        </Box>
    )
}
