import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { useWakeup } from "../../../hooks/useWakeup"
import { useConfirmDialog } from "burgos-confirm"
import { Title } from "../../Profile/UserComponents"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { DeleteForever } from "@mui/icons-material"
import { TaiTextField } from "../../../components/TaiTextField"
import { SocketContainer } from "./SocketContainer"

interface EventContainerProps {
    event: WakeupEvent
    api: Wakeup
    close: () => void
}

export const EventContainer: React.FC<EventContainerProps> = ({ event, api, close }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const formik = useFormik({ initialValues: event, onSubmit: (values) => console.log(values) })
    const wakeup = useWakeup()
    const { confirm } = useConfirmDialog()

    const [firstRender, setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [jsonPayload, setJsonPayload] = useState(false)

    const handleSend = async () => {
        if (loading) return

        setLoading(true)
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
                io.emit("wakeup:event:update", {
                    id: event.id,
                    name: formik.values.name,
                    payload: formik.values.payload,
                    event: formik.values.event,
                })
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
    }, [formik.values.payload])

    useEffect(() => {
        io.on("wakeup:event:delete:success", () => {
            close()
        })

        return () => {
            io.off("wakeup:event:delete:success")
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
                    minRows={5}
                    onBlur={handlePayloadBlur}
                />

                <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleSend} fullWidth disabled={!wakeup.socket.connected}>
                    {loading ? <CircularProgress size="1.5rem" sx={{ color: "background.default" }} /> : "send"}
                </Button>

                <SocketContainer api={api} />
            </Box>
        </Box>
    )
}
