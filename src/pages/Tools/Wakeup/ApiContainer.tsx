import React from "react"
import { Box, IconButton, MenuItem, useMediaQuery } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useLocation, useNavigate } from "react-router-dom"
import { Label } from "./Label"
import colors from "../../../style/colors"

interface ApiContainerProps {
    api: Wakeup
}

export const ApiContainer: React.FC<ApiContainerProps> = ({ api }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const navigate = useNavigate()
    const currentId = useLocation().pathname.split("api/")[1]
    const active = Number(currentId) == api.id

    return (
        <MenuItem
            sx={{
                width: "100%",
                pointerEvents: active ? "none" : "",
                bgcolor: active ? colors.primaryLight : "",
                color: active ? "white" : "",
                fontWeight: active ? "bold" : "normal",
                justifyContent: "space-between",
                fontSize: active ? "1vw" : "1vw",
            }}
            onClick={() => {
                navigate("/tools/wakeup")
                setTimeout(() => navigate(`/tools/wakeup/api/${api.id}`), 10)
            }}
        >
            <p
                style={{
                    width: isMobile ? "100%" : "10vw",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                {api.name}
            </p>
            <Box sx={{ gap: isMobile ? "5vw" : "0.5vw" }}>
                {api.socket && <Label label={"io"} color="warning" />}
                <Label label={api.port} color="success" />
            </Box>
        </MenuItem>
    )
}
