import { Avatar, Box, LinearProgress } from "@mui/material"
import React from "react"
import { styled } from "@mui/material/styles"
import { useColors } from "../../../hooks/useColors"

interface TermDataProps {
    customer: Customer
}

export const TermData: React.FC<TermDataProps> = ({ customer }) => {
    const colors = useColors()

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1vw" }}>
                <Avatar variant="rounded" src={customer.image} />
                <Box sx={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: colors.primary, fontSize: "0.8vw" }}>{customer.name}</p>
                </Box>
            </Box>
        </Box>
    )
}
