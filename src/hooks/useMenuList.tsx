import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SettingsIcon from "@mui/icons-material/Settings"
import Groups3Icon from "@mui/icons-material/Groups3"
import BusinessIcon from "@mui/icons-material/Business"

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
        },
        {
            id: 8,
            name: "Administração",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => navigate("/admin"),
        },
    ]

    return menus
}
