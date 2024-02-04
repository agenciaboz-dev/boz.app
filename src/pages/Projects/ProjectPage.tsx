import React, { useEffect } from "react"
import { Box, Button, IconButton, Paper, Tooltip } from "@mui/material"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { useProject } from "../../hooks/useProject"
import { Cancel, Edit, Info } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useConfirmDialog } from "burgos-confirm"
import { WorkerProjectContainer } from "./WorkerProjectContainer"
import { ProjectInfo } from "./ProjectInfo"
import { NewProject } from "./NewProject"
import { useUser } from "../../hooks/useUser"
import { getTotalWorked } from "../Tools/project/getTotalWorked"

interface ProjectPageProps {
    user: User
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ user }) => {
    const id_query = useParams().id
    const project_id = Number(id_query)
    const projects = useProject()
    const project = projects.list.find((item) => item.id == project_id)
    if (!project) return null
    const you_worker = project.workers.find((item) => item.user_id == user.id)
    const worker_list = project.workers.filter((worker) => worker.user_id != you_worker?.user_id)

    const io = useIo()
    const navigate = useNavigate()

    const { confirm } = useConfirmDialog()
    const { isAdmin } = useUser()

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
        <Routes>
            <Route
                index
                element={
                    <Paper
                        sx={{
                            flexDirection: "column",
                            padding: "2vw",
                            color: "text.secondary",
                            width: "100%",
                            bgcolor: "background.default",
                            gap: "2vw",
                            overflowY: "auto",
                        }}
                    >
                        <Box sx={{ gap: "1vw", alignItems: "center", width: "100%" }}>
                            <Button variant="outlined" color="inherit">
                                Hoje
                            </Button>
                            <IconButton>{"<"}</IconButton>
                            {new Date().toLocaleDateString("pt-br")}
                            <IconButton>{">"}</IconButton>

                            <Tooltip
                                color="primary"
                                title={<ProjectInfo project={project} />}
                                componentsProps={{ tooltip: { sx: { bgcolor: "background.paper", padding: 0 } } }}
                            >
                                <IconButton sx={{ marginLeft: "auto" }}>
                                    <Info />
                                </IconButton>
                            </Tooltip>
                            {(project.workers.find((item) => item.user_id == user.id && item.admin) || isAdmin()) && (
                                <>
                                    <IconButton onClick={() => navigate("edit/")} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={onDeleteClick} color="primary">
                                        <Cancel />
                                    </IconButton>
                                </>
                            )}
                        </Box>

                        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                            {you_worker && <WorkerProjectContainer key={you_worker.id} worker={you_worker} project={project} />}
                            {worker_list
                                .sort((a, b) => getTotalWorked(b.times) - getTotalWorked(a.times))
                                .map((worker) => (
                                    <WorkerProjectContainer key={worker.id} worker={worker} project={project} />
                                ))}
                        </Box>
                    </Paper>
                }
            />
            <Route path="/edit" element={<NewProject user={user} current_project={project} />} />
        </Routes>
    )
}
