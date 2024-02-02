import React, { useEffect, useState } from "react"
import { Autocomplete, Box, Button, CircularProgress, Grid, IconButton, MenuItem, Paper, Tooltip } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useProject } from "../../hooks/useProject"
import { Title } from "../Profile/UserComponents"
import { TaiTextField } from "../../components/TaiTextField"
import MaskedInputCerto from "../../components/MaskedInputCerto"
import { useNumberMask } from "burgos-masks"
import { WorkerContainer } from "./WorkerContainer"
import { useUser } from "../../hooks/useUser"
import { Avatar } from "../../components/Avatar"
import useMeasure from "react-use-measure"
import { Cancel } from "@mui/icons-material"

interface NewProjectProps {
    user: User
    current_project?: Project
}

export const NewProject: React.FC<NewProjectProps> = ({ user, current_project }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const projects = useProject()
    const number_mask = useNumberMask({ allowDecimal: false })
    const users = useUser()
    const [ref, { width }] = useMeasure()

    const [loading, setLoading] = useState(false)
    const [weeks, setWeeks] = useState("")
    const [addingUser, setAddingUser] = useState("")
    const [showUsers, setShowUsers] = useState(false)

    const initialValues: NewProjectForm = current_project
        ? { ...current_project, deadline: new Date(Number(current_project.deadline)).toLocaleDateString("pt-br") }
        : {
              name: "",
              description: "",
              deadline: "",
              github: "",
              workers: [{ user_id: user.id, admin: true, role: "" }],
          }

    const formik = useFormik<NewProjectForm>({
        initialValues,
        onSubmit: (values) => {
            if (loading) return
            setLoading(true)

            if (values.deadline) {
                const [_day, _month, _year] = values.deadline.split("/")
                const day = Number(_day)
                const month = Number(_month)
                const year = Number(_year)
                const deadline = new Date(year, month - 1, day).getTime().toString()
                values.deadline = deadline
            }

            if (current_project) {
                const data: UpdateProjectForm = {
                    ...values,
                    workers: [
                        ...values.workers
                            .filter((item) => current_project.workers.find((worker) => worker.user_id == item.user_id))
                            .map((item) => {
                                const worker = current_project.workers.find((worker) => worker.user_id == item.user_id)!
                                return { ...worker, ...item }
                            }),
                        ...values.workers
                            .filter((worker) => !current_project.workers.find((item) => item.user_id == worker.user_id))
                            .map((item) => ({ ...item, id: 0, joined_date: new Date().getTime().toString(), times: [], user, admin: !!item.admin })),
                    ],
                }

                io.emit("project:update", data, current_project.id)
            } else {
                io.emit("project:new", values)
            }
        },
        enableReinitialize: true,
    })

    const onWeekManualChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWeeks(event.target.value)
        const weeks = Number(event.target.value)
        if (weeks) {
            const today = new Date()
            const deadline = new Date(today.getTime() + weeks * 7 * 24 * 60 * 60 * 1000)
            formik.setFieldValue("deadline", deadline.toLocaleDateString("pt-br"))
        } else {
            formik.setFieldValue("deadline", "")
        }
    }

    const onDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const deadline_string = event.target.value
        formik.handleChange(event)

        if (deadline_string.length == 10) {
            const [_day, _month, _year] = deadline_string.split("/")
            const day = Number(_day)
            const month = Number(_month)
            const year = Number(_year)

            try {
                const deadline = new Date(year, month - 1, day)
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                const weeks = ((deadline.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000)).toFixed(0)
                console.log(weeks)
                setWeeks(weeks)
            } catch (error) {
                setWeeks("")
            }
        } else {
            setWeeks("")
        }
    }

    const addWorker = (user: User) => {
        const worker: NewWorkerForm = {
            user_id: user.id,
            role: "",
            admin: false,
        }
        formik.setFieldValue("workers", [...formik.values.workers, worker])
        setShowUsers(false)
    }

    useEffect(() => {
        io.on("project:new:success", (project: Project) => {
            projects.updateProject(project)
            navigate(`/projects/${project.id}`)
            setLoading(false)
        })

        io.on("project:new:error", (error) => {
            snackbar({ severity: "error", text: error })
            setLoading(false)
        })

        return () => {
            io.off("project:new:success")
            io.off("project:new:error")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "99%", gap: "2vw", padding: "2vw" }}>
            <form onSubmit={formik.handleSubmit}>
                <Title name={current_project ? "editar projeto" : "novo projeto"} />
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TaiTextField
                            label="Nome"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            required
                            //autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TaiTextField
                            label="github"
                            name="github"
                            value={formik.values.github}
                            onChange={formik.handleChange}
                            placeholder="https://github.com/agenciaboz-dev/PROJETO"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TaiTextField
                            label="Descrição"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder=""
                            multiline
                            minRows={5}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TaiTextField
                            label="prazo (semanas)"
                            value={weeks}
                            onChange={onWeekManualChange}
                            placeholder="40"
                            InputProps={{ inputComponent: MaskedInputCerto, inputProps: { inputMode: "numeric", mask: number_mask } }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TaiTextField
                            label="data do prazo"
                            name="deadline"
                            value={formik.values.deadline}
                            onChange={onDeadlineChange}
                            placeholder=""
                            InputProps={{
                                inputComponent: MaskedInputCerto,
                                inputProps: { inputMode: "numeric", mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] },
                            }}
                        />
                    </Grid>
                </Grid>
                <Paper
                    elevation={3}
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        gap: "1vw",
                        bgcolor: "background.default",
                        overflowY: "auto",
                        padding: "1vw",
                        borderRadius: "0 2vw 0 2vw ",
                        color: "text.secondary",
                        height: "30%",
                    }}
                >
                    <Grid container columns={2} spacing={1.5}>
                        {formik.values.workers.map((worker, index) => (
                            <WorkerContainer key={worker.user_id} worker={worker} self={user.id == worker.user_id} formik={formik} index={index} />
                        ))}
                        <Grid item xs={1}>
                            <Tooltip
                                placement="top-start"
                                open={showUsers}
                                enterDelay={0}
                                componentsProps={{ tooltip: { sx: { bgcolor: "background.default", padding: 0 } } }}
                                title={
                                    <Paper
                                        sx={{
                                            flexDirection: "column",
                                            gap: "0.3vw",
                                            bgcolor: "background.default",
                                            padding: "0.5vw",
                                            color: "text.secondary",
                                            maxHeight: "40vh",
                                            overflowY: "auto",
                                            width: width,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                justifyContent: "space-between",
                                                fontSize: "1rem",
                                                alignItems: "center",
                                                paddingLeft: "1vw",
                                                fontWeight: "bold",
                                                color: "primary.main",
                                            }}
                                        >
                                            <Box>{"escolha o usuário"}</Box>
                                            <IconButton onClick={() => setShowUsers(false)}>
                                                <Cancel />
                                            </IconButton>
                                        </Box>
                                        {users.list
                                            .filter((item) => !formik.values.workers.find((worker) => worker.user_id == item.id))
                                            .filter((user) => user.name.includes(addingUser))
                                            .map((user) => (
                                                <MenuItem sx={{ alignItems: "center", gap: "0.5vw" }} key={user.id} onClick={() => addWorker(user)}>
                                                    <Avatar user={user} size="2vw" noClickModal small />
                                                    <Box>{user.name.split(" ")[0]}</Box>
                                                </MenuItem>
                                            ))}
                                    </Paper>
                                }
                            >
                                <TaiTextField
                                    value={addingUser}
                                    onChange={(event) => setAddingUser(event.target.value)}
                                    InputProps={{ ref }}
                                    onFocus={() => setShowUsers(true)}
                                    label="adicionar usuário ao projeto"
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{ alignSelf: "end", gap: "1vw" }}>
                    <Button variant="outlined" onClick={() => navigate(current_project ? `/projects/${current_project.id}` : "/projects")}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
