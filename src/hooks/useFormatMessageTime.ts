import { useMediaQuery } from "@mui/material"

type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 12
type Days = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const useFormatMessageTime = () => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const months = {
        [1]: "Jan",
        [2]: "Fev",
        [3]: "Mar",
        [4]: "Abr",
        [5]: "Mai",
        [6]: "Jun",
        [7]: "Jul",
        [8]: "Ago",
        [9]: "Set",
        [10]: "Out",
        [11]: "Nov",
        [12]: "Dez",
    }

    const days = {
        [1]: "Dom",
        [2]: "Seg",
        [3]: "Ter",
        [4]: "Qua",
        [5]: "Qui",
        [6]: "Sex",
        [7]: "Sáb",
    }

    const format = (date: Date) => {
        const weekDay = (date.getDay() + 1) as Days
        const day = date.getDate()
        const month = (date.getMonth() + 1) as Months

        if (!day) return ""

        return `${date.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })} - ${days[weekDay]}, ${day} de ${
            months[month]
        } de ${date.getFullYear()}`
    }

    const mobileFormat = (date: Date) => {

    }

    return format
}

// sexta, 08 de agosto de 2023
