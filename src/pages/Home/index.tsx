import React from "react"
import { Box, Grid } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { UsersContainer } from "./UsersContainer"
import { StatusLogsContainer } from "./StatusLogsContainer"
import { WeatherContainer } from "./WeatherContainer"
import { BirthdaysContainer } from "./BirthdaysContainer"
import { ContainerSkeleton } from "./ContainerSkeleton"
import { WarningContainer } from "./WarningContainer"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ padding: "2vw", gap: "2vw", height: 0.9, width: 1 }}>
                <Box sx={{ width: "81%", height: "100%" }}>
                    <Grid container columns={2} rowSpacing={1} columnSpacing={3}>
                        <Grid item xs={1}>
                            <WarningContainer customer />
                        </Grid>
                        <Grid item xs={1}>
                            <WarningContainer />
                        </Grid>
                        <Grid item xs={1}>
                            <WeatherContainer />
                        </Grid>
                        <Grid item xs={1}>
                            <BirthdaysContainer user={user} />
                            {/* <StatusLogsContainer user={user} /> */}
                        </Grid>
                    </Grid>
                </Box>

                <UsersContainer user={user} />
            </Box>
        </Box>
    )
}
