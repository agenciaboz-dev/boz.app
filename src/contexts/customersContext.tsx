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
        open: (service?: Service) => void
        current?: Service
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
    const [currentService, setCurrentService] = useState<Service>()

    const serviceModal = {
        isOpen: serviceModalOpen,
        close: () => setServiceModalOpen(false),
        open: (service?: Service) => {
            setCurrentService(service)
            setServiceModalOpen(true)
        },
        current: currentService,
    }

    useEffect(() => {
        io.on("service:update", (data: Service) => {
            setServices((services) => [...services.filter((item) => item.id != data.id), data])
        })

        io.on("service:new", (data: Service) => {
            setServices((services) => [...services.filter((item) => item.id != data.id), data])
        })

        return () => {
            io.off("service:new")
            io.off("service:update")
        }
    }, [services])

    useEffect(() => {
        io.on("customer:new", (data: Customer) => {
            setCustomers((customers) => [...customers, data])
        })

        io.on("customer:update", (data: Customer) => {
            setCustomers((customers) => [...customers.filter((customer) => customer.id != data.id), data])
        })

        io.on("customer:delete", (data: Customer) => {
            setCustomers((customers) => [...customers.filter((customer) => customer.id != data.id)])
        })

        return () => {
            io.off("customer:new")
            io.off("customer:update")
            io.off("customer:delete")
        }
    }, [customers])

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
