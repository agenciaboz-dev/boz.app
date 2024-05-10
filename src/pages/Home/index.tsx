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
            <Box sx={{ padding: "2vw", gap: "2vw", flex: 1, height: 1, width: 1 }}>
                <Box sx={{ width: "80%", flex: 1, height: "80%" }}>
                    <Grid container spacing={4} columns={2} rowSpacing={"2vw"}>
                        <WeatherContainer />
                        <BirthdaysContainer user={user} />
                        <ContainerSkeleton />
                        <StatusLogsContainer user={user} />
                    </Grid>
                </Box>

                <UsersContainer user={user} />
            </Box>
        </Box>
    )
}
