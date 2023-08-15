import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface DepartmentsContextValue {
    departments: Department[]
    roles: Role[]
    loading: boolean

    deparmentModal: {
        isOpen: boolean
        close: () => void
        open: () => void
    }

    roleModal: {
        isOpen: boolean
        close: () => void
        open: () => void
    }
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
    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const [openRoleModal, setOpenRoleModal] = useState(false)

    const deparmentModal = {
        isOpen: openDepartmentModal,
        close: () => setOpenDepartmentModal(false),
        open: () => setOpenDepartmentModal(true),
    }

    const roleModal = {
        isOpen: openRoleModal,
        close: () => setOpenRoleModal(false),
        open: () => setOpenRoleModal(true),
    }

    const addDepartment = (department: Department) => {
        setDepartments((prevList) => [...prevList.filter((item) => item.id != department.id), department])
    }

    const addRole = (role: Role) => {
        setRoles((prevList) => [...prevList.filter((item) => item.id != role.id), role])
    }

    useEffect(() => {
        io.on("role:new", (data: Role) => {
            addRole(data)
        })

        return () => {
            io.off("role:new")
        }
    }, [roles])

    useEffect(() => {
        io.on("department:new", (data: Department) => {
            addDepartment(data)
        })

        return () => {
            io.off("department:new")
        }
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

    return <DepartmentsContext.Provider value={{ departments, roles, loading, deparmentModal, roleModal }}>{children}</DepartmentsContext.Provider>
}
