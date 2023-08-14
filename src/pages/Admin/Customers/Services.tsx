import React from "react"
import { Box, Paper } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = ({}) => {
    const { services } = useCustomers()

    return (
        <Paper sx={{ gap: "1vw" }}>
            {services.map((service) => (
                <Box key={service.id}>{service.name}</Box>
            ))}
        </Paper>
    )
}
