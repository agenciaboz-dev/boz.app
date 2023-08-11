import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface DepartmentsContextValue {
    departments: Department[]
    roles: Role[]
    loading: boolean
}

interface DepartmentsProviderProps {
    children: React.ReactNode
}

const DepartmentsContext = createContext<DepartmentsContextValue>({} as DepartmentsContextValue)

export default DepartmentsContext

export const DepartmentsProvider: React.FC<DepartmentsProviderProps> = ({ children }) => {
    const io = useIo()
    const [departments, setDepartments] = useState<Department[]>([])
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log({ roles })
    }, [roles])

    useEffect(() => {
        console.log({ departments })
    }, [departments])

    useEffect(() => {
        io.on("departments:sync", (departments: Department[]) => {
            setDepartments(departments)

            setLoading(false)
        })

        io.on("roles:sync", (roles: Role[]) => {
            setRoles(roles)
        })

        return () => {
            io.off("departments:sync")
            io.off("roles:sync")
        }
    }, [])

    return <DepartmentsContext.Provider value={{ departments, roles, loading }}>{children}</DepartmentsContext.Provider>
}
