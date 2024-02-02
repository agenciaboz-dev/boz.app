import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Paper } from "@mui/material"
import { Avatar } from "../../components/Avatar"
import { PlayCircleRounded, StopCircle } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useProject } from "../../hooks/useProject"
import { useUser } from "../../hooks/useUser"

interface WorkerProjectContainerProps {
    worker: ProjectWorker
}

export const WorkerProjectContainer: React.FC<WorkerProjectContainerProps> = ({ worker }) => {
    const io = useIo()
    const projects = useProject()
    const { user } = useUser()

    const working = !!worker.times.length && !!worker.times[worker.times.length - 1].started && !worker.times[worker.times.length - 1].ended

    const [loading, setLoading] = useState(false)

    const onPlay = () => {
        if (loading) return

        setLoading(true)
        io.emit("project:play", worker.id)
    }

    const onStop = () => {
        if (loading) return

        setLoading(true)
        io.emit("project:stop", worker.times[worker.times.length - 1], worker)
    }

    useEffect(() => {
        io.on("project:play:success", (project: Project) => {
            console.log(project)
            projects.updateProject(project)
            setLoading(false)
        })

        io.on("project:play:error", (error) => {
            console.log(error)
            setLoading(false)
        })

        io.on("project:stop:success", (project: Project) => {
            console.log(project)
            projects.updateProject(project)
            setLoading(false)
        })

        io.on("project:stop:error", (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            io.off("project:play:success")
            io.off("project:play:error")
            io.off("project:stop:success")
            io.off("project:stop:error")
        }
    }, [])

    return (
        <Paper elevation={5} sx={{ bgcolor: "background.default", padding: "1vw", color: "text.secondary" }}>
            <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                <Avatar user={worker.user} size={"4vw"} noClickModal small />
                <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                    <Box>{worker.user.name.split(" ")[0]}</Box>
                    <Button
                        variant="outlined"
                        sx={{ width: "fit-content" }}
                        onClick={working ? onStop : onPlay}
                        disabled={user?.id != worker.user.id}
                    >
                        {loading ? <CircularProgress size="1.5rem" /> : working ? <StopCircle color="warning" /> : <PlayCircleRounded />}
                    </Button>
                </Box>

                <Box sx={{ flexDirection: "column" }}>
                    <Box>tempo do dia</Box>
                    <Box>
                        {worker.times.reduce((total, current) => {
                            console.log(total)
                            console.log(current)

                            return (Number(current.worked) || new Date().getTime() - Number(current.started)) + total
                        }, 0)}
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}
