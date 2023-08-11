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
            name: "início",
            path: "/",
            icon: <HomeIcon />,
            onClick: () => navigate("/"),
        },
        {
            id: 2,
            name: "atendimento",
            path: "/zap",
            icon: <WhatsAppIcon />,
            onClick: () => navigate("/zap"),
        },
        {
            id: 3,
            name: "tarefas",
            path: "/tasks",
            icon: <FormatListNumberedRtlIcon />,
            onClick: () => navigate("/tasks"),
        },
        {
            id: 4,
            name: "agenda",
            path: "/agenda",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/agenda"),
        },
        {
            id: 5,
            name: "configurações",
            path: "/settings",
            icon: <SettingsIcon />,
            onClick: () => navigate("/settings"),
        },
        {
            id: 6,
            name: "administração",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => navigate("/admin"),
        },
    ]

    return menus
}
