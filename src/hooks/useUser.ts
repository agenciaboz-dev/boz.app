import { useCallback, useContext, useState } from "react"
import UserContext from "../contexts/userContext"
import { useApi } from "./useApi"
import { useSnackbar } from "burgos-snackbar"
import { useIo } from "./useIo"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"

export const useUser = () => {
    const api = useApi()
    const io = useIo()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const storage = useLocalStorage()

    const electronApi = window.electron

    const userContext = useContext(UserContext)
    const { user, setUser, connected, list, connectedList, addUser, logs, latestVersion, downloadUrl } = userContext

    const drawer = {
        open: userContext.drawer.open,
        toogle: () => userContext.drawer.setOpen(!userContext.drawer.open),
        close: () => userContext.drawer.setOpen(false),
    }

    const firstname = user?.name.split(" ")[0] || ""

    const isAdmin = () => user?.roles.map((role) => role.tag).includes("admin")

    const isRole = (role: string) => !!user?.roles.find((item) => item.tag == role)

    // const handleWorkingOnStatusChange = useCallback(
    //     (user: User) => {
    //         if (user.status == 1) {
    //             if (!!userContext.workPausedId) {
    //                 const data: PlayProjectForm = { worker_id: userContext.workPausedId, role: userContext.workPausedRole }
    //                 setTimeout(() => io.emit("project:play", data), 500)
    //                 userContext.setWorkPausedId(0)
    //                 userContext.setWorkPausedRole("")
    //             }
    //         } else {
    //             const working = user.working_projects.find((worker) => !!worker.times.length && !worker.times[worker.times.length - 1].ended)
    //             if (working) {
    //                 setTimeout(() => io.emit("project:stop", working.times[working.times.length - 1], working), 500)
    //                 userContext.setWorkPausedId(working.id)
    //                 userContext.setWorkPausedRole(working.times[working.times.length - 1].role!)
    //             }
    //         }
    //     },
    //     [userContext.workPausedId]
    // )

    const updateStatus = (status: number) => {
        if (!user) return

        const updatedUser = { ...user, status: user.status == status ? 1 : status }

        setUser(updatedUser)
        io.emit("user:status:update", updatedUser)

        // handleWorkingOnStatusChange(updatedUser)
    }

    const saveLoginData = (values: LoginForm | null) => {
        storage.set("boz:login", values)
    }

    const login = (values: LoginForm, setLoading: (value: boolean) => void) => {
        setLoading(true)
        api.user.login({
            data: values,
            callback: (response: { data?: User }) => {
                const user = response.data
                if (user) {
                    setUser(user)
                    io.emit("client:sync", user)
                    io.emit("zap:sync")

                    if (electronApi) saveLoginData(values)

                    snackbar({ severity: "success", text: "logado" })
                } else {
                    snackbar({ severity: "error", text: "não foi possível fazer login" })
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const googleLogin = (user: User) => {
        setUser(user)
        io.emit("client:sync", user)
        if (electronApi) saveLoginData({ login: user.username, password: user.password })
    }

    const logout = () => {
        setUser(null)
        io.emit("user:logout", user)
        drawer.close()
        if (electronApi) saveLoginData(null)
    }

    const remove = (user: User, setDeleting: (value: boolean) => void) => {
        setDeleting(true)
        api.user.delete({
            data: user,
            callback: () => {
                navigate(-1)
                snackbar({ severity: "warning", text: "usuario deletado" })
            },
            finallyCallback: () => setDeleting(false),
        })
    }

    const find = (id: number) => list.find((user) => user.id == id)

    const electron = {
        latestVersion,
        downloadUrl,
    }

    return {
        find,
        user,
        drawer,
        login,
        logout,
        connected,
        list,
        connectedList,
        remove,
        addUser,
        firstname,
        updateStatus,
        isAdmin,
        logs,
        electron,
        googleLogin,
        isRole,
    }
}
