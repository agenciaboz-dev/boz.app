import React from "react"
import { Box, IconButton, MenuItem } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useLocation, useNavigate } from "react-router-dom"
import { Label } from "./Label"

interface ApiContainerProps {
    api: Wakeup
}

export const ApiContainer: React.FC<ApiContainerProps> = ({ api }) => {
    const navigate = useNavigate()
    const currentId = useLocation().pathname.split("api/")[1]
    const active = Number(currentId) == api.id

    return (
        <MenuItem
            sx={{
                width: "100%",
                bgcolor: active ? "primary.main" : "",
                pointerEvents: active ? "none" : "",
                color: active ? "background.default" : "",
                justifyContent: "space-between",
            }}
            onClick={() => {
                navigate("/tools/wakeup")
                setTimeout(() => navigate(`/tools/wakeup/api/${api.id}`), 10)
            }}
        >
            <p>{api.name}</p>
            <Label label={api.port} color="success" />
        </MenuItem>
    )
}
