import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useWakeup } from "../../../hooks/useWakeup"
import { DeleteForever } from "@mui/icons-material"
import { useConfirmDialog } from "burgos-confirm"

interface RequestContainerProps {
    request: WakeupRequest
    api: Wakeup
    close: () => void
}

export const RequestContainer: React.FC<RequestContainerProps> = ({ request, api, close }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const io = useIo()
    const formik = useFormik({ initialValues: request!, onSubmit: (values) => console.log(values) })
    const wakeup = useWakeup()
    const { confirm } = useConfirmDialog()

    const [firstRender, setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [jsonPayload, setJsonPayload] = useState(formik.values.method == "GET")
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

    const handleDelete = () => {
        confirm({
            title: "Deletar request",
            content: "Tem certeza??",
            onConfirm: () => {
                setDeleting(true)
                io.emit("wakeup:request:delete", request)
            },
        })
    }

    const handlePayloadBlur = () => {
        try {
            formik.setFieldValue("payload", JSON.stringify(JSON.parse(formik.values.payload.trim()), null, 4))
        } catch {}
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

    useEffect(() => {
        if (formik.values.method != "GET") {
            try {
                JSON.parse(formik.values.payload)
                setJsonPayload(true)
            } catch {
                setJsonPayload(false)
            }
        }
    }, [formik.values.payload])

    useEffect(() => {
        io.on("wakeup:request:delete:success", () => {
            close()
        })

        return () => {
            io.off("wakeup:request:delete:success")
        }
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: isMobile ? "100%" : "63vw",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
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
                <TextField
                    label="payload"
                    name="payload"
                    value={formik.values.payload}
                    onChange={formik.handleChange}
                    multiline
                    minRows={7}
                    onBlur={handlePayloadBlur}
                />
            )}

            <Box sx={{ gap: "1vw" }}>
                <IconButton color="error" onClick={handleDelete}>
                    {deleting ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForever />}
                </IconButton>

                <Button variant="contained" onClick={handleSend} fullWidth disabled={!jsonPayload}>
                    {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
                </Button>
            </Box>

            <TextField
                label="response"
                name="response"
                value={formik.values.response}
                onChange={formik.handleChange}
                multiline
                minRows={7}
                InputProps={{ readOnly: true, sx: {} }}
                sx={{
                    overflowY: "auto",
                    maxHeight: isMobile ? "auto" : formik.values.method != "GET" ? "15vw" : "30vw",
                }}
            />

            <Button variant="contained" disabled={!status} color={wakeup.statusCodeColor(status)}>
                {status || "status"}
            </Button>
        </Box>
    )
}
