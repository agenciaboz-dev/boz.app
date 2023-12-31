import React from "react"
import { Box, Grid } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { UsersContainer } from "./UsersContainer"
import { StatusLogsContainer } from "./StatusLogsContainer"
import { TasksContainer } from "./TasksContainer"
import { ChatContainer } from "./ChatContainer"
import { ContainerSkeleton } from "./ContainerSkeleton"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ padding: "2vw", flex: 1 }}>
                <Grid container spacing={4} columns={3}>
                    <UsersContainer user={user} />
                    <TasksContainer />
                    <StatusLogsContainer user={user} />
                    <ChatContainer user={user} />
                    <ContainerSkeleton />
                </Grid>
            </Box>
        </Box>
    )
}
