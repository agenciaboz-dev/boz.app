import React from "react"
import { Box, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Avatar } from "../../../components/Avatar"
import { Tag } from "../../../components/Tag"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const navigate = useNavigate()
    return (
        <MenuItem
            sx={{ alignItems: "center", gap: "1vw", color: "text.secondary" }}
            onClick={() => {
                navigate(`/admin/users/${user.username}`)
            }}
        >
            <Avatar size={"3vw"} small user={user} />
            <p style={{ fontWeight: "bold" }}>{user.name}</p>

            <Box sx={{ marginLeft: "auto", gap: "0.2vw" }}>
                {user.roles.map((role) => (
                    <Tag
                        key={role.id}
                        name={role.tag}
                        tooltip={role.name}
                        sx={{ fontSize: "0.75vw", padding: "0.2vw 0.4vw", borderRadius: "0.75vw" }}
                    />
                ))}
            </Box>
        </MenuItem>
    )
}
