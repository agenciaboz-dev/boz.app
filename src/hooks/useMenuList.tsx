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

export const useMenuList = () => {
    const navigate = useNavigate()

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
            name: "Atendimento",
            path: "/zap",
            icon: <WhatsAppIcon />,
            onClick: () => navigate("/zap"),
        },
        {
            id: 3,
            name: "Tarefas",
            path: "/tasks",
            icon: <FormatListNumberedRtlIcon />,
            onClick: () => navigate("/tasks"),
        },
        {
            id: 4,
            name: "Coleguinhas",
            path: "/users",
            icon: <Groups3Icon />,
            onClick: () => navigate("/users"),
        },
        {
            id: 5,
            name: "Clientes",
            path: "/customers",
            icon: <BusinessIcon />,
            onClick: () => navigate("/customers"),
        },
        {
            id: 6,
            name: "Agenda",
            path: "/agenda",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/agenda"),
        },
        {
            id: 7,
            name: "Ferramentas",
            path: "/tools",
            icon: <SettingsIcon />,
            onClick: () => navigate("/tools"),
            submenus: [
                {
                    id: 1,
                    icon: <QrCodeScannerIcon />,
                    name: "Qr code",
                    path: "/qrcode",
                    onClick: () => navigate("/tools/qrcode"),
                },
            ],
        },
        {
            id: 8,
            name: "Administração",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => {},
            submenus: [
                {
                    id: 1,
                    icon: <Groups3Icon />,
                    name: "Usuários",
                    path: "/users",
                    onClick: () => navigate("/admin/users"),
                },
                {
                    id: 2,
                    icon: <BusinessIcon />,
                    name: "Clientes",
                    path: "/customers",
                    onClick: () => navigate("/admin/customers"),
                },
                {
                    id: 3,
                    name: "departamentos e funções",
                    path: "/departments",
                    icon: <CategoryIcon />,
                    onClick: () => navigate("/admin/departments"),
                },
                {
                    id: 4,
                    name: "estatísticas",
                    path: "/stats",
                    icon: <BarChartIcon />,
                    onClick: () => navigate("/admin/stats"),
                },
            ],
        },
        {
            id: 9,
            icon: <FileDownload />,
            name: "Baixar",
            path: "/download",
            onClick: () => window.open("https://github.com/agenciaboz-dev/boz.electron/releases/download/windows/Boz-setup.exe", "_blank")?.focus(),
        },
    ]

    return menus
}
