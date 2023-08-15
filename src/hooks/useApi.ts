import { useSnackbar } from "burgos-snackbar"
import { api } from "../api"

interface ApiOptions {
    data?: any
    callback: Function
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const { snackbar } = useSnackbar()

    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.error(error)
        snackbar({ severity: "error", text: "erro desconhecido" })
    }

    const defaultFinally = (finallyCallback?: Function) => {
        finallyCallback && finallyCallback()
    }

    const user = {
        login: (options: ApiOptions) => {
            api.post("/user/login", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        delete: (options: ApiOptions) => {
            api.post("/user/delete", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        find: {
            username: (options: ApiOptions) => {
                api.post("/user/find/username", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
    }

    const service = {
        new: (options: ApiOptions) => {
            api.post("/customer/service/new", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
    }

    const customer = {
        new: (options: ApiOptions) => {
            api.post("/customer/new", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        toggleStatus: (options: ApiOptions) => {
            api.post("/customer/toggleStatus", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
    }

    const department = {
        new: (options: ApiOptions) => {
            api.post("/department/new", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },

        role: {
            new: (options: ApiOptions) => {
                api.post("/department/role/new", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
    }

    return { user, service, customer, department }
}
