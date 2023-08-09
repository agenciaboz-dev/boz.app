import { createContext, useState } from 'react';
import React from 'react';


interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void

    drawer: {
        open: boolean
        setOpen: (open: boolean) => void
    }
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default UserContext;

export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User|null>(null)
    const [openDrawer, setOpenDrawer] = useState(false)

    const drawer = {
        open: openDrawer,
        setOpen: setOpenDrawer,
    }

    return <UserContext.Provider value={{ user, setUser, drawer }}>{children}</UserContext.Provider>
}