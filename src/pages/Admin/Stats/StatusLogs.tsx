import React, { useState } from "react"
import { Box, Collapse, IconButton, SxProps } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useUser } from "../../../hooks/useUser"
import { Avatar } from "../../../components/Avatar"
import DataTable, { TableColumn } from "react-data-table-component"
import { useColors } from "../../../hooks/useColors"
import { useDarkMode } from "../../../hooks/useDarkMode"

interface StatusLogsProps {
    logs: StatusLog[]
}

const Circle: React.FC<{ status: number }> = ({ status }) => {
    const color = ["text.secondary", "success.main", "error.main", "warning.main"]
    return <Box sx={{ width: "0.75vw", height: "0.75vw", borderRadius: "50%", bgcolor: color[status] }}></Box>
}

const Status: React.FC<{ status: number }> = ({ status }) => {
    const text = ["desconectou", "disponível", "reunião", "pausa"]
    return (
        <Box sx={{ alignItems: "center", gap: "1vw" }}>
            <Circle status={status} />
            {text[status]}
        </Box>
    )
}

export const UserAvatar: React.FC<{ user: User; avatarSize?: string }> = ({ user, avatarSize }) => (
    <Box sx={{ gap: "1vw", alignItems: "center", color: "text.secondary", fontSize: "1vw" }}>
        <Avatar user={user} size={avatarSize || "2.5vw"} small />
        {user.name.split(" ")[0]}
    </Box>
)

const UserContainer: React.FC<{ user: User; logs: StatusLog[] }> = ({ user, logs }) => {
    const colors = useColors()
    const { darkMode } = useDarkMode()

    const [open, setOpen] = useState(false)

    const columns: TableColumn<StatusLog>[] = [
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => <Status status={row.status} />,
            width: "10vw",
        },
        {
            name: "Horário",
            selector: (row) => row.datetime,
            sortable: true,
            cell: (row) => <Box>{new Date(row.datetime).toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })}</Box>,
            width: "6vw",
        },
        {
            name: "Data",
            selector: (row) => row.datetime,
            sortable: true,
            cell: (row) => <Box>{new Date(row.datetime).toLocaleDateString("pt-br")}</Box>,
            width: "5vw",
        },
    ]

    return (
        <Box sx={{ flexDirection: "column", width: "25vw" }}>
            <Box
                sx={{
                    padding: "1vw",
                    alignItems: "center",
                    color: "primary.main",
                    borderBottom: "2px solid",
                    borderRadius: "0.5vw",
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
                <Box sx={{ borderBottom: "2px solid", borderRadius: "0.5vw", color: "primary.main", width: "25vw", flexDirection: "column" }}>
                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        noDataComponent={<p>Nenhum registro</p>}
                        columns={columns}
                        theme={darkMode ? "dark" : ""}
                        data={logs}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight={"38.1vw"}
                        // onRowClicked={(row) => navigate(`/dashboard/products/${row.id}`)}
                        customStyles={{
                            headRow: { style: { backgroundColor: colors.background.primary, fontSize: "0.8vw" } },
                            table: { style: { backgroundColor: colors.background.primary } },
                            rows: { style: { cursor: "pointer", backgroundColor: colors.background.primary, fontSize: "0.8vw" } },
                            pagination: { style: { backgroundColor: colors.background.primary, fontSize: "0.6vw" } },
                        }}
                    />
                </Box>
            </Collapse>
        </Box>
    )
}

export const StatusLogs: React.FC<StatusLogsProps> = ({ logs }) => {
    const { list, connectedList } = useUser()

    const connectedUsers = list.filter((user) => connectedList.map((item) => item.id).includes(user.id))
    const nonConnectedUsers = list.filter((user) => !connectedList.map((item) => item.id).includes(user.id))

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", color: "primary.main", fontWeight: "bold", height: "85vh", overflowY: "auto" }}>
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
