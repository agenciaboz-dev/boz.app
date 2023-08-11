import React from "react"
import { Box } from "@mui/material"
import colors from "../style/colors"

interface TagProps {
    color: string
    title: string
}

export const Tag: React.FC<TagProps> = ({ color, title }) => {
    return (
        <Box sx={{ backgroundColor: color, borderRadius: "2vw", width: "max-content", padding: "0.5vw" }}>
            <p style={{ color: colors.secondary, fontSize: "0.65vw", fontWeight: "400" }}>{title}</p>
        </Box>
    )
}
