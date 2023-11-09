import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, Paper, Switch, TextField, Tooltip, lighten, useMediaQuery } from "@mui/material"
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"
import { useWakeup } from "../../../hooks/useWakeup"
import { Add, DeleteForever } from "@mui/icons-material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useConfirmDialog } from "burgos-confirm"
import { NewRequest } from "./NewRequest"
import { RequestContainer } from "./RequestContainer"
import { Label } from "./Label"
import { useColors } from "../../../hooks/useColors"
import colors from "../../../style/colors"

import HouseSidingIcon from "@mui/icons-material/HouseSiding"
import HomeIcon from "@mui/icons-material/Home"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { TaiTextField } from "../../../components/TaiTextField"
import { EventContainer } from "./EventContainer"
import { NewEvent } from "./NewEvent"

interface ApiPageProps {
    user: User
}

const Title: React.FC<{ title: string; children: React.ReactNode; handleClick: () => void }> = ({ title, children, handleClick }) => {
    const colors = useColors()
    const color = lighten(colors.text.secondary, 0.35)
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ flexDirection: "column", gap: "0.1vw", padding: isMobile ? "5vw 0" : "0.3vw 0vw" }}>
            <Box sx={{ padding: "0 1vw", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ textAlign: "center", fontWeight: "800", color }}>{title}</p>
                <Tooltip title={`New ${title}`} placement="top">
                    <IconButton sx={{ justifyContent: "flex-end" }} onClick={handleClick}>
                        <Add color="primary" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ flexDirection: "column" }}>{children}</Box>
        </Box>
    )
}

export const ApiPage: React.FC<ApiPageProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const id = useParams().id
    const { list } = useWakeup()
    const api = list.find((item) => item.id == Number(id))
    const navigate = useNavigate()
    const io = useIo()
    const { confirm } = useConfirmDialog()
    const storage = useLocalStorage()
    const pathname = useLocation().pathname

    const emitTimeout = useRef<number | null>(null)

    const [firstRender, setFirstRender] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<WakeupRequest>()
    const [selectedEvent, setSelectedEvent] = useState<WakeupEvent>()
    const [newRequest, setNewRequest] = useState(false)
    const [newEvent, setNewEvent] = useState(false)
    const [localhost, setLocalhost] = useState<boolean>(storage.get(`bozapp:wakeup:${api?.id}:localhost`))

    const formik = useFormik({ initialValues: api!, onSubmit: (values) => console.log(values), enableReinitialize: true })

    const handleLocalhostChange = (checked: boolean) => {
        storage.set(`bozapp:wakeup:${api?.id}:localhost`, checked)
        setLocalhost(checked)
    }

    const handleDelete = () => {
        confirm({
            title: "Deletar api",
            content: "Tem certeza??",
            onConfirm: () => {
                setDeleting(true)
                io.emit("wakeup:delete", api)
            },
        })
    }

    useEffect(() => {
        setLocalhost(storage.get(`bozapp:wakeup:${api?.id}:localhost`))
    }, [api])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values && api) {
                if (emitTimeout.current) {
                    clearTimeout(emitTimeout.current)
                }
                emitTimeout.current = setTimeout(() => {
                    io.emit("wakeup:update", {
                        id: api.id,
                        name: formik.values.name,
                        baseUrl: formik.values.baseUrl,
                        port: formik.values.port,
                        socket: formik.values.socket,
                        description: formik.values.description,
                    })
                }, 2000)
            }
        }
    }, [formik.values])

    useEffect(() => {
        if (!api) navigate("/tools/wakeup")

        io.on("wakeup:delete:success", () => setDeleting(false))

        return () => {
            io.off("wakeup:delete:success")
        }
    }, [])

    return api ? (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "5vw" : "",
            }}
        >
            <Box
                sx={{
                    width: isMobile ? "100%" : "20%",
                    height: isMobile ? "30vh" : "100%",
                    bgcolor: "background.default",
                    flexDirection: "column",
                    overflowY: "auto",
                    gap: isMobile ? "5vw" : "1vw",
                    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                    padding: "2vw 0.5vw",
                }}
            >
                <p style={{ fontWeight: "800", color: colors.primary, textAlign: "center" }}>{api.name}</p>
                <></>
                <Title title="Requests" handleClick={() => navigate(`/tools/wakeup/api/${api.id}/new/request`)}>
                    {api.requests
                        .sort((a, b) => a.id - b.id)
                        .map((request) => {
                            const split = pathname.split("request/")
                            const active = request.id == (split.length > 0 ? Number(split[1]) : 1)
                            return (
                                <MenuItem
                                    key={request.id}
                                    onClick={() => {
                                        navigate(`/tools/wakeup/api/${api.id}/request/${request.id}`)
                                    }}
                                    sx={{
                                        bgcolor: active ? colors.primary : "",
                                        color: active ? colors.background : "",
                                        pointerEvents: active ? "none" : "",
                                        fontWeight: active ? "bold" : "normal",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            width: isMobile ? "100%" : "10vw",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            fontSize: "0.9vw",
                                        }}
                                    >
                                        {request.name}
                                    </p>
                                    <Label label={request.method} color={request.method == "GET" ? "success" : "info"} />
                                </MenuItem>
                            )
                        })}
                </Title>
                {api.socket && (
                    <Title title="Events" handleClick={() => navigate(`/tools/wakeup/api/${api.id}/new/event`)}>
                        {api.events.map((event) => {
                            const split = pathname.split("event/")
                            const active = event.id == (split.length > 0 ? Number(split[1]) : 1)
                            return (
                                <MenuItem
                                    key={event.id}
                                    sx={{
                                        bgcolor: active ? colors.primary : "",
                                        color: active ? colors.background : "",
                                        pointerEvents: active ? "none" : "",
                                        fontWeight: active ? "bold" : "normal",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                    onClick={() => {
                                        navigate(`/tools/wakeup/api/${api.id}/event/${event.id}`)
                                    }}
                                >
                                    {event.name}
                                </MenuItem>
                            )
                        })}
                    </Title>
                )}
            </Box>

            <Box sx={{ flexDirection: "column", width: "80%" }}>
                <Routes>
                    <Route
                        index
                        element={
                            formik.values ? (
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        width: "100%",
                                        gap: isMobile ? "5vw" : "1vw",
                                        padding: "2vw 2vw",
                                        paddingRight: "5vw",
                                    }}
                                >
                                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                        <Box sx={{ alignItems: "center" }}>
                                            Socket.io
                                            <Switch name="socket" checked={api.socket} onChange={formik.handleChange} />
                                            localhost
                                            <Switch
                                                icon={<HouseSidingIcon />}
                                                checkedIcon={<HouseSidingIcon />}
                                                checked={localhost}
                                                onChange={(_, checked) => handleLocalhostChange(checked)}
                                            />
                                        </Box>
                                        <Tooltip title={`Excluir ${formik.values.name}`} arrow>
                                            <IconButton color="primary" onClick={handleDelete}>
                                                {deleting ? (
                                                    <CircularProgress color="error" size="1.5rem" />
                                                ) : (
                                                    <DeleteForever />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Grid container spacing={1.5}>
                                        <Grid item xs={9}>
                                            <TaiTextField
                                                label="Name"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TaiTextField
                                                label="Porta"
                                                name="port"
                                                value={formik.values.port}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TaiTextField
                                        label="Base url"
                                        name="baseUrl"
                                        value={formik.values.baseUrl}
                                        onChange={formik.handleChange}
                                    />
                                    <TaiTextField
                                        label="Comments"
                                        multiline
                                        minRows={10}
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                </Box>
                            ) : (
                                <></>
                            )
                        }
                    />
                    <Route path="/event/*" element={<EventContainer api={api} />} />
                    <Route path="/request/:id" element={<RequestContainer api={api} />} />
                    <Route path="/new/request" element={<NewRequest api={api} user={user} />} />
                    <Route path="/new/event" element={<NewEvent api={api} user={user} />} />
                </Routes>
            </Box>
        </Box>
    ) : (
        <></>
    )
}
