import React from "react"
import { Box, MenuItem, Paper, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Avatar } from "../../../components/Avatar"
import { Tag } from "../../../components/Tag"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    return (
        <Paper
            elevation={1}
            sx={{
                gap: isMobile ? "3vw" : "0.5vw",
                color: "primary.main",
                
                borderBottom: "2px solid",
                padding: isMobile ? "3vw" : "0.5vw",
                height: isMobile ? "auto" : "5vw",
                alignItems: "center",
                bgcolor: "background.default",
                boxShadow: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px",
            }}
        >
            <Avatar size={isMobile ? "15vw" : "3vw"} small user={user} />

            <Box
                sx={{
                    flexDirection: "column",
                    fontSize: isMobile ? "5vw" : "0.9vw",
                    height: "100%",
                    gap: isMobile ? "2vw" : "0.3vw",
                    color: "text.secondary",
                }}
            >
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
                    {user.name.split(" ")[0]}
                </Box>
                <Box sx={{ gap: isMobile ? "2vw" : "0.2vw", flexWrap: "wrap", width: isMobile ? "65vw" : "15vw" }}>
                    {user.roles.map((role) => (
                        <Tag
                            key={role.id}
                            name={role.tag}
                            tooltip={role.name}
                            sx={{
                                fontSize: isMobile ? "4vw" : "0.6vw",
                                padding: isMobile ? "1vw 3vw" : "0.1vw 0.3vw",
                                borderRadius: isMobile ? "5vw" : "0.75vw",
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Paper>
    )
}
