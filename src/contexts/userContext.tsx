import { createContext, useState } from 'react';
import React from 'react';

export interface User {
    
}

interface UserContextValue {
    user: User|null;
    setUser: (user:User|null) => void;
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default UserContext;

export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User|null>(null)

    return (
         <UserContext.Provider value={{user, setUser}}>
              {children}
         </UserContext.Provider>
    )
}