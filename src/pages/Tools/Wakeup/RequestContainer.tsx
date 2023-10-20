import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useWakeup } from "../../../hooks/useWakeup"

interface RequestContainerProps {
    request: WakeupRequest
    api: Wakeup
}

export const RequestContainer: React.FC<RequestContainerProps> = ({ request, api }) => {
    const io = useIo()
    const formik = useFormik({ initialValues: request!, onSubmit: (values) => console.log(values) })
    const wakeup = useWakeup()

    const [firstRender, setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)

    const handleSend = async () => {
        if (loading) return

        setLoading(true)
        setStatus(0)
        try {
            formik.setFieldValue("response", "")
            const response = await wakeup.request(api!, formik.values)
            setLoading(false)
            if (response) {
                console.log(response.data)

                if (response.data) {
                    formik.setFieldValue("response", JSON.stringify(response.data, null, 4))
                    setStatus(response.status)
                }
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setStatus(error.response?.status || 0)
        }
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values) {
                io.emit("wakeup:request:update", {
                    id: request.id,
                    name: formik.values.name,
                    url: formik.values.url,
                    payload: formik.values.payload,
                    response: formik.values.response,
                    method: formik.values.method,
                })
            }
        }
    }, [formik.values])

    return (
        <Box sx={{ flexDirection: "column", width: "63vw", gap: "1vw" }}>
            <Grid container spacing={1.5}>
                <Grid item xs={3}>
                    <TextField label="method" name="method" value={formik.values.method} onChange={formik.handleChange} select>
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={9}>
                    <TextField label="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Grid>
            </Grid>
            <TextField label="url" name="url" value={formik.values.url} onChange={formik.handleChange} />
            {formik.values.method != "GET" && (
                <TextField label="payload" name="payload" value={formik.values.payload} onChange={formik.handleChange} multiline minRows={7} />
            )}

            <Button variant="contained" onClick={handleSend}>
                {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
            </Button>

            <TextField
                label="response"
                name="response"
                value={formik.values.response}
                onChange={formik.handleChange}
                multiline
                minRows={7}
                InputProps={{ readOnly: true, sx: {} }}
                sx={{ maxHeight: "13vw", overflowY: "auto" }}
            />

            <Button variant="contained" disabled={!status} color={wakeup.statusCodeColor(status)}>
                {status || "status"}
            </Button>
        </Box>
    )
}
