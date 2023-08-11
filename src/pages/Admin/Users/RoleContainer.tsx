import React from "react"
import { Box, MenuItem, Paper } from "@mui/material"
import { useUser } from "../../../hooks/useUser"
import { Avatar } from "../../../components/Avatar"

interface RoleContainerProps {}

export const RoleContainer: React.FC<RoleContainerProps> = ({}) => {
    const { list } = useUser()

    return (
        <Paper sx={{ flexDirection: "column", bgcolor: "background.default" }}>
            {list.map((user) => (
                <MenuItem key={user.id} sx={{ alignItems: "center", gap: "1vw" }}>
                    <Avatar size={"3vw"} small user={user} />
                    <p style={{ fontWeight: "bold" }}>{user.name}</p>
                </MenuItem>
            ))}
        </Paper>
    )
}
