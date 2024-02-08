import React from "react"
import { Box, Grid, IconButton, Paper, Tooltip, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { useUser } from "../../../hooks/useUser"
import { StatusLogs } from "./StatusLogs"
import { useColors } from "../../../hooks/useColors"
import { Title } from "../../Tools/Wakeup"
import { Add } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { RiDashboardFill } from "react-icons/ri"
import { CardData } from "../../../components/Dashboard/CardData"
import { BiSolidTimeFive } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoBusiness } from "react-icons/io5"
import { BarChart, Bar, XAxis, YAxis, Tooltip as Tool, Legend, CartesianGrid, ResponsiveContainer } from "recharts"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"

interface StatsProps {
    user: User
}

export const Stats: React.FC<StatsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const { logs } = useUser()
    const navigate = useNavigate()
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "firstName",
            headerName: "First name",
            width: 150,
            editable: true,
        },
        {
            field: "lastName",
            headerName: "Last name",
            width: 150,
            editable: true,
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },
    ]

    const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ]

    const data = [
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 50 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 50 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 50 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 90 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 50 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 70 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 10 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        { cliente: "Cliente A", horas: 40 },
        { cliente: "Cliente B", horas: 35 },
        { cliente: "Cliente C", horas: 10 },
        { cliente: "Cliente D", horas: 20 },
        { cliente: "Cliente E", horas: 55 },
        // Assumindo que você preencherá até 'Cliente Z' conforme seu exemplo
    ]

    return (
        <Box
            sx={{
                ...backgroundStyle,
                height: isMobile ? "auto" : "100%",
                padding: isMobile ? "8vw 5vw" : "1vw  ",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
        >
            <Box
                sx={{
                    color: colors.text.secondary,
                    padding: isMobile ? "8vw 5vw" : "0vw",
                    justifyContent: "space-between",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "5vw" : "0vw",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    borderRadius: isMobile ? "0 2vw 0 0" : "0 3vw 0 3vw ",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Paper
                    sx={{
                        width: isMobile ? "100%" : "18%",
                        height: isMobile ? "30vh" : "100%",
                        bgcolor: "background.paper",
                        flexDirection: "column",
                        overflowY: "auto",
                        padding: "1vw ",
                        // pl: "1vw",
                        alignItems: "center",
                        gap: isMobile ? "5vw" : "1.5vw",
                        borderRadius: isMobile ? "0 2vw 0 0" : "0 0 0 2vw ",
                        color: "secondary.main",
                        overflowX: "hidden",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    elevation={0}
                >
                    <Title title="Dashboard" icon={<RiDashboardFill style={{ width: "1.2vw", height: "1.2vw" }} />}></Title>
                </Paper>

                <Box
                    sx={{
                        width: isMobile ? "100%" : "81%",
                        padding: "2vw 0vw 1vw 0vw",
                        flexDirection: "column",
                        gap: "1vw",
                    }}
                >
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ textAlign: "center", fontWeight: "800", fontSize: "1vw", color: colors.text.primary }}>
                            Estatísticas Gerais
                        </p>
                    </Box>
                    <Box sx={{ width: "100%", gap: "1vw" }}>
                        <Box sx={{ width: "50%", gap: "1.5vw", height: "100%", flexDirection: "column" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "30%",
                                    gap: "1vw",
                                }}
                            >
                                <Box sx={{ flexDirection: "row", width: "100%", gap: "1vw" }}>
                                    <CardData icon={<FaUsers color="#fff" style={{ width: "1.3vw", height: "1.3vw" }} />}>
                                        <Box sx={{ flexDirection: "column" }}>
                                            <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>
                                                Total de Colaboradores
                                            </p>
                                            <p style={{ fontWeight: "bold", color: colors.terciary, fontSize: "1.3vw" }}>
                                                21
                                            </p>
                                        </Box>
                                    </CardData>
                                    <CardData icon={<IoBusiness color="#fff" style={{ width: "1.3vw", height: "1.3vw" }} />}>
                                        <Box sx={{ flexDirection: "column" }}>
                                            <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>
                                                Total de Clientes
                                            </p>
                                            <p style={{ fontWeight: "bold", color: colors.terciary, fontSize: "1.3vw" }}>
                                                21
                                            </p>
                                        </Box>
                                    </CardData>
                                </Box>
                                <Box sx={{ flexDirection: "row", width: "100%", gap: "1vw" }}>
                                    <CardData
                                        icon={<BiSolidTimeFive color="#fff" style={{ width: "", height: "" }} />}
                                    ></CardData>
                                    <CardData
                                        icon={<BiSolidTimeFive color="#fff" style={{ width: "", height: "" }} />}
                                    ></CardData>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: isMobile ? "auto" : "75%",
                                    padding: isMobile ? "8vw 5vw" : "1vw  ",
                                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
                                }}
                            >
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "46.7%",
                                height: isMobile ? "auto" : "70%",
                                padding: isMobile ? "8vw 5vw" : "1vw  ",
                                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
                            }}
                        >
                            <BarChart
                                width={730} // Ajuste conforme necessário para acomodar todos os clientes
                                height={400}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="cliente" tick={{ fill: "gray", fontSize: 12 }} />
                                <YAxis
                                    label={{ value: "Horas", angle: -90, position: "insideLeft" }}
                                    tick={{ fill: "gray", fontSize: 12 }}
                                />
                                <Tool />
                                <Legend />
                                <Bar
                                    dataKey="horas"
                                    fill={colors.primary}
                                    name="Cliente x Horas Mensais"
                                    radius={[5, 5, 0, 0]}
                                />
                            </BarChart>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

{
    /* <StatusLogs logs={logs.everybody_status.sort((a, b) => b.id - a.id)} /> */
}
