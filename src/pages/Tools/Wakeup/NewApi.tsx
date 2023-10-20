import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"

interface NewApiProps {
    user: User
}

export const NewApi: React.FC<NewApiProps> = ({ user }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const initialValues: NewWakupForm = {
        name: "",
        baseUrl: "",
        socket: false,
        userId: user.id,
        port: "",
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            setLoading(true)
            io.emit("wakeup:create", values)
        },
    })

    useEffect(() => {
        io.on("wakeup:create:success", (api) => {
            navigate(`/tools/wakeup/api/${api.id}`)
            setLoading(false)
        })

        io.on("wakeup:create:error", (error) => {
            snackbar({ severity: "error", text: error ? JSON.stringify(error) : "Erro ao criar api" })
        })

        return () => {
            io.off("wakeup:create:success")
            io.off("wakeup:create:error")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "100%", gap: "2vw" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1.5}>
                    <Grid item xs={3}>
                        <TextField label="Nome" name="name" value={formik.values.name} onChange={formik.handleChange} required autoComplete="off" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Porta" name="port" value={formik.values.port} onChange={formik.handleChange} placeholder="4100" required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Endereço base"
                            name="baseUrl"
                            value={formik.values.baseUrl}
                            onChange={formik.handleChange}
                            placeholder="https://app.agenciaboz.com.br"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ gap: "1vw" }}>
                    <Button variant="outlined" fullWidth onClick={() => navigate("/tools/wakeup")}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type="submit" sx={{ color: "background.default" }} fullWidth>
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "Criar"}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
