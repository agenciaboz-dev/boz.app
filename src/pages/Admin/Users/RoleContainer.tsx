import React from "react"
import { Badge, Box, MenuItem, Paper } from "@mui/material"
import { Avatar } from "../../../components/Avatar"
import { useNavigate } from "react-router-dom"

interface RoleContainerProps {
    department: Department
}

export const RoleContainer: React.FC<RoleContainerProps> = ({ department }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", color: "primary.main", width: "30vw" }}>
            <p style={{ fontWeight: "bold" }}>{department.name}</p>

            <Paper
                sx={{ flexDirection: "column", bgcolor: "background.default" }}
                onClick={() => {
                    navigate("/admin/update")
                }}
            >
                {department.users.map((user) => (
                    <MenuItem key={user.id} sx={{ alignItems: "center", gap: "1vw", color: "text.secondary" }}>
                        <Avatar size={"3vw"} small user={user} />
                        <p style={{ fontWeight: "bold" }}>{user.name}</p>
                    </MenuItem>
                ))}
            </Paper>
        </Box>
    )
}
