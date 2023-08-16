import React from "react"
import { Box, Skeleton } from "@mui/material"
import { useArray } from "burgos-array"
import { useMediaQuery } from "react-responsive"

interface ChatsSkeletonsProps {}

export const ChatsSkeletons: React.FC<ChatsSkeletonsProps> = ({}) => {
    const isMobile = useMediaQuery({maxWidth: 600})
    const skeletons = useArray().newArray(10)

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            {skeletons.map((index) => (
                <Skeleton key={index} variant="rounded" sx={{ width: isMobile ? "100%" : "30%", height: "5vw" }} animation="wave" />
            ))}
        </Box>
    )
}
