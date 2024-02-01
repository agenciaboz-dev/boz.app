import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useProject } from "../../hooks/useProject"
import { Title } from "../Profile/UserComponents"
import { TaiTextField } from "../../components/TaiTextField"
import MaskedInputCerto from "../../components/MaskedInputCerto"
import { useNumberMask } from "burgos-masks"

interface NewProjectProps {
    user: User
}

export const NewProject: React.FC<NewProjectProps> = ({ user }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const projects = useProject()
    const number_mask = useNumberMask({ allowDecimal: false })

    const [loading, setLoading] = useState(false)
    const [weeks, setWeeks] = useState("")

    const initialValues: NewProjectForm = {
        name: "",
        description: "",
        deadline: "",
        github: "",
        workers: [],
    }

    const formik = useFormik<NewProjectForm>({
        initialValues,
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
            // io.emit("project:new", values)
        },
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
        })

        return () => {
            io.off("project:new:success")
            io.off("project:new:error")
        }
    }, [])

    useEffect(() => {}, [weeks])

    return (
        <Box sx={{ flexDirection: "column", width: "99%", gap: "2vw", padding: "2vw" }}>
            <form onSubmit={formik.handleSubmit}>
                <Title name="novo projeto" />
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
                <Box sx={{ flexDirection: "column", width: "100%", gap: "1vw" }}>
                    {formik.values.workers.map((worker) => (
                        <></>
                    ))}
                </Box>
                <Box sx={{ alignSelf: "end", gap: "1vw" }}>
                    <Button variant="outlined" onClick={() => navigate("/projects")}>
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
