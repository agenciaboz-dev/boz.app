export function isDateInThisWeek(date: Date) {
    const now = new Date()
    // Set the hours, minutes, seconds, and milliseconds to 0 for 'now' to ensure accurate comparison
    now.setHours(0, 0, 0, 0)

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay()) // Subtract the day of the week (0 for Sunday, 1 for Monday, etc.)

    // Calculate the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Add 6 days to get to Saturday

    // Ensure the date is at midnight to accurately compare dates without time components
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    return checkDate >= startOfWeek && checkDate <= endOfWeek
}
