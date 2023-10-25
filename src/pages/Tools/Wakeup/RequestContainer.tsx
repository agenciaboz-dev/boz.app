import React, { useEffect, useRef, useState } from "react"
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
import colors from "../../../style/colors"
import { useLocation, useNavigate, useParams } from "react-router-dom"

interface RequestContainerProps {
    api: Wakeup
}

export const RequestContainer: React.FC<RequestContainerProps> = ({ api }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const id = Number(useParams().id)
    const request = api.requests.find((item) => item.id == id)!
    const formik = useFormik({ initialValues: request!, onSubmit: (values) => console.log(values), enableReinitialize: true })
    const wakeup = useWakeup()
    const navigate = useNavigate()
    const { confirm } = useConfirmDialog()
    const pathname = useLocation().pathname

    const emitTimeout = useRef<number | null>(null)

    const [firstRender, setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [jsonPayload, setJsonPayload] = useState(formik.values?.method == "GET")
    const [status, setStatus] = useState(0)
    const [statusText, setStatusText] = useState("")

    const handleSend = async () => {
        if (loading) return

        setLoading(true)
        setStatus(0)
        try {
            formik.setFieldValue("response", "")
            const response = await wakeup.request(api!, formik.values)
            setLoading(false)
            console.log(response)
            if (response) {
                if (response.data) {
                    formik.setFieldValue("response", JSON.stringify(response.data, null, 4))
                }

                setStatus(response.status)
                setStatusText(response.statusText)
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

    const goBack = () => {
        navigate(`/tools/wakeup/api/${api.id}`)
    }

    useEffect(() => {
        setStatus(0)
        setStatusText("")
    }, [pathname])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values) {
                if (emitTimeout.current) {
                    clearTimeout(emitTimeout.current)
                }
                emitTimeout.current = setTimeout(() => {
                    io.emit("wakeup:request:update", {
                        id: request.id,
                        name: formik.values.name,
                        url: formik.values.url,
                        payload: formik.values.payload,
                        response: formik.values.response,
                        method: formik.values.method,
                    })
                }, 2000)
            }
        }
    }, [formik.values])

        useEffect(() => {
            if (formik.values?.method != "GET") {
                try {
                    JSON.parse(formik.values.payload)
                    setJsonPayload(true)
                } catch {
                    setJsonPayload(false)
                }
            }
        }, [formik.values?.payload])

        useEffect(() => {
            io.on("wakeup:request:delete:success", () => {
                goBack()
            })

            return () => {
                io.off("wakeup:request:delete:success")
            }
        }, [])

        return formik.values ? (
            <Box
                sx={{
                    flexDirection: "column",
                    width: "100%",
                    gap: isMobile ? "5vw" : "1vw",
                    //overflow: "auto",
                    padding: "1vw 2vw 1vw 1vw",
                }}
            >
                <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <IconButton onClick={goBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <p style={{ fontWeight: "800", color: colors.primary, textAlign: "center" }}>{formik.values.name}</p>
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
                        <TaiTextField
                            label="Payload"
                            name="payload"
                            value={formik.values.payload}
                            onChange={formik.handleChange}
                            multiline
                            minRows={5}
                            onBlur={handlePayloadBlur}
                        />
                    )}
                    <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleSend} fullWidth disabled={!jsonPayload}>
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
                    </Button>
                    <TaiTextField
                        label="Response"
                        name="response"
                        value={formik.values.response}
                        onChange={formik.handleChange}
                        multiline
                        minRows={4}
                        maxRows={formik.values.method != "GET" ? 11 : 19}
                        InputProps={{
                            readOnly: true,
                            sx: {},
                        }}
                        sx={
                            {
                                // overflowY: "auto",
                                // maxHeight: isMobile ? "auto" : formik.values.method != "GET" ? "10vw" : "19vw",
                            }
                        }
                    />

                    <Tooltip title={statusText}>
                        <Button variant="contained" disabled={!status} color={wakeup.statusCodeColor(status)}>
                            {status || "status"}
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        ) : (
            <></>
        )
}
