import React, { useCallback, useEffect, useState } from "react"
import { Autocomplete, Box, CircularProgress, IconButton, MenuItem } from "@mui/material"
import { useCustomers } from "../hooks/useCustomers"
import { TaiTextField } from "./TaiTextField"
import { useDarkMode } from "../hooks/useDarkMode"
import { PlayCircle, StopCircle } from "@mui/icons-material"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import { useIo } from "../hooks/useIo"
import { useProject } from "../hooks/useProject"

interface WorkingShortcutProps {
    user: User
}

export const WorkingShortcut: React.FC<WorkingShortcutProps> = ({ user }) => {
    const io = useIo()
    const projects = useProject()

    const { customers } = useCustomers()
    const { darkMode } = useDarkMode()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(projects.working?.customer || null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(projects.working?.project || null)
    const [selectedRole, setSelectedRole] = useState(projects.working?.role || "")
    // const [working, setWorking] = useState(selectedProject ? getYouWorking(selectedProject, user) : false)
    const worker = selectedProject?.workers.find((worker) => worker.user_id == user.id)
    const working = !!projects.working

    const bgcolor = darkMode ? "" : "background.default"

    const customer_options = [
        ...new Map(
            user.working_projects.map((worker) => customers.find((customer) => customer.id == worker.project.customer_id)).map((v) => [v?.id, v])
        ).values(),
    ].filter((value) => !!value) as Customer[]

    const project_options = selectedCustomer?.projects.filter((project) => project.workers.find((worker) => worker.user_id == user.id)) || []

    const [loading, setLoading] = useState(false)

    const onPlay = useCallback(() => {
        if (loading || !selectedRole || !selectedCustomer || !selectedProject || !worker) return

        projects.play({ project: selectedProject, customer: selectedCustomer, role: selectedRole, worker }, () => setLoading(true))
    }, [selectedRole, selectedProject, selectedCustomer, worker])

    const onStop = () => {
        if (!worker) return
        setLoading(true)
        projects.stop(worker)
    }

    useEffect(() => {
        setLoading(false)
    }, [working])

    useEffect(() => {
        if (projects.working) {
            setSelectedProject(projects.working.project)
            setSelectedRole(projects.working.role)
        } else {
            setSelectedProject(null)
        }
    }, [selectedCustomer])

    useEffect(() => {
        if (projects.working) {
            setSelectedCustomer(projects.working.customer)
        }
    }, [projects.working])

    return (
        <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw" }}>
            <Autocomplete
                options={customer_options}
                renderInput={(params) => <TaiTextField {...params} label="cliente" InputProps={{ ...params.InputProps, sx: { bgcolor: bgcolor } }} />}
                getOptionLabel={(option) => option.name}
                ListboxProps={{ sx: { width: "100%", bgcolor: bgcolor } }}
                value={selectedCustomer}
                onChange={(_, value) => setSelectedCustomer(value)}
                isOptionEqualToValue={(option, value) => option?.id == value?.id}
                disabled={working}
            />
            <Autocomplete
                options={project_options}
                renderInput={(params) => <TaiTextField {...params} label="projeto" InputProps={{ ...params.InputProps, sx: { bgcolor: bgcolor } }} />}
                getOptionLabel={(option) => option.name}
                ListboxProps={{ sx: { width: "100%", bgcolor: bgcolor } }}
                value={selectedProject}
                onChange={(_, value) => setSelectedProject(value)}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                disabled={working}
            />
            <TaiTextField
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                select
                SelectProps={{ MenuProps: { MenuListProps: { sx: { bgcolor: "background.default", height: "max-content" } } } }}
                label="função"
                disabled={working}
                InputProps={{
                    sx: { bgcolor: bgcolor },
                    startAdornment: working ? (
                        <IconButton color="warning" onClick={onStop}>
                            {loading ? <CircularProgress size="1.5rem" /> : <StopCircle />}
                        </IconButton>
                    ) : (
                        <IconButton color={"success"} disabled={!selectedCustomer || !selectedProject || !selectedRole} onClick={onPlay}>
                            {loading ? <CircularProgress size="1.5rem" /> : <PlayCircle />}
                        </IconButton>
                    ),
                }}
            >
                {user.roles.map((role) =>
                    role.project_roles?.split(", ").map((project_role) => (
                        <MenuItem key={`${role.id}.${project_role}`} value={project_role}>
                            {project_role}
                        </MenuItem>
                    ))
                )}
                <MenuItem value="" sx={{ display: "none" }}></MenuItem>
            </TaiTextField>
        </Box>
    )
}
