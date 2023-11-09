import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { Title } from "../../Profile/UserComponents"
import { TaiTextField } from "../../../components/TaiTextField"
import { useNavigate } from "react-router-dom"

interface NewEventProps {
    user: User
    api: Wakeup
}

export const NewEvent: React.FC<NewEventProps> = ({ user, api }) => {
    const io = useIo()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const initialValues: NewWakeupEvent = {
        name: "",
        userId: user.id,
        apiId: api.id,
        event: "",
        payload: "",
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            setLoading(true)
            io.emit("wakeup:event:new", values)
        },
    })

    const handleMessageBlur = () => {
        try {
            formik.setFieldValue("payload", JSON.stringify(JSON.parse(formik.values.payload), null, 4))
        } catch {}
    }

    const goBack = () => navigate(`/tools/wakeup/api/${api.id}`)

    useEffect(() => {
        io.on("wakeup:event:new:success", (event) => {
            setLoading(false)
            navigate(`/tools/wakeup/api/${api.id}/event/${event.id}`)
        })

        return () => {
            io.off("wakeup:event:new:success")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "80%", gap: "2vw", padding: "2vw 4vw" }}>
            <Title name="New event" />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TaiTextField
                            label="Nome"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TaiTextField
                            label="Evento"
                            name="event"
                            value={formik.values.event}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                </Grid>
                <TaiTextField
                    label="Message"
                    name="payload"
                    value={formik.values.payload}
                    onChange={formik.handleChange}
                    onBlur={handleMessageBlur}
                    multiline
                    minRows={8}
                />

                <Box sx={{ gap: "1vw", alignSelf: "end" }}>
                    <Button variant="outlined" onClick={() => goBack()}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type="submit" sx={{ color: "secondary.main" }}>
                        {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "Criar"}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
