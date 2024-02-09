import React from "react"
import { Avatar, Box, Paper, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { useUser } from "../../../hooks/useUser"
import { useColors } from "../../../hooks/useColors"
import { Title } from "../../Tools/Wakeup"
import { useNavigate } from "react-router-dom"
import { RiDashboardFill } from "react-icons/ri"
import { CardData } from "../../../components/Dashboard/General/CardData"
import { BiSolidTimeFive } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoBusiness } from "react-icons/io5"
import { GridColDef } from "@mui/x-data-grid"
import { RankingTable } from "../../../components/Dashboard/General/RankingTable"
import { useCustomers } from "../../../hooks/useCustomers"
import { useProject } from "../../../hooks/useProject"
import { formatTotalWorked, getTotalWorked } from "../../Tools/project/getTotalWorked"
import { ImConnection } from "react-icons/im"
import { useDepartments } from "../../../hooks/useDepartments"
import { ChartBar } from "../../../components/Dashboard/General/ChartBar"
import { ChartPie } from "../../../components/Dashboard/General/CharPie"
import { TermData } from "../../../components/Dashboard/General/TermData"
import { TbPinnedFilled } from "react-icons/tb"

interface StatsProps {
    user: User
}

const columns: GridColDef[] = [
    {
        field: "image",
        headerName: "#",
        width: 60,
        editable: false,
        renderCell: (params) => <Avatar variant="rounded" src={params.value} />,
    },
    {
        field: "customer",
        headerName: "Cliente",
        width: 450,
        editable: false,
        renderHeader: () => <strong style={{ alignItems: "center", gap: "2vw" }}>{"Cliente "}</strong>,
    },
    {
        field: "time",
        headerName: "Horas trabalhadas",
        width: 200,
        editable: false,
        renderHeader: () => <strong style={{ alignItems: "center", gap: "2vw" }}>{"Horas trabalhadas"}</strong>,
    },
]
export const Stats: React.FC<StatsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const { logs } = useUser()
    const navigate = useNavigate()
    const { customers } = useCustomers()
    const { list, connectedList } = useUser()
    const departments = useDepartments()
    const project = useProject()

    const barData = customers.map((customer) => {
        const totalProjectTime = customer.projects.flatMap((project) => project.workers.flatMap((worker) => worker.times))
        const total_worked = getTotalWorked(totalProjectTime)
        return { cliente: customer.name, horas: total_worked }
    })

    const rows = customers.map((customer) => {
        const totalProjectTime = customer.projects.flatMap((project) => project.workers.flatMap((worker) => worker.times))
        const total_worked = getTotalWorked(totalProjectTime)

        return {
            id: customer.id,
            customer: customer.name,
            image: customer.image,
            time: formatTotalWorked(total_worked, true),
        }
    })

    const pieData = project.list.slice(0, 9).map((department, index) => {
        return {
            name: department.name,
            value: 2 * index + 7,
        }
    })
    const totalProjectTime = project.list.flatMap((project) => project.workers.flatMap((worker) => worker.times))
    // const sortedList = project.list.slice().sort((a, b) => a.times - b.times)
    const pie = project.list.map((department, index) => {
        return {
            name: department.name,
            value: 2 * index + 7,
        }
    })

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
                        gap: "0,5vw",
                    }}
                >
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ textAlign: "center", fontWeight: "800", fontSize: "1.5vw", color: colors.text.primary }}>
                            Estatísticas Gerais
                        </p>
                    </Box>
                    <Box sx={{ width: "100%", gap: "1vw", flexDirection: "row" }}>
                        <Box sx={{ width: "50%", gap: "1vw", height: "100%", flexDirection: "column" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "1vw",
                                }}
                            >
                                <Box sx={{ flexDirection: "row", width: "100%", gap: "1vw" }}>
                                    <CardData
                                        icon={<FaUsers color="#fff" style={{ width: "1.5vw", height: "1.3vw" }} />}
                                        data={list.map((item) => item).length}
                                        title=" Total de Colaboradores"
                                    />
                                    <CardData
                                        title="Total de Clientes"
                                        data={customers.map((item) => item).length}
                                        icon={<IoBusiness color="#fff" style={{ width: "1.3vw", height: "1.3vw" }} />}
                                    />
                                </Box>
                                <Box sx={{ flexDirection: "row", width: "100%", gap: "1vw" }}>
                                    <CardData
                                        title="Colaboradores Conectados"
                                        data={connectedList.map((item) => item).length}
                                        icon={<ImConnection color="#fff" style={{ width: "1.3vw", height: "1.3vw" }} />}
                                    />
                                    <CardData
                                        title="Clientes Ativos"
                                        data={customers.filter((item) => item.active).length}
                                        icon={<BiSolidTimeFive color="#fff" style={{ width: "1.3vw", height: "1.3vw" }} />}
                                    />
                                </Box>
                            </Box>
                            <RankingTable title="Clientes x Tempo Trabalhado" columns={columns} rows={rows} />
                        </Box>

                        <Box sx={{ flexDirection: "column", width: "47%", height: "100%", gap: "1vw" }}>
                            <Box sx={{ width: "100%", flexDirection: "row", height: "44%", gap: "1vw" }}>
                                <ChartPie pieData={pieData} />
                                <Box
                                    sx={{
                                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                        borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
                                        width: "37%",
                                        height: isMobile ? "auto" : "100%",
                                        padding: isMobile ? "8vw 5vw" : "1vw",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box sx={{ flexDirection: "row", alignItems: "center" }}>
                                        <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>Fixados</p>
                                        <TbPinnedFilled color="#9C9C9C" style={{ width: "vw", height: "vw" }} />
                                    </Box>
                                    {customers.slice(0, 7).map((customer, index) => (
                                        <TermData key={index} customer={customer} />
                                    ))}
                                </Box>
                            </Box>
                            <ChartBar data={barData} />
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
