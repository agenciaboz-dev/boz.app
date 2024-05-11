import React, { useState } from "react"
import { Box, Collapse, IconButton, SxProps, Tab, Tabs, useMediaQuery } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useUser } from "../../../hooks/useUser"
import { Avatar } from "../../../components/Avatar"
import DataTable, { TableColumn } from "react-data-table-component"
import { useColors } from "../../../hooks/useColors"
import { useDarkMode } from "../../../hooks/useDarkMode"
import { buildWorkedHours } from "./workedHours"

interface StatusLogsProps {
    logs: StatusLog[]
}

const Circle: React.FC<{ status: number }> = ({ status }) => {
    const color = ["text.secondary", "success.main", "info.main", "warning.main", "error.main"]
    return <Box sx={{ width: "0.75vw", height: "0.75vw", borderRadius: "50%", bgcolor: color[status] }}></Box>
}

export const Status: React.FC<{ status: number }> = ({ status }) => {
    const text = ["desconectou", "disponível", "reunião", "pausa", "almoço"]
    return (
        <Box sx={{ alignItems: "center", gap: "1vw" }}>
            <Circle status={status} />
            {text[status]}
        </Box>
    )
}

export const UserAvatar: React.FC<{ user: User; avatarSize?: string }> = ({ user, avatarSize }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                gap: isMobile ? "3vw" : "0.5vw",
                alignItems: "center",
                color: "text.secondary",
                fontSize: isMobile ? "5vw" : "1vw",
            }}
        >
            <Avatar user={user} size={avatarSize || (isMobile ? "15vw" : "2.5vw")} small />
            {user.name.split(" ")[0]}
        </Box>
    )
}

const UserContainer: React.FC<{ user: User; logs: StatusLog[] }> = ({ user, logs }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const colors = useColors()
    const { darkMode } = useDarkMode()
    // logs.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    const workedHours = buildWorkedHours(logs)

    const [open, setOpen] = useState(false)
    const [renderHours, setRenderHours] = useState(0)

    const columns: TableColumn<StatusLog>[] = [
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => <Status status={row.status} />,
            width: isMobile ? "33%" : "10vw",
        },
        {
            name: "Horário",
            selector: (row) => row.datetime,
            sortable: true,
            cell: (row) => (
                <Box>{new Date(row.datetime).toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })}</Box>
            ),
            width: isMobile ? "33%" : "6vw",
        },
        {
            name: "Data",
            selector: (row) => row.datetime,
            sortable: true,
            cell: (row) => <Box>{new Date(row.datetime).toLocaleDateString("pt-br")}</Box>,
            width: isMobile ? "33%" : "5vw",
        },
    ]

    return (
        <Box sx={{ flexDirection: "column", width: isMobile ? "90vw" : "25vw" }}>
            <Box
                sx={{
                    padding: isMobile ? "3vw" : "1vw",
                    alignItems: "center",
                    color: "primary.main",
                    borderBottom: "2px solid",
                    borderRadius: isMobile ? "3vw" : "0.5vw",
                    justifyContent: "space-between",
                    fontWeight: "normal",
                }}
            >
                <UserAvatar user={user} />
                <IconButton onClick={() => setOpen((open) => !open)}>
                    <KeyboardArrowDownIcon sx={{ rotate: open ? "-180deg" : "", transition: "0.3s" }} />
                </IconButton>
            </Box>
            <Collapse in={open} unmountOnExit>
                <Box
                    sx={{
                        borderBottom: "2px solid",
                        borderRadius: isMobile ? "3vw" : "0.5vw",
                        color: "primary.main",
                        width: isMobile ? "90vw" : "25vw",
                        flexDirection: "column",
                    }}
                >
                    <Tabs value={renderHours} onChange={(_, value) => setRenderHours(value)} variant="fullWidth">
                        <Tab label="Lista" value={0} />
                        <Tab label="Horas" value={1} />
                    </Tabs>

                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        noDataComponent={<p>Nenhum registro</p>}
                        // @ts-ignore
                        columns={renderHours ? workedHours.columns : columns}
                        theme={darkMode ? "dark" : ""}
                        // @ts-ignore
                        data={renderHours ? workedHours.data : logs}
                        highlightOnHover
                        // fixedHeader
                        // fixedHeaderScrollHeight={"38.1vw"}
                        // onRowClicked={(row) => navigate(`/dashboard/products/${row.id}`)}
                        customStyles={{
                            headCells: { style: { padding: isMobile ? "0" : "" } },
                            cells: { style: { padding: isMobile ? "0" : "" } },
                            headRow: {
                                style: {
                                    backgroundColor: colors.background.primary,
                                    fontSize: isMobile ? "3.5vw" : "0.6vw",
                                },
                            },
                            table: { style: { backgroundColor: colors.background.primary } },
                            rows: {
                                style: {
                                    cursor: "pointer",
                                    backgroundColor: colors.background.primary,
                                    fontSize: isMobile ? "3.5vw" : "0.65vw",
                                },
                            },
                            pagination: {
                                style: { backgroundColor: colors.background.primary, fontSize: isMobile ? "4vw" : "0.6vw" },
                            },
                        }}
                    />
                </Box>
            </Collapse>
        </Box>
    )
}

export const StatusLogs: React.FC<StatusLogsProps> = ({ logs }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const { list, connectedList } = useUser()

    const connectedUsers = list.filter((user) => connectedList.map((item) => item.id).includes(user.id))
    const nonConnectedUsers = list.filter((user) => !connectedList.map((item) => item.id).includes(user.id))

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                color: "primary.main",
                fontWeight: "bold",
                height: "auto",
                overflowY: "auto",
                padding: isMobile ? "5vw 0" : "0",
                textAlign: isMobile ? "center" : "start",
                fontSize: isMobile ? "6vw" : "1vw",
            }}
        >
            Log de atividade
            {connectedUsers.map((user) => (
                <UserContainer key={user.id} user={user} logs={logs.filter((log) => log.user.id == user.id)} />
            ))}
            {nonConnectedUsers.map((user) => (
                <UserContainer key={user.id} user={user} logs={logs.filter((log) => log.user.id == user.id)} />
            ))}
        </Box>
    )
}
