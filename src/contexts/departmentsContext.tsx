import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface DepartmentsContextValue {
    departments: Department[]
}

interface DepartmentsProviderProps {
    children: React.ReactNode
}

const DepartmentsContext = createContext<DepartmentsContextValue>({} as DepartmentsContextValue)

export default DepartmentsContext

export const DepartmentsProvider: React.FC<DepartmentsProviderProps> = ({ children }) => {
    const io = useIo()
    const [departments, setDepartments] = useState<Department[]>([])

    useEffect(() => {
        console.log({ departments })
    }, [departments])

    useEffect(() => {
        io.on("departments:sync", (departments: Department[]) => {
            setDepartments(departments)
        })

        return () => {
            io.off("departments:sync")
        }
    }, [])

    return <DepartmentsContext.Provider value={{ departments }}>{children}</DepartmentsContext.Provider>
}
