export function getCurrentWeekDays() {
    const today = new Date()
    const dayOfWeek = today.getDay() // Sunday - 0, Monday - 1, ..., Saturday - 6
    const currentWeekDays = []

    // Calculate the difference to Monday (considering Sunday as the end of the week, with getDay() = 0)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust for Sunday being 0

    // Set start of the week to Monday
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + diffToMonday)
    startOfWeek.setHours(0, 0, 0, 0) // Normalize the time to midnight

    // Populate the array with each day of the week from Monday to Sunday
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        currentWeekDays.push(day)
    }

    return currentWeekDays
}
