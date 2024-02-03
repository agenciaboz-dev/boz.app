import React, { useCallback, useEffect, useState } from "react"
import { Autocomplete, Box, Button, CircularProgress, Paper } from "@mui/material"
import { Avatar } from "../../components/Avatar"
import { PlayCircleRounded, StopCircle } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useProject } from "../../hooks/useProject"
import { useUser } from "../../hooks/useUser"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"
import { useConfirmDialog } from "burgos-confirm"
import { TaiTextField } from "../../components/TaiTextField"

interface WorkerProjectContainerProps {
    worker: ProjectWorker
    project: Project
}

export const WorkerProjectContainer: React.FC<WorkerProjectContainerProps> = ({ worker, project }) => {
    const io = useIo()
    const projects = useProject()
    const { user } = useUser()
    if (!user) return null
    const valid_roles = user.roles
        .filter((role) => !!role.project_roles)
        .map((role) => role.project_roles!.split(", "))
        .filter((item) => !!item)
        .flatMap((item) => item)

    const { confirm } = useConfirmDialog()

    const working = !!worker.times.length && !!worker.times[worker.times.length - 1].started && !worker.times[worker.times.length - 1].ended

    const [loading, setLoading] = useState(false)
    const [totalWorked, setTotalWorked] = useState(getTotalWorked(worker))
    const [formatedWorkedTime, setFormatedWorkedTime] = useState(formatTotalWorked(totalWorked))
    const [selectedRole, setSelectedRole] = useState<string | null>()

    const onPlay = useCallback(() => {
        if (loading) return
        if (!selectedRole) return

        const already_working = user.working_projects.find((item) => !!item.times.length && !item.times[item.times.length - 1].ended)
        if (already_working) {
            console.log(already_working)
            confirm({
                title: `você já está trabalhando`,
                content: `deseja parar de trabalhar em ${already_working.project.name} e começar ${project.name}?`,
                onConfirm: () => {
                    setLoading(true)
                    io.emit("project:stop", already_working.times[already_working.times.length - 1], already_working)
                    const data: PlayProjectForm = { worker_id: worker.id, role: selectedRole }
                    io.emit("project:play", data)
                },
            })
        } else {
            setLoading(true)
            const data: PlayProjectForm = { worker_id: worker.id, role: selectedRole }
            io.emit("project:play", data)
        }
    }, [user.working_projects, selectedRole])

    const onStop = () => {
        if (loading) return

        setLoading(true)
        io.emit("project:stop", worker.times[worker.times.length - 1], worker)
    }

    useEffect(() => {
        setFormatedWorkedTime(formatTotalWorked(totalWorked))
    }, [totalWorked])

    useEffect(() => {
        if (working) {
            const interval = setInterval(() => {
                setTotalWorked((total) => total + 1000)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [working])

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
            setTotalWorked(getTotalWorked(project.workers.find((item) => item.id == worker.id)!))
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
        <Paper elevation={5} sx={{ bgcolor: "background.default", padding: "1vw", color: "text.secondary", gap: "1vw", alignItems: "center" }}>
            <Avatar user={worker.user} size={"5vw"} noClickModal small />
            <Box sx={{ gap: "0.5vw", flexDirection: "column", width: "20vw" }}>
                <Box sx={{ gap: "1vw" }}>
                    <Box>{worker.user.name.split(" ")[0]}</Box>
                </Box>

                <Box sx={{ alignItems: "center", gap: "1vw" }}>
                    <Autocomplete
                        options={valid_roles}
                        renderInput={(params) => <TaiTextField {...params} />}
                        onChange={(_, value) => setSelectedRole(value)}
                        disableClearable
                        ListboxProps={{ sx: { width: "100%" } }}
                        fullWidth
                    />
                    <Button
                        variant="outlined"
                        sx={{ width: "fit-content" }}
                        onClick={working ? onStop : onPlay}
                        disabled={user?.id != worker.user.id}
                    >
                        {loading ? <CircularProgress size="1.5rem" /> : working ? <StopCircle color="warning" /> : <PlayCircleRounded />}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flexDirection: "column" }}>
                <Box>tempo do dia</Box>
                <Box>{formatedWorkedTime}</Box>
            </Box>
        </Paper>
    )
}
