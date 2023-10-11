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
import { FileDownload } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated"
import NewReleasesIcon from "@mui/icons-material/NewReleases"
import { useUser } from "./useUser"
import { Badge, BadgeProps, styled } from "@mui/material"
import { useWarnings } from "./useWarnings"

export const useMenuList = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const warnings = useWarnings()

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
                    badgeContent={warnings.list.filter((warning) => warning.confirmed.find((item) => !(item.id == user?.id))).length}
                    max={9}
                    color="warning"
                >
                    <NewReleasesIcon />
                </StyledBadge>
            ),
            onClick: () => navigate("/warnings"),
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
            icon: <Groups3Icon />,
            onClick: () => navigate("/users"),
        },
        {
            id: 6,
            name: "Clientes",
            path: "/customers",
            icon: <BusinessIcon />,
            onClick: () => navigate("/customers"),
        },
        {
            id: 7,
            name: "Agenda",
            path: "/agenda",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/agenda"),
            admin: true,
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
                    id: 3,
                    icon: <BrowserUpdatedIcon />,
                    name: "Atualizar",
                    path: "/update",
                    onClick: () => navigate("/tools/update"),
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
            ],
        },
    ]

    return menus
}
