import React from "react"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface WildCardProps {}

export const WildCard: React.FC<WildCardProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                backgroundColor: "background.paper",
                color: "secondary.main",
                padding: "5vw",
                alignItems: "center",
                gap: "2vw",
            }}
        >
            <p style={{ fontSize: "20vw", fontWeight: "bold" }}>404</p>
            <p style={{ fontSize: "2vw", fontWeight: "bold" }}>caminho não encontrado</p>

            <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate("/")}
                sx={{ color: "primary.main", fontWeight: "bold", fontSize: "2vw", width: "20vw" }}
            >
                início
            </Button>
        </Box>
    )
}
