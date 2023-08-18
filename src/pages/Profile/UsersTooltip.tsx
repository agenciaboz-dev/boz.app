import React from "react"
import { Box, Tooltip } from "@mui/material"
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
            title={
                <Box sx={{ flexDirection: "column", gap: "0.3vw" }}>
                    {users.map((user) => (
                        <UserAvatar user={user} avatarSize="2vw" />
                    ))}
                </Box>
            }
        >
            {children}
        </Tooltip>
    )
}
