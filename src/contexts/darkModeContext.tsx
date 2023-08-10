import { createContext, useEffect, useState } from "react"
import React from "react"

interface DarkModeContextValue {
    value: boolean
    setValue: (value: boolean) => void
    toogleDarkMode: () => void
}

interface DarkModeProviderProps {
    children: React.ReactNode
}

const DarkModeContext = createContext<DarkModeContextValue>({} as DarkModeContextValue)

export default DarkModeContext

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [value, setValue] = useState<boolean>(false)

    const toogleDarkMode = () => {
        setValue(!value)
    }

    // useEffect(() => {
    //     setTimeout(() => toogleDarkMode(), 300)
    // }, [value])

    return <DarkModeContext.Provider value={{ value, setValue, toogleDarkMode }}>{children}</DarkModeContext.Provider>
}
