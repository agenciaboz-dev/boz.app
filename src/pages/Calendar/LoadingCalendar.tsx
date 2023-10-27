import React from "react"
import { Box, Skeleton } from "@mui/material"

interface LoadingCalendarProps {}

export const LoadingCalendar: React.FC<LoadingCalendarProps> = ({}) => {
    return (
        <Box sx={{}}>
            <Skeleton variant="rounded" sx={{ width: "80vw", height: "50vh" }} animation="wave" />
        </Box>
    )
}
