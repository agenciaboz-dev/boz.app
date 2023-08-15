import React from "react"
import { Box } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { Roles } from "./Roles"

interface DeparmentsProps {
    user: User
}

export const Deparments: React.FC<DeparmentsProps> = ({ user }) => {
    return (
        <Box sx={{ ...backgroundStyle, padding: "2vw" }}>
            <Roles />
        </Box>
    )
}
