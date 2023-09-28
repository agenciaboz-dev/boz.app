import React from "react"
import { Box, IconButton, Paper, useMediaQuery } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { Tag } from "../../../components/Tag"
import AddIcon from "@mui/icons-material/Add"

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const { services, serviceModal } = useCustomers()

    return (
        <Paper sx={{ gap: isMobile ? "5vw" : "1vw", bgcolor: "background.default", flexDirection: "column", padding: isMobile? "5vw" : "1vw" }}>
            <p style={{ fontWeight: "bold", fontSize: isMobile ? "6vw" : "1vw", textAlign: isMobile? "center" : "start" }}>Serviços</p>
            <Box sx={{ gap: isMobile? "2vw" : "0.5vw", alignItems: "center", flexWrap: "wrap", lineHeight: isMobile ? "4vw" : "" }}>
                {services
                    .sort((a, b) => a.id - b.id)
                    .map((service) => (
                        <Tag key={service.id} name={service.tag} tooltip={service.name} fontSize={isMobile? "4vw" : "0.8vw"} onClick={() => serviceModal.open(service)}
                        sx={{
                            padding: isMobile ? "2vw" : "0.5vw"
                        }}/>
                    ))}
                <IconButton color="primary" sx={{ width: "2vw", height: "2vw" }} onClick={() => serviceModal.open()}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}
