import React from "react"
import { Box, Skeleton } from "@mui/material"
import { useArray } from "burgos-array"

interface ChatsSkeletonsProps {}

export const ChatsSkeletons: React.FC<ChatsSkeletonsProps> = ({}) => {
    const skeletons = useArray().newArray(10)

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            {skeletons.map((index) => (
                <Skeleton key={index} variant="rounded" sx={{ width: "30%", height: "5vw" }} animation="wave" />
            ))}
        </Box>
    )
}
