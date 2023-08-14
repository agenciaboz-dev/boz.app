import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SettingsIcon from "@mui/icons-material/Settings"

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
            name: "Agenda",
            path: "/agenda",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/agenda"),
        },
        {
            id: 5,
            name: "Configurações",
            path: "/settings",
            icon: <SettingsIcon />,
            onClick: () => navigate("/settings"),
        },
        {
            id: 6,
            name: "Administração",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => navigate("/admin"),
        },
    ]

    return menus
}
