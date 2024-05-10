import React from "react"
import { Box, Grid } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { UsersContainer } from "./UsersContainer"
import { StatusLogsContainer } from "./StatusLogsContainer"
import { WeatherContainer } from "./WeatherContainer"
import { BirthdaysContainer } from "./BirthdaysContainer"
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
                    <WeatherContainer />
                    <UsersContainer user={user} />
                    <StatusLogsContainer user={user} />
                    <BirthdaysContainer user={user} />
                    <ContainerSkeleton />
                </Grid>
            </Box>
        </Box>
    )
}
