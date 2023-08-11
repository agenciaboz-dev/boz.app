import { useContext } from "react"
import DepartmentsContext from "../contexts/departmentsContext"

export const useDepartments = () => {
    const departmentsContext = useContext(DepartmentsContext)
    const { departments } = departmentsContext

    return { departments }
}
