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
        <Box
            sx={{
                gap: "0.5vw",
                color: "primary.main",
                borderRadius: "0.5vw",
                borderBottom: "2px solid",
                padding: "0.5vw",
                height: "5vw",
            }}
        >
            <Avatar size={"3vw"} small user={user} />

            <Box sx={{ flexDirection: "column", fontSize: "0.8vw", height: "100%", gap: "0.3vw", color: "text.secondary" }}>
                <Box
                    sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => {
                        navigate(`/admin/users/${user.username}`)
                    }}
                >
                    {user.name}
                </Box>
                <Box sx={{ gap: "0.2vw", flexWrap: "wrap", width: "15vw" }}>
                    {user.roles.map((role) => (
                        <Tag
                            key={role.id}
                            name={role.tag}
                            tooltip={role.name}
                            sx={{ fontSize: "0.6vw", padding: "0.1vw 0.3vw", borderRadius: "0.75vw" }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
