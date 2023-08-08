import { useContext } from 'react'
import UserContext from '../contexts/userContext'

export const useUser = () => {
    const userContext = useContext(UserContext);
    const user = userContext.user
    const setUser = userContext.setUser

    return {user, setUser}
}