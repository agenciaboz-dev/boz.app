import React from "react"
import { Box, MenuItem, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import colors from "../../style/colors"
import { Label } from "../Tools/Wakeup/Label"
import { useUser } from "../../hooks/useUser"

interface ProjectButtonProps {
    project: Project
}

export const ProjectButton: React.FC<ProjectButtonProps> = ({ project }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const currentId = useLocation().pathname.split("projects/")[1]?.split("/")[0]
    const active = Number(currentId) == project.id

    const { user } = useUser()
    const you_worker = project.workers.find((item) => item.user_id == user?.id)
    const working = you_worker ? you_worker.times.length > 0 && !you_worker.times[you_worker.times.length - 1].ended : false

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
                paddingLeft: "3vw",
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
            {/* <Box sx={{ gap: isMobile ? "5vw" : "0.5vw" }}>{you_worker && <Label label={you_worker.role} color={working ? "success" : "info"} />}</Box> */}
        </MenuItem>
    )
}
