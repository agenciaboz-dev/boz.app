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
            <Box sx={{ padding: "2vw", gap: "2vw", flex: 1, height: 1, width: 1 }}>
                <Box sx={{ width: "80%", flex: 1, height: "80%" }}>
                    <Grid container spacing={4} columns={2} rowSpacing={"2vw"}>
                        <Grid item xs={1}>
                            <WarningContainer />
                            {/* <ContainerSkeleton /> */}
                        </Grid>
                        <Grid item xs={1}>
                            <BirthdaysContainer user={user} />
                        </Grid>
                        <Grid item xs={1.3}>
                            <WeatherContainer />
                        </Grid>
                        <Grid item xs={0.7}>
                            <StatusLogsContainer user={user} />
                        </Grid>
                    </Grid>
                </Box>

                <UsersContainer user={user} />
            </Box>
        </Box>
    )
}
