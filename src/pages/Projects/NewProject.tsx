import React, { useCallback, useEffect, useState } from "react"
import { Autocomplete, Box, Button, CircularProgress, Grid, Paper } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useProject } from "../../hooks/useProject"
import { Title } from "../Profile/UserComponents"
import { TaiTextField } from "../../components/TaiTextField"
import MaskedInputCerto from "../../components/MaskedInputCerto"
import { useNumberMask } from "burgos-masks"
import { useCustomers } from "../../hooks/useCustomers"
import { EditWorkersContainer } from "./EditWorkersContainer"
import { EditLink } from "./EditLinkContainer"

interface NewProjectProps {
    user: User
    current_project?: Project
}

export const NewProject: React.FC<NewProjectProps> = ({ user, current_project }) => {
    const io = useIo()
    const navigate = useNavigate()
    const projects = useProject()
    const number_mask = useNumberMask({ allowDecimal: false })

    const { snackbar } = useSnackbar()
    const { customers } = useCustomers()

    const [loading, setLoading] = useState(false)
    const [weeks, setWeeks] = useState("")

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const initialValues: NewProjectForm = current_project
        ? { ...current_project, deadline: current_project.deadline ? new Date(Number(current_project.deadline)).toLocaleDateString("pt-br") : "" }
        : {
              name: "",
              description: "",
              deadline: "",
              workers: [{ user_id: user.id, admin: true }],
              customer_id: 0,
              links: [{ name: "", url: "" }],
          }

    const formik = useFormik<NewProjectForm>({
        initialValues,
        onSubmit: (values) => {
            if (loading) return
            if (!selectedCustomer) return
            setLoading(true)

            if (values.deadline) {
                const [_day, _month, _year] = values.deadline.split("/")
                const day = Number(_day)
                const month = Number(_month)
                const year = Number(_year)
                const deadline = new Date(year, month - 1, day).getTime().toString()
                values.deadline = deadline
            }

            if (!values.links[values.links.length - 1].url) {
                values.links = []
            }

            values.customer_id = selectedCustomer.id

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
                console.log(values)
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
        <Paper sx={{ flexDirection: "column", gap: "2vw", padding: "2vw", width: "99%", bgcolor: "background.default", borderTopRightRadius: "2vw" }}>
            <Title name={current_project ? "editar projeto" : "novo projeto"} />
            <Box sx={{ width: "100%", gap: "1vw", height: "90%" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ flexDirection: "column", width: "70%", gap: "2vw" }}>
                        <Grid container spacing={1.5}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={customers}
                                    value={selectedCustomer}
                                    onChange={(_, value) => setSelectedCustomer(value)}
                                    renderInput={(params) => <TaiTextField {...params} label="Cliente" required />}
                                    getOptionLabel={(customer) => `${customer.name}`}
                                    ListboxProps={{ sx: { width: "100%" } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TaiTextField
                                    label="Nome do projeto"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    required
                                    autoComplete="off"
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
                            {formik.values.links.map((link, index) => (
                                <EditLink key={index} formik={formik} index={index} link={link} />
                            ))}
                        </Grid>
                        <Box sx={{ alignSelf: "end", gap: "1vw", marginTop: "auto" }}>
                            <Button variant="outlined" onClick={() => navigate(current_project ? `/projects/${current_project.id}` : "/projects")}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                            </Button>
                        </Box>
                    </Box>
                    <EditWorkersContainer formik={formik} user={user} />
                </form>
            </Box>
        </Paper>
    )
}
