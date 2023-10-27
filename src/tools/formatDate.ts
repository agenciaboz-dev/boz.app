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

const weekDay = (day: number) => {
    return days[day]
}

const normalize = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export default { weekDay, normalize }
