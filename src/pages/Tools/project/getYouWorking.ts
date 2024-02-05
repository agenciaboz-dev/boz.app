export const getYouWorking = (project: Project, user?: User | null) => {
    const you_worker = project.workers.find((item) => item.user_id == user?.id)
    const you_working = !!you_worker?.times.length && !you_worker.times[you_worker.times.length - 1].ended
    return you_working
}
