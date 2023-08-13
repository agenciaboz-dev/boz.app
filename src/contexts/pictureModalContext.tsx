import { createContext, useState } from "react"
import React from "react"

interface PictureModalContextValue {
    open: boolean
    setOpen: (value: boolean) => void
    url: string
    setUrl: (value: string) => void
}

interface PictureModalProviderProps {
    children: React.ReactNode
}

const PictureModalContext = createContext<PictureModalContextValue>({} as PictureModalContextValue)

export default PictureModalContext

export const PictureModalProvider: React.FC<PictureModalProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState("")

    return <PictureModalContext.Provider value={{ open, setOpen, url, setUrl }}>{children}</PictureModalContext.Provider>
}
