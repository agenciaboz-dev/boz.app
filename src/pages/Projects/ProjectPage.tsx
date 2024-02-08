import React, { useEffect, useState } from "react"
import { Box, Button, IconButton, LinearProgress, Paper, Tooltip } from "@mui/material"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { useProject } from "../../hooks/useProject"
import { Cancel, Edit, Info } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useConfirmDialog } from "burgos-confirm"
import { WorkerProjectContainer } from "./WorkerProjectContainer"
import { NewProject } from "./NewProject"
import { useUser } from "../../hooks/useUser"
import { getTotalWorked } from "../Tools/project/getTotalWorked"
import { getTodayTimes } from "../Tools/project/getTodayTimes"
import { InfoPage } from "./InfoPage"
import { Title } from "../Profile/UserComponents"

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

    const total_time = Number(project.deadline) - Number(project.times.started)
    const elapsed_time = new Date().getTime() - Number(project.times.started)
    const progressed_value = (elapsed_time * 100) / total_time

    const io = useIo()
    const navigate = useNavigate()

    const { confirm } = useConfirmDialog()
    const { isAdmin } = useUser()

    const [info, setInfo] = useState(false)

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

                            // hiding scrollbar
                            "&::-webkit-scrollbar": {
                                width: 0,
                                height: 0,
                            },
                        }}
                    >
                        <Box sx={{ gap: "1vw", alignItems: "center", width: "100%" }}>
                            <Button variant="outlined" color="inherit">
                                Hoje
                            </Button>
                            <IconButton>{"<"}</IconButton>
                            {new Date().toLocaleDateString("pt-br")}
                            <IconButton>{">"}</IconButton>

                            <IconButton sx={{ marginLeft: "auto" }} color="primary" onClick={() => setInfo((info) => !info)}>
                                <Info />
                            </IconButton>
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

                        {info ? (
                            <InfoPage project={project} />
                        ) : (
                            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                                {project.deadline && (
                                    <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                                        <Box sx={{ width: "100%", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                            <Box>{new Date(Number(project.times.started)).toLocaleDateString("pt-br")}</Box>
                                            <Box>{((total_time - elapsed_time) / (1000 * 60 * 60 * 24)).toFixed(0)} dias</Box>
                                            <Box>{new Date(Number(project.deadline)).toLocaleDateString("pt-br")}</Box>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progressed_value > 100 ? 100 : progressed_value}
                                            sx={{ height: "1.5vw", borderRadius: "1vw" }}
                                            color={progressed_value < 60 ? "success" : progressed_value < 80 ? "warning" : "error"}
                                        />
                                    </Box>
                                )}
                                {you_worker && <WorkerProjectContainer key={you_worker.id} worker={you_worker} project={project} />}
                                {worker_list
                                    .sort((a, b) => getTotalWorked(getTodayTimes(b.times)) - getTotalWorked(getTodayTimes(a.times)))
                                    .map((worker) => (
                                        <WorkerProjectContainer key={worker.id} worker={worker} project={project} />
                                    ))}
                            </Box>
                        )}
                    </Paper>
                }
            />
            <Route path="/edit" element={<NewProject user={user} current_project={project} />} />
        </Routes>
    )
}
