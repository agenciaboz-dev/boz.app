import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface CustomersContextValue {
    customers: Customer[]
    setCustomers: (value: Customer[]) => void

    services: Service[]
}

interface CustomersProviderProps {
    children: React.ReactNode
}

const CustomersContext = createContext<CustomersContextValue>({} as CustomersContextValue)

export default CustomersContext

export const CustomersProvider: React.FC<CustomersProviderProps> = ({ children }) => {
    const io = useIo()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        io.on("customers:sync", (data: Customer[]) => {
            setCustomers(data)
        })

        io.on("services:sync", (data: Service[]) => {
            setServices(data)
        })

        return () => {
            io.off("customers:sync")
            io.off("services:sync")
        }
    }, [])

    return <CustomersContext.Provider value={{ customers, setCustomers, services }}>{children}</CustomersContext.Provider>
}
