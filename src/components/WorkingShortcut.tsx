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
        if (loading) return
        if (!selectedRole) {
            snackbar({ severity: "error", text: "selecione uma função" })
            return
        }
        if (!selectedProject) {
            snackbar({ severity: "error", text: "selecione um projeto" })
            return
        }
        if (!selectedCustomer) {
            snackbar({ severity: "error", text: "selecione um cliente" })
            return
        }

        if (!worker) return

        const already_working = user.working_projects.find((item) => !!item.times.length && !item.times[item.times.length - 1].ended)
        if (already_working) {
            console.log(already_working)
            confirm({
                title: `você já está trabalhando`,
                content: `deseja parar de trabalhar em ${already_working.project.name} e começar ${selectedProject.name}?`,
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
        if (!worker) return

        setLoading(true)
        io.emit("project:stop", worker.times[worker.times.length - 1], worker)
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
        console.log({ working: projects.working })
        if (projects.working) {
            setSelectedCustomer(projects.working.customer)
        }
    }, [projects.working])

    useEffect(() => {
        io.on("project:play:success", (project: Project) => {
            console.log(project)
            projects.updateProject(project)
            setSelectedProject(project)
            projects.setWorking({
                project,
                customer: customers.find((customer) => customer.id == project.customer_id)!,
                role: selectedRole || "",
                worker: project.workers.find((worker) => worker.user_id == user.id)!,
            })
        })

        io.on("project:play:error", (error) => {
            console.log(error)
            setLoading(false)
        })

        io.on("project:stop:success", (project: Project) => {
            console.log(project)
            projects.updateProject(project)
            setSelectedProject(project)
            setSelectedRole("")
            projects.setWorking(undefined)
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
    }, [selectedRole])

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
            />
            <Autocomplete
                options={project_options}
                renderInput={(params) => <TaiTextField {...params} label="projeto" InputProps={{ ...params.InputProps, sx: { bgcolor: bgcolor } }} />}
                getOptionLabel={(option) => option.name}
                ListboxProps={{ sx: { width: "100%", bgcolor: bgcolor } }}
                value={selectedProject}
                onChange={(_, value) => setSelectedProject(value)}
                isOptionEqualToValue={(option, value) => option.id == value.id}
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
