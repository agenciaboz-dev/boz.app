export const getCurrentWorkingTime = (worker: ProjectWorker) => worker.times.find((time) => !time.ended)
