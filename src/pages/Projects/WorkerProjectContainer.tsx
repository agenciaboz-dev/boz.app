import React, { useCallback, useEffect, useState } from "react"
import { Autocomplete, Box, Button, CircularProgress, Paper } from "@mui/material"
import { Avatar } from "../../components/Avatar"
import { PlayCircleRounded, StopCircle } from "@mui/icons-material"
import { useProject } from "../../hooks/useProject"
import { useUser } from "../../hooks/useUser"
import { TaiTextField } from "../../components/TaiTextField"
import { TodayTime } from "./TodayTime"
import { WorkerHeader } from "./WorkerHeader"
import { useSnackbar } from "burgos-snackbar"
import { useCustomers } from "../../hooks/useCustomers"
import { getCurrentWorkingTime } from "../Tools/project/getWorker"

interface WorkerProjectContainerProps {
    worker: ProjectWorker
    project: Project
}

export const WorkerProjectContainer: React.FC<WorkerProjectContainerProps> = ({ worker, project }) => {
    const projects = useProject()
    const { user } = useUser()
    const { customers } = useCustomers()
    if (!user) return null
    const valid_roles = user.roles
        .filter((role) => !!role.project_roles)
        .map((role) => role.project_roles!.split(", "))
        .filter((item) => !!item)
        .flatMap((item) => item)
    valid_roles.push("")

    const { snackbar } = useSnackbar()

    const working = getCurrentWorkingTime(worker)

    const [selectedRole, setSelectedRole] = useState<string | null>()
    const [loading, setLoading] = useState(false)

    const onPlay = useCallback(() => {
        if (loading) return
        if (!selectedRole) {
            snackbar({ severity: "error", text: "selecione uma função" })
            return
        }

        const customer = customers.find((customer) => customer.id == project.customer_id)
        if (!customer) return

        projects.play({ project, customer, role: selectedRole, worker }, () => setLoading(true))
    }, [user.working_projects, selectedRole])

    const onStop = () => {
        setLoading(true)
        projects.stop(worker)
    }

    useEffect(() => {
        setLoading(false)
    }, [working])

    return (
        <Paper elevation={5} sx={{ bgcolor: "background.default", padding: "1vw", color: "text.secondary", gap: "1vw", flexDirection: "column" }}>
            <WorkerHeader worker={worker} working={working} />
            <Box sx={{ alignItems: "center", gap: "1vw" }}>
                <Avatar user={worker.user} size={"4vw"} noClickModal small />
                <Box sx={{ gap: "0.5vw", flexDirection: "column", width: "20vw" }}>
                    <Box sx={{ fontSize: "1.3rem" }}>{worker.user.name.split(" ")[0]}</Box>

                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                        <Autocomplete
                            options={valid_roles}
                            getOptionDisabled={(option) => !option}
                            renderInput={(params) => <TaiTextField {...params} />}
                            onChange={(_, value) => setSelectedRole(value)}
                            value={working?.role || ""}
                            disableClearable
                            ListboxProps={{ sx: { width: "100%", bgcolor: "background.default" } }}
                            fullWidth
                            disabled={user?.id != worker.user.id || !!working}
                        />
                        <Button
                            variant="outlined"
                            sx={{ width: "fit-content", height: "3vw" }}
                            onClick={working ? onStop : onPlay}
                            disabled={user?.id != worker.user.id}
                        >
                            {loading ? <CircularProgress size="1.5rem" /> : working ? <StopCircle color="warning" /> : <PlayCircleRounded />}
                        </Button>
                    </Box>
                </Box>

                <TodayTime worker={worker} working={working} />
            </Box>
        </Paper>
    )
}
