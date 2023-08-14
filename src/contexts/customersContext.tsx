import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface CustomersContextValue {
    customers: Customer[]
    setCustomers: (value: Customer[]) => void

    services: Service[]
    serviceModal: {
        isOpen: boolean
        close: () => void
        open: () => void
    }
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
    const [serviceModalOpen, setServiceModalOpen] = useState(false)

    const serviceModal = {
        isOpen: serviceModalOpen,
        close: () => setServiceModalOpen(false),
        open: () => setServiceModalOpen(true),
    }

    useEffect(() => {
        io.on("service:new", (data: Service) => {
            setServices((services) => [...services, data])
        })

        return () => {
            io.off("service:new")
        }
    }, [services])

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

    return <CustomersContext.Provider value={{ customers, setCustomers, services, serviceModal }}>{children}</CustomersContext.Provider>
}
