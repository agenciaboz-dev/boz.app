import React from "react"
import { Box, MenuItem } from "@mui/material"

interface ApiContainerProps {
    api: Wakeup
}

export const ApiContainer: React.FC<ApiContainerProps> = ({ api }) => {
    return (
        <MenuItem sx={{ width: "100%" }}>
            <p>{api.name}</p>
        </MenuItem>
    )
}
