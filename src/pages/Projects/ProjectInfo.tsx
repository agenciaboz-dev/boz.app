import React from "react"
import { Box } from "@mui/material"
import { Warning } from "@mui/icons-material"

interface ProjectInfoProps {
    project: Project
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
    return (
        <Box sx={{ flexDirection: "column", fontSize: "1rem", padding: "1vw", gap: "1vw" }}>
            <Box sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>{project.name}</Box>
            <pre style={{ whiteSpace: "break-spaces" }}>{project.description}</pre>
            <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Warning color="warning" />
                {new Date(Number(project.deadline)).toLocaleDateString("pt-br")}
                <Warning color="warning" />
            </Box>
        </Box>
    )
}
