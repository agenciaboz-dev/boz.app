import React from "react"
import { Box, MenuItem, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import colors from "../../style/colors"

interface ProjectButtonProps {
    project: Project
}

export const ProjectButton: React.FC<ProjectButtonProps> = ({ project }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const currentId = useLocation().pathname.split("projects/")[1]?.split("/")[0]
    const active = Number(currentId) == project.id

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
                navigate(`/projects/${project.id}`)
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
                {project.name}
            </p>
            <Box sx={{ gap: isMobile ? "5vw" : "0.5vw" }}>
                {/* {api.socket && <Label label={"io"} color={socket.connected == api.id ? "success" : "warning"} />}
                <Label label={api.port} color="success" /> */}
            </Box>
        </MenuItem>
    )
}
