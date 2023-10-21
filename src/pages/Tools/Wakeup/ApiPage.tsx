import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, Paper, Switch, TextField, useMediaQuery } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useWakeup } from "../../../hooks/useWakeup"
import { Add, DeleteForever } from "@mui/icons-material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useConfirmDialog } from "burgos-confirm"
import { NewRequest } from "./NewRequest"
import { RequestContainer } from "./RequestContainer"
import { Label } from "./Label"
import colors from "../../../style/colors"

interface ApiPageProps {
    user: User
}

const Title: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", padding: isMobile? "5vw 0" : "1vw 0" }}>
            <p style={{ textAlign: "center" }}>{title}</p>
            <Box sx={{ flexDirection: "column" }}>{children}</Box>
        </Box>
    )
}

export const ApiPage: React.FC<ApiPageProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const id = useParams().id
    const { list } = useWakeup()
    const api = list.find((item) => item.id == Number(id))
    const navigate = useNavigate()
    const io = useIo()
    const { confirm } = useConfirmDialog()

    const [firstRender, setFirstRender] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<WakeupRequest>()
    const [newRequest, setNewRequest] = useState(false)

    const formik = useFormik({ initialValues: api!, onSubmit: (values) => console.log(values) })

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
                })
            }
        }
    }, [formik.values])

    useEffect(() => {
        if (!api) navigate("/tools/wakeup")
    }, [])

    return api ? (
        <Box sx={{ width: "100%", justifyContent: "space-between", flexDirection: isMobile? "column" : "row", gap: isMobile? "5vw" : "" }}>
            <Paper
                sx={{
                    width: isMobile? "100%" : "15vw",
                    height: isMobile? "30vh" : "80vh",
                    bgcolor: "background.default",
                    flexDirection: "column",
                    overflowY: "auto",
                    gap: isMobile? "5vw" : "1vw"
                }}
            >
                <Title title="Requests">
                    <Button
                        endIcon={<Add />}
                        variant="contained"
                        sx={{
                            color: "background.default",
                            fontWeight: "bold",
                            margin: isMobile? "2vw 5vw 5vw" : "0 1vw 1vw"
                        }}
                        onClick={() => setNewRequest(true)}
                    ></Button>
                    {api.requests
                        .sort((a, b) => a.id - b.id)
                        .map((request) => {
                            const active = request.id == selectedRequest?.id
                            return (
                                <MenuItem
                                    key={request.id}
                                    onClick={() => {
                                        setSelectedRequest(undefined)
                                        setTimeout(() => setSelectedRequest(request), 10)
                                    }}
                                    sx={{
                                        bgcolor: active ? colors.primaryLight : "",
                                        color: active ? "black" : "",
                                        pointerEvents: active ? "none" : "",
                                        fontWeight: active ? "bold" : "normal",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p style={{ width: isMobile? "100%" : "10vw", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                        {request.name}
                                    </p>
                                    <Label label={request.method} color={request.method == "GET" ? "success" : "info"} />
                                </MenuItem>
                            )
                        })}
                </Title>

                {api.socket && (
                    <Title title="Events">
                        <Button
                            endIcon={<Add />}
                            variant="contained"
                            sx={{
                                color: "background.default",
                                fontWeight: "bold",
                                margin: isMobile? "2vw 5vw 2vw" : "0 1vw 1vw"
                            }}
                            onClick={() => navigate("/tools/wakeup/new")}
                        ></Button>
                        {api.events.map((event) => (
                            <MenuItem key={event.id}>{event.name}</MenuItem>
                        ))}
                    </Title>
                )}
            </Paper>

            {newRequest ? (
                <NewRequest
                    user={user}
                    api={api}
                    cancel={() => setNewRequest(false)}
                    setRequest={(request: WakeupRequest) => setSelectedRequest(request)}
                />
            ) : selectedRequest ? (
                <RequestContainer request={selectedRequest} api={api} close={() => setSelectedRequest(undefined)} />
            ) : (
                <Box sx={{ flexDirection: "column", width: isMobile? "100%" : "63vw", gap: isMobile? "5vw" : "1vw" }}>
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
                        </Box>
                        <IconButton color="error" onClick={handleDelete}>
                            {deleting ? <CircularProgress color="error" size="1.5rem" /> : <DeleteForever />}
                        </IconButton>
                    </Box>
                    <TextField label="Descrição" multiline minRows={10} />
                </Box>
            )}
        </Box>
    ) : (
        <></>
    )
}
