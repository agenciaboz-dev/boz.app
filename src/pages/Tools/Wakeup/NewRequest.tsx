import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { TaiTextField } from "../../../components/TaiTextField"
import { textFieldStyle } from "../../../style/textfield"
import { Title } from "../../Profile/UserComponents"

interface NewRequestProps {
    user: User
    api: Wakeup
    cancel: () => void
    setRequest: (request: WakeupRequest) => void
}

export const NewRequest: React.FC<NewRequestProps> = ({ user, api, cancel, setRequest }) => {
    const io = useIo()

    const [loading, setLoading] = useState(false)

    const initialValues: NewWakeupRequest = {
        name: "",
        url: "",
        method: "GET",
        userId: user.id,
        apiId: api.id,
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            setLoading(true)
            io.emit("wakeup:request:new", values)
        },
    })

    useEffect(() => {
        io.on("wakeup:request:new:success", (request) => {
            setLoading(false)
            setRequest(request)
            cancel()
        })

        return () => {
            io.off("wakeup:request:new:success")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "77%", gap: "2vw", padding: "0vw 0vw" }}>
            <Title name="New request" />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1.5}>
                    <Grid item xs={3}>
                        <TextField
                            label="Método"
                            name="method"
                            value={formik.values.method}
                            onChange={formik.handleChange}
                            select
                            sx={textFieldStyle}
                        >
                            <MenuItem value="GET">GET</MenuItem>
                            <MenuItem value="POST">POST</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={9}>
                        <TaiTextField label="Nome" name="name" value={formik.values.name} onChange={formik.handleChange} />
                    </Grid>
                </Grid>
                <TaiTextField label="Url" name="url" value={formik.values.url} onChange={formik.handleChange} />

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
