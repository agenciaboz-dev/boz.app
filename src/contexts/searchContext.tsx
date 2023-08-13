import { Dispatch, SetStateAction, createContext, useState } from "react"
import React from "react"

interface SearchContextValue {
    onSearch: (value: string) => void
    setOnSearch: (value: (string: string) => void, placeholder: string) => void
    placeholder: string
}

interface SearchProviderProps {
    children: React.ReactNode
}

const SearchContext = createContext<SearchContextValue>({} as SearchContextValue)

export default SearchContext

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [onSearch, setOnSearch] = useState<(value: string) => void>(() => () => null)
    const [placeholder, setPlaceholder] = useState("")

    const onSearchChange = (value: (string: string) => void, placeholder: string) => {
        setOnSearch(value)
        setPlaceholder(placeholder)
    }

    React.useEffect(() => {
        console.log({ onSearch })
    }, [onSearch])

    return <SearchContext.Provider value={{ onSearch, setOnSearch: onSearchChange, placeholder }}>{children}</SearchContext.Provider>
}
