import React from "react"
import { Box, IconButton, MenuItem, useMediaQuery } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useLocation, useNavigate } from "react-router-dom"
import { Label } from "./Label"
import colors from "../../../style/colors"
import { useWakeup } from "../../../hooks/useWakeup"

interface ApiContainerProps {
    api: Wakeup
}

export const ApiContainer: React.FC<ApiContainerProps> = ({ api }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const currentId = useLocation().pathname.split("api/")[1]?.split("/")[0]
    const active = Number(currentId) == api.id
    const { socket } = useWakeup()

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
                navigate(`/tools/wakeup/api/${api.id}`)
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
                {api.socket && <Label label={"io"} color={socket.connected == api.id ? "success" : "warning"} />}
                <Label label={api.port} color="success" />
            </Box>
        </MenuItem>
    )
}
