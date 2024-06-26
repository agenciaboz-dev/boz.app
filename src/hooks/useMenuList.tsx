import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SettingsIcon from "@mui/icons-material/Settings"
import Groups3Icon from "@mui/icons-material/Groups3"
import BusinessIcon from "@mui/icons-material/Business"
import CategoryIcon from "@mui/icons-material/Category"
import BarChartIcon from "@mui/icons-material/BarChart"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated"
import NewReleasesIcon from "@mui/icons-material/NewReleases"
import { useUser } from "./useUser"
import { Badge, BadgeProps, styled } from "@mui/material"
import { useWarnings } from "./useWarnings"
import ApiIcon from "@mui/icons-material/Api"
import PaletteIcon from "@mui/icons-material/Palette"
import { AccountTree } from "@mui/icons-material"
import { useCustomers } from "./useCustomers"

export const useMenuList = () => {
    const navigate = useNavigate()
    const warnings = useWarnings()

    const { user, list } = useUser()
    const { customers } = useCustomers()

    const electron = window.electron

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: "0.2vw",
            top: "0.2vw",
            padding: "0 4px",
            minWidth: 0,
            width: "1.1vw",
            height: "1.1vw",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.75vw",
        },
    }))

    const menus: Menu[] = [
        {
            id: 1,
            name: "Início",
            path: "/",
            icon: <HomeIcon />,
            onClick: () => navigate("/"),
        },
        {
            id: 2,
            name: "Avisos",
            path: "/warnings",
            icon: (
                <StyledBadge
                    badgeContent={warnings.list.filter((warning) => !warning.confirmed.some((item) => item.id == user?.id)).length}
                    max={9}
                    color="warning"
                >
                    <NewReleasesIcon />
                </StyledBadge>
            ),
            onClick: () => navigate("/warnings"),
        },
        {
            id: 2.5,
            name: "Projetos",
            path: "/projects",
            icon: <AccountTree />,
            onClick: () => navigate("/projects"),
        },
        {
            id: 3,
            name: "Atendimento",
            path: "/zap",
            icon: <WhatsAppIcon />,
            onClick: () => navigate("/zap"),
        },
        {
            id: 4,
            name: "Tarefas",
            path: "/tasks",
            icon: <FormatListNumberedRtlIcon />,
            onClick: () => navigate("/tasks"),
            admin: true,
        },
        {
            id: 5,
            name: "Coleguinhas",
            path: "/users",
            icon: (
                <StyledBadge badgeContent={list.length} color="warning">
                    <Groups3Icon />
                </StyledBadge>
            ),
            onClick: () => navigate("/users"),
        },
        {
            id: 6,
            name: "Clientes",
            path: "/customers",
            icon: (
                <StyledBadge badgeContent={customers.filter((customer) => customer.active).length} color="warning">
                    <BusinessIcon />
                </StyledBadge>
            ),
            onClick: () => navigate("/customers"),
        },
        {
            id: 7,
            name: "Agenda",
            path: "/calendar",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/calendar"),
        },
        {
            id: 8,
            name: "Ferramentas",
            path: "/tools",
            icon: <SettingsIcon />,
            onClick: () => navigate("/tools"),
            submenus: [
                {
                    id: 1,
                    icon: <QrCodeScannerIcon />,
                    name: "QR code",
                    path: "/qrcode",
                    onClick: () => navigate("/tools/qrcode"),
                },
                {
                    id: 2,
                    icon: <ApiIcon />,
                    name: "Wake Up",
                    path: "/wakeup",
                    onClick: () => navigate("/tools/wakeup"),
                },
                {
                    id: 3,
                    icon: <BrowserUpdatedIcon />,
                    name: electron ? "Atualizar" : "Baixar App",
                    path: "/update",
                    onClick: () => navigate("/tools/update"),
                },
                {
                    id: 4,
                    icon: <WhatsAppIcon />,
                    name: "Nagazap",
                    path: "/nagazap",
                    onClick: () => navigate("/tools/nagazap/"),
                },
            ],
        },
        {
            id: 9,
            name: "Administração",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => {},
            admin: true,
            submenus: [
                {
                    id: 1,
                    name: "Departamentos e funções",
                    path: "/departments",
                    icon: <CategoryIcon />,
                    onClick: () => navigate("/admin/departments"),
                },
                {
                    id: 2,
                    name: "Estatísticas",
                    path: "/stats",
                    icon: <BarChartIcon />,
                    onClick: () => navigate("/admin/stats"),
                },
                {
                    id: 3,
                    name: "Temas",
                    path: "/themes",
                    icon: <PaletteIcon />,
                    onClick: () => navigate("/admin/themes"),
                },
            ],
        },
    ]

    return menus
}
