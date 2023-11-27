import React from "react"
import { Box, Grid, Paper } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"
import { useUser } from "../../hooks/useUser"
import { UserAvatar } from "../Admin/Stats/StatusLogs"
import { ContainerSkeleton } from "./ContainerSkeleton"

interface UsersContainerProps {
    user: User
}

export const UsersContainer: React.FC<UsersContainerProps> = ({ user }) => {
    const { connectedList } = useUser()

    // const connectedList = list.filter((item) => item.status == 1)

    return !!connectedList.length ? (
        <ContainerWrapper>
            <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Coleguinhas ({connectedList.length})</Box>
            <Box sx={{ flexDirection: "column" }}>
                {connectedList.map((user) => (
                    <UserAvatar user={user} key={user.id} />
                ))}
            </Box>
        </ContainerWrapper>
    ) : (
        <ContainerSkeleton />
    )
}
