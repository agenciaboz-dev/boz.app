import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, TextField, Tooltip, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useWakeup } from "../../../hooks/useWakeup"
import { DeleteForever } from "@mui/icons-material"
import { useConfirmDialog } from "burgos-confirm"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Title } from "../../Profile/UserComponents"
import { TaiTextField } from "../../../components/TaiTextField"
import { textFieldStyle } from "../../../style/textfield"

interface RequestContainerProps {
    request: WakeupRequest
    api: Wakeup
    close: () => void
}

export const RequestContainer: React.FC<RequestContainerProps> = ({ request, api, close }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                width: isMobile ? "100%" : "75%",
                gap: isMobile ? "5vw" : "1vw",
                //overflow: "auto",
            }}
        >
            <Title name={formik.values.name} />
            <Box sx={{ justifyContent: "space-between" }}>
                <IconButton onClick={close}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Tooltip title={`Excluir ${formik.values.name}`} arrow>
                    <IconButton color="primary" sx={{ color: "" }} onClick={handleDelete}>
                        {deleting ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForever />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Grid container spacing={1.5}>
                <Grid item xs={2}>
                    <TextField
                        label="Método"
                        name="method"
                        value={formik.values.method}
                        onChange={formik.handleChange}
                        sx={textFieldStyle}
                        select
                    >
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <TaiTextField label="Nome" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    {" "}
                    <TaiTextField label="Url" name="url" value={formik.values.url} onChange={formik.handleChange} />
                </Grid>
            </Grid>

            <Box sx={{ flexDirection: "column", gap: "1vw", alignItems: "space-between" }}>
                {formik.values.method != "GET" && (
                    <TextField
                        label="Payload"
                        name="payload"
                        value={formik.values.payload}
                        onChange={formik.handleChange}
                        multiline
                        minRows={5}
                        onBlur={handlePayloadBlur}
                    />
                )}
                <Button
                    variant="contained"
                    sx={{ color: "secondary.main" }}
                    onClick={handleSend}
                    fullWidth
                    disabled={!jsonPayload}
                >
                    {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
                </Button>
                <TextField
                    label="Response"
                    name="response"
                    value={formik.values.response}
                    onChange={formik.handleChange}
                    multiline
                    minRows={4}
                    InputProps={{
                        readOnly: true,
                        sx: {},
                    }}
                    sx={{
                        overflowY: "auto",
                        maxHeight: isMobile ? "auto" : formik.values.method != "GET" ? "10vw" : "19vw",
                    }}
                />
                <Button variant="contained" disabled={!status} color={wakeup.statusCodeColor(status)}>
                    {status || "status"}
                </Button>
            </Box>
        </Box>
    )
}
