import React from "react"
import { Box, Switch, Avatar, alpha } from "@mui/material"
import { useApi } from "../hooks/useApi"
import { Tag } from "./Tag"
import { useColors } from "../hooks/useColors"

interface CustomerContainerProps {
    customer: Customer
}

export const CustomerContainer: React.FC<CustomerContainerProps> = ({ customer }) => {
    const api = useApi()
    const colors = useColors()

    const toggleCustomerStatus = (customer: Customer) => {
        api.customer.toggleStatus({
            data: customer,
            callback: () => {},
        })
    }

    return (
        <Box
            sx={{
                background: "background.default",
                boxShadow: `0px 2px 35px ${alpha(colors.text.secondary, 0.1)}`,
                borderRadius: "0.5vw",
                padding: "1vw",
                width: "100%",
            }}
        >
            <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
                    <Avatar
                        src={
                            "data:image/png;base64,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"
                        }
                        variant="rounded"
                    />
                    <Box sx={{ flexDirection: "column", gap: "0.3vw" }}>
                        <p style={{ fontWeight: "bold", fontSize: "1.1vw" }}>{customer.name}</p>
                        <p style={{ color: colors.text.secondary, fontSize: "0.8vw" }}>{customer.recomendations}</p>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ alignItems: "center", marginLeft: "auto", gap: "0.5vw" }}>
                {customer.services.map((service) => (
                    <Tag key={service.id} name={service.tag} fontSize="0.8vw" />
                ))}
                <Switch color={"success"} checked={customer.active} onChange={() => toggleCustomerStatus(customer)} />
            </Box>
        </Box>
    )
}
