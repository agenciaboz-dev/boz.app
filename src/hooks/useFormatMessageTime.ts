export const useFormatMessageTime = () => {
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
        if (!date.getDay()) return "" 

        // @ts-ignore
        return `${date.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })} - ${days[date.getDay() + 1]}, ${date.getDate()} de ${
            // @ts-ignore
            months[date.getMonth() + 1]
        } de ${date.getFullYear()}`
    }

    return format
}

// sexta, 08 de agosto de 2023
