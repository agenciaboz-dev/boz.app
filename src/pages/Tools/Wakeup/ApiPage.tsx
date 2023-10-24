import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Switch,
    TextField,
    Tooltip,
    lighten,
    useMediaQuery,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
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
import { NewEvent } from "./NewEvent"
import { TaiTextField } from "../../../components/TaiTextField"
import { EventContainer } from "./EventContainer"

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

    const [firstRender, setFirstRender] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<WakeupRequest>()
    const [selectedEvent, setSelectedEvent] = useState<WakeupEvent>()
    const [newRequest, setNewRequest] = useState(false)
    const [newEvent, setNewEvent] = useState(false)
    const [localhost, setLocalhost] = useState<boolean>(storage.get(`bozapp:wakeup:${api?.id}:localhost`))

    const formik = useFormik({ initialValues: api!, onSubmit: (values) => console.log(values) })

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
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values && api) {
                io.emit("wakeup:update", {
                    id: api.id,
                    name: formik.values.name,
                    baseUrl: formik.values.baseUrl,
                    port: formik.values.port,
                    socket: formik.values.socket,
                    description: formik.values.description,
                })
            }
        }
    }, [formik.values])

    useEffect(() => {
        if (!api) navigate("/tools/wakeup")
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
                <p style={{ fontWeight: "800", color: colors.primary, textAlign: "center" }}>{api.name}</p>;
                <Title title="Requests" handleClick={() => setNewRequest(true)}>
                    {api.requests
                        .sort((a, b) => a.id - b.id)
                        .map((request) => {
                            const active = request.id == selectedRequest?.id
                            return (
                                <MenuItem
                                    key={request.id}
                                    onClick={() => {
                                        setSelectedRequest(undefined)
                                        setSelectedEvent(undefined)
                                        setTimeout(() => setSelectedRequest(request), 10)
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
                    <Title title="Events" handleClick={() => setNewEvent(true)}>
                        {api.events.map((event) => {
                            const active = event.id == selectedEvent?.id
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
                                        setSelectedRequest(undefined)
                                        setSelectedEvent(undefined)
                                        setTimeout(() => setSelectedEvent(event), 10)
                                    }}
                                >
                                    {event.name}
                                </MenuItem>
                            )
                        })}
                    </Title>
                )}
            </Box>

            {newRequest ? (
                <Box sx={{ width: "100%", padding: "4vw" }}>
                    <NewRequest
                        user={user}
                        api={api}
                        cancel={() => setNewRequest(false)}
                        setRequest={(request: WakeupRequest) => setSelectedRequest(request)}
                    />
                </Box>
            ) : newEvent ? (
                <Box sx={{ width: "100%", padding: "4vw" }}>
                    <NewEvent user={user} api={api} cancel={() => setNewEvent(false)} setEvent={(event: WakeupEvent) => setSelectedEvent(event)} />
                </Box>
            ) : selectedRequest ? (
                <Box sx={{ width: "100%", padding: "2vw 4vw" }}>
                    <RequestContainer request={selectedRequest} api={api} close={() => setSelectedRequest(undefined)} />
                </Box>
            ) : selectedEvent ? (
                <Box sx={{ width: "100%", padding: "2vw 4vw" }}>
                    <EventContainer event={selectedEvent} api={api} close={() => setSelectedRequest(undefined)} />
                </Box>
            ) : (
                <Box sx={{ width: "87%", padding: "0 4vw" }}>
                    <Box sx={{ flexDirection: "column", width: isMobile ? "100%" : "63vw", gap: isMobile ? "5vw" : "1vw" }}>
                        <Grid container spacing={1.5}>
                            <Grid item xs={9}>
                                <TextField label="Nome" name="name" value={formik.values.name} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label="Porta" name="port" value={formik.values.port} onChange={formik.handleChange} />
                            </Grid>
                        </Grid>
                        <TextField label="Endereço base" name="baseUrl" value={formik.values.baseUrl} onChange={formik.handleChange} />
                        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ alignItems: "center" }}>
                                Socket.io
                                <Switch name="socket" defaultChecked={api.socket} value={api.socket} onChange={formik.handleChange} />
                                localhost
                                <Switch
                                    icon={<HouseSidingIcon />}
                                    checkedIcon={<HouseSidingIcon />}
                                    defaultChecked={localhost}
                                    value={localhost}
                                    onChange={(_, checked) => handleLocalhostChange(checked)}
                                />
                            </Box>
                            <Grid container spacing={1.5}>
                                <Grid item xs={9}>
                                    <TaiTextField label="Nome" name="name" value={formik.values.name} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TaiTextField label="Porta" name="port" value={formik.values.port} onChange={formik.handleChange} />
                                </Grid>
                            </Grid>
                            <TaiTextField label="Endereço base" name="baseUrl" value={formik.values.baseUrl} onChange={formik.handleChange} />
                            <TextField
                                label="Descrição"
                                multiline
                                minRows={10}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    ) : (
        <></>
    )
}
