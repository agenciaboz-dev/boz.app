import React from "react"
import { Box, Grid, LinearProgress, Paper } from "@mui/material"
import { Title } from "../Profile/UserComponents"
import { useCustomers } from "../../hooks/useCustomers"
import { LinkContainer } from "./LinkContainer"

interface InfoPageProps {
    project: Project
}

export const InfoPage: React.FC<InfoPageProps> = ({ project }) => {
    const customer = useCustomers().customers.find((item) => item.id == project.customer_id)

    const total_time = Number(project.deadline) - Number(project.times.started)
    const elapsed_time = new Date().getTime() - Number(project.times.started)
    const progressed_value = (elapsed_time * 100) / total_time

    return (
        <Paper
            elevation={3}
            sx={{
                flexDirection: "column",
                gap: "2vw",
                padding: "2vw",
                width: "99%",
                bgcolor: "background.default",
                borderTopRightRadius: "2vw",
                color: "text.secondary",
            }}
        >
            <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                <Title name={`${customer?.name} - ${project.name}`} />
                <pre style={{ whiteSpace: "break-spaces" }}>{project.description}</pre>
            </Box>

            {project.deadline && (
                <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                    <Title name={`Prazo`} />
                    <Box sx={{ width: "100%", justifyContent: "space-between", fontSize: "0.9rem" }}>
                        <Box>{new Date(Number(project.times.started)).toLocaleDateString("pt-br")}</Box>
                        <Box>{((total_time - elapsed_time) / (1000 * 60 * 60 * 24)).toFixed(0)} dias</Box>
                        <Box>{new Date(Number(project.deadline)).toLocaleDateString("pt-br")}</Box>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={progressed_value > 100 ? 100 : progressed_value}
                        sx={{ height: "1.5vw", borderRadius: "1vw" }}
                        color={progressed_value < 60 ? "success" : progressed_value < 80 ? "warning" : "error"}
                    />
                </Box>
            )}

            <Grid container columns={3} spacing={1.5}>
                <Grid item xs={3}>
                    <Title name="Links" />
                </Grid>
                {project.links.map((link) => (
                    <Grid item xs={1} key={link.id}>
                        <LinkContainer link={link} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}
