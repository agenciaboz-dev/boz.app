import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
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
            id: 2,
            name: "agenda",
            path: "/agenda",
            icon: <CalendarMonthIcon />,
            onClick: () => navigate("/agenda"),
        },
    ]

    return menus
}
