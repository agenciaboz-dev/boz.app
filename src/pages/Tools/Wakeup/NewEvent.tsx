import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { Title } from "../../Profile/UserComponents"
import { TaiTextField } from "../../../components/TaiTextField"

interface NewEventProps {
    user: User
    api: Wakeup
    cancel: () => void
    setEvent: (event: WakeupEvent) => void
}

export const NewEvent: React.FC<NewEventProps> = ({ user, api, cancel, setEvent }) => {
    const io = useIo()

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

    useEffect(() => {
        io.on("wakeup:event:new:success", (event) => {
            setLoading(false)
            setEvent(event)
            cancel()
        })

        return () => {
            io.off("wakeup:event:new:success")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "77%", gap: "2vw", padding: "0vw 0vw" }}>
            <Title name="New event" />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TaiTextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TaiTextField label="evento" name="event" value={formik.values.event} onChange={formik.handleChange} />
                    </Grid>
                </Grid>
                <TaiTextField
                    label="message"
                    name="payload"
                    value={formik.values.payload}
                    onChange={formik.handleChange}
                    onBlur={handleMessageBlur}
                    multiline
                    minRows={8}
                />

                <Box sx={{ gap: "1vw", alignSelf: "end" }}>
                    <Button variant="outlined" onClick={() => cancel()}>
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
