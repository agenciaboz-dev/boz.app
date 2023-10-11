import React from "react"
import { Box, Paper, Tooltip } from "@mui/material"
import { UserAvatar } from "../Admin/Stats/StatusLogs"

interface UsersToolipProps {
    users: User[]
    children: React.ReactElement
}

export const UsersToolip: React.FC<UsersToolipProps> = ({ children, users }) => {
    return (
        <Tooltip
            placement="bottom-start"
            enterDelay={0}
            componentsProps={{ tooltip: { sx: { bgcolor: "background.default", padding: 0 } } }}
            title={
                <Paper
                    sx={{
                        flexDirection: "column",
                        gap: "0.3vw",
                        bgcolor: "background.default",
                        padding: "0.5vw",
                        color: "text.secondary",
                        maxHeight: "50vh",
                        overflowY: "auto",
                    }}
                >
                    {users.map((user) => (
                        <UserAvatar user={user} avatarSize="2vw" />
                    ))}
                </Paper>
            }
        >
            {children}
        </Tooltip>
    )
}
