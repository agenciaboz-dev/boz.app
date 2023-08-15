import React from "react"
import { Box, IconButton, Paper } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { Tag } from "../../../components/Tag"
import AddIcon from "@mui/icons-material/Add"

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = ({}) => {
    const { services, serviceModal } = useCustomers()

    return (
        <Paper elevation={0} sx={{ gap: "1vw", bgcolor: "background.default", flexDirection: "column", padding: "0vw 4vw" }}>
            <p style={{ fontWeight: "bold", fontSize: "1.2vw" }}>Serviços</p>
            <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                {services.map((service) => (
                    <Tag key={service.id} name={service.tag} fontSize="0.8vw" />
                ))}
                <IconButton color="primary" sx={{ width: "2vw", height: "2vw" }} onClick={() => serviceModal.open()}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}
