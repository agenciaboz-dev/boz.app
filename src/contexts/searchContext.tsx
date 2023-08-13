import { Dispatch, SetStateAction, createContext, useState } from "react"
import React from "react"

interface SearchContextValue {
    onSearch: (value: string) => void
    setOnSearch: React.Dispatch<React.SetStateAction<(value: string) => void>>
}

interface SearchProviderProps {
    children: React.ReactNode
}

const SearchContext = createContext<SearchContextValue>({} as SearchContextValue)

export default SearchContext

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [onSearch, setOnSearch] = useState<(value: string) => void>(() => () => null)

    React.useEffect(() => {
        console.log({ onSearch })
    }, [onSearch])

    return <SearchContext.Provider value={{ onSearch, setOnSearch }}>{children}</SearchContext.Provider>
}
