import React from "react"
import { Avatar, Box, Paper, Switch, alpha, useMediaQuery } from "@mui/material"
import { Tag } from "./Tag"
import { useColors } from "../hooks/useColors"
import { useMuiTheme } from "../hooks/useMuiTheme"
import { useUser } from "../hooks/useUser"
import { useIo } from "../hooks/useIo"
import { useNavigate } from "react-router-dom"
import { useImageUrl } from "../hooks/useImageUrl"
import { CustomerAvatar } from "./CustomerAvatar"

interface CustomerContainerProps {
    customer: Customer
}

export const CustomerContainer: React.FC<CustomerContainerProps> = ({ customer }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const io = useIo()
    const theme = useMuiTheme()
    const navigate = useNavigate()

    const { isAdmin } = useUser()
    const { getCustomerPic } = useImageUrl()

    const toggleCustomerStatus = (customer: Customer) => {
        io.emit("customer:update", { ...customer, active: !customer.active })
    }

    return (
        <Paper
            elevation={3}
            sx={{
                borderBottom: "2px solid",
                borderRadius: isMobile ? "3vw" : "0 3vw",
                padding: isMobile ? "0 0 5vw 0" : "2vw",
                // width: isMobile ? "80vw" : "30vw",
                // bgcolor: customer.active ? "background.default" : alpha(theme.palette.error.main, 0.25),
                color: customer.active ? "primary.main" : "error.main",
                position: "relative",
                bgcolor: "background.default",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                height: "18vw",
            }}
        >
            <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1.5vw" }}>
                <Box sx={{ gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                    <CustomerAvatar customer={customer} sx={{ width: isMobile ? "15vw" : "5vw", height: isMobile ? "15vw" : "5vw" }} />
                    <Box
                        sx={{
                            fontWeight: "bold",
                            fontSize: isMobile ? "5vw" : "1vw",
                            width: "16vw",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={() => {
                            navigate(`/customers/${customer.id}`)
                        }}
                    >
                        {customer.name}
                    </Box>
                    <Switch
                        color={"success"}
                        checked={customer.active}
                        onChange={() => toggleCustomerStatus(customer)}
                        sx={{ pointerEvents: isAdmin() ? "" : "none" }}
                    />
                </Box>
                <Box
                    sx={{
                        gap: isMobile ? "2vw" : "0.5vw",
                        width: isMobile ? "80vw" : "26vw",
                        flexWrap: "wrap",
                        height: isMobile ? "auto" : "4vw",
                    }}
                >
                    {customer.services.map((service) => (
                        <Tag
                            key={service.id}
                            name={service.tag}
                            tooltip={service.name}
                            sx={{
                                fontSize: isMobile ? "4vw" : "0.7vw",
                                padding: isMobile ? "3vw" : "0.5vw",
                                height: isMobile ? "2vw" : "1.5vw",
                            }}
                            color={customer.active ? "" : theme.palette.error.main}
                        />
                    ))}
                </Box>
                <Box
                    sx={{
                        height: isMobile ? "auto" : "5vw",
                        color: "text.secondary",
                        fontSize: isMobile ? "4vw" : "0.75vw",
                        width: isMobile ? "80vw" : "28vw",
                        textAlign: "justify",
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    title={customer.recomendations}
                >
                    {customer.recomendations}
                </Box>
            </Box>
        </Paper>
    )
}
