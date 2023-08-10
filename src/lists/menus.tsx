import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

export const menus: Menu[] = [
    {
        id: 1,
        name: "início",
        path: "/",
        icon: <HomeIcon />,
    },
    {
        id: 2,
        name: "atendimento",
        path: "/zap",
        icon: <WhatsAppIcon />,
    },
    {
        id: 3,
        name: "tarefas",
        path: "/tasks",
        icon: <FormatListNumberedRtlIcon />,
    },
    {
        id: 2,
        name: "agenda",
        path: "/agenda",
        icon: <CalendarMonthIcon />,
    },
]
