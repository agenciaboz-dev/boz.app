import { useNavigate } from "react-router-dom"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import CategoryIcon from "@mui/icons-material/Category"
import BarChartIcon from "@mui/icons-material/BarChart"

export const useAdminTabs = () => {
    const navigate = useNavigate()

    const tabs: Menu[] = [
        {
            id: 1,
            name: "usuários",
            path: "/",
            icon: <PeopleAltIcon />,
            onClick: () => navigate("/admin"),
        },
        {
            id: 2,
            name: "clientes",
            path: "/customers",
            icon: <BusinessCenterIcon />,
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
    ]

    return tabs
}
