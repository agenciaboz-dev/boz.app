import React from "react"
import { Box } from "@mui/material"
import { RoleContainer } from "./RoleContainer"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    return (
        <Box sx={{ flexDirection: "column", padding: "2vw", width: "100%" }}>
            <RoleContainer />
        </Box>
    )
}
