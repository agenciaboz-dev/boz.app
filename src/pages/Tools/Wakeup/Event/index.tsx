import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material"
import { useIo } from "../../../../hooks/useIo"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { useWakeup } from "../../../../hooks/useWakeup"
import { useConfirmDialog } from "burgos-confirm"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { DeleteForever } from "@mui/icons-material"
import { TaiTextField } from "../../../../components/TaiTextField"

interface EventProps {
    api: Wakeup
    fullscreenSocket: boolean
}

export const Event: React.FC<EventProps> = ({ api, fullscreenSocket }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const id = Number(useParams().id)
    const event = api.events.find((item) => item.id == id)!
    const formik = useFormik({ initialValues: event, onSubmit: (values) => console.log(values), enableReinitialize: true })
    const wakeup = useWakeup()
    const { confirm } = useConfirmDialog()
    const navigate = useNavigate()

    const emitTimeout = useRef<number | null>(null)

    const [firstRender, setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [jsonPayload, setJsonPayload] = useState(false)

    const handleSend = async () => {
        if (loading) return
        setLoading(true)
        await wakeup.send(formik.values.event, formik.values.payload)
        setLoading(false)
    }

    const handleDelete = () => {
        confirm({
            title: "Deletar event",
            content: "Tem certeza??",
            onConfirm: () => {
                setDeleting(true)
                io.emit("wakeup:event:delete", event)
            },
        })
    }

    const goBack = () => {
        navigate(`/tools/wakeup/api/${api.id}`)
    }

    const handlePayloadBlur = () => {
        try {
            formik.setFieldValue("payload", JSON.stringify(JSON.parse(formik.values.payload), null, 4))
        } catch {}
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values) {
                if (emitTimeout.current) {
                    clearTimeout(emitTimeout.current)
                }

                emitTimeout.current = setTimeout(() => {
                    io.emit("wakeup:event:update", {
                        id: event.id,
                        name: formik.values.name,
                        payload: formik.values.payload,
                        event: formik.values.event,
                    })
                }, 2000)
            }
        }
    }, [formik.values])

    useEffect(() => {
        try {
            JSON.parse(formik.values.payload)
            setJsonPayload(true)
        } catch {
            setJsonPayload(false)
        }
    }, [formik.values?.payload])

    useEffect(() => {
        io.on("wakeup:event:delete:success", () => {
            goBack()
        })

        return () => {
            io.off("wakeup:event:delete:success")
        }
    }, [])

    return formik.values ? (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
                gap: isMobile ? "5vw" : "1vw",
                padding: "1vw",
                //overflow: "auto",
                display: fullscreenSocket ? "none" : "",
            }}
        >
            <Box sx={{ justifyContent: "space-between", alignItems: "center", color: "primary.main" }}>
                <IconButton onClick={goBack}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <p style={{ fontWeight: "800", textAlign: "center" }}>{formik.values.name}</p>
                <Tooltip title={`Excluir ${formik.values.name}`} arrow>
                    <IconButton color="primary" sx={{ color: "" }} onClick={handleDelete}>
                        {deleting ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForever />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Grid container spacing={1.5}>
                <Grid item xs={6}>
                    <TaiTextField label="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TaiTextField label="event" name="event" value={formik.values.event} onChange={formik.handleChange} />
                </Grid>
            </Grid>

            <Box sx={{ flexDirection: "column", gap: "1vw", alignItems: "space-between" }}>
                <TaiTextField
                    label="message"
                    name="payload"
                    value={formik.values.payload}
                    onChange={formik.handleChange}
                    multiline
                    minRows={4}
                    maxRows={4}
                    onBlur={handlePayloadBlur}
                />

                <Button
                    variant="contained"
                    sx={{ color: "secondary.main" }}
                    onClick={handleSend}
                    fullWidth
                    disabled={wakeup.socket.connected != api.id}
                >
                    {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
                </Button>
            </Box>
        </Box>
    ) : (
        <></>
    )
}
