export const getWorkers = (project: Project) => {
    return project.workers.filter((worker) => !!worker.times.length && !worker.times[worker.times.length - 1].ended)
}
