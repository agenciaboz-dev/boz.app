import React, { useEffect } from "react"
import { Box, Button, IconButton, Paper } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useProject } from "../../hooks/useProject"
import { Cancel } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useConfirmDialog } from "burgos-confirm"
import { WorkerProjectContainer } from "./WorkerProjectContainer"

interface ProjectPageProps {
    user: User
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ user }) => {
    const id_query = useParams().id
    const project_id = Number(id_query)
    const projects = useProject()
    const project = projects.list.find((item) => item.id == project_id)
    if (!project) return null

    const io = useIo()
    const navigate = useNavigate()

    const { confirm } = useConfirmDialog()

    const onDeleteClick = () => {
        confirm({
            content: "certeza?",
            title: "certeza?",
            onConfirm: () => {
                io.emit("project:delete", project_id)
            },
        })
    }

    useEffect(() => {
        io.on("project:delete:success", (item) => {
            projects.deleteProject(item)
            navigate("/projects")
        })

        return () => {
            io.off("project:delete:success")
        }
    }, [])

    return (
        <Paper sx={{ flexDirection: "column", padding: "2vw", color: "text.secondary", width: "100%", bgcolor: "background.default", gap: "2vw" }}>
            <Box sx={{ gap: "1vw", alignItems: "center", width: "100%" }}>
                <Button variant="outlined" color="inherit">
                    Hoje
                </Button>
                <IconButton>{"<"}</IconButton>
                {new Date().toLocaleDateString("pt-br")}
                <IconButton>{">"}</IconButton>
                <IconButton sx={{ marginLeft: "auto" }} onClick={onDeleteClick}>
                    <Cancel />
                </IconButton>
            </Box>

            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                {project.workers
                    .filter((item) => item.admin)
                    .map((worker) => (
                        <WorkerProjectContainer key={worker.id} worker={worker} />
                    ))}
                {project.workers
                    .filter((item) => !item.admin)
                    .map((worker) => (
                        <WorkerProjectContainer key={worker.id} worker={worker} />
                    ))}
            </Box>
        </Paper>
    )
}
