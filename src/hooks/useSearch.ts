import { useContext } from "react"
import SearchContext from "../contexts/searchContext"

export const useSearch = () => {
    const searchContext = useContext(SearchContext)
    const { onSearch, setOnSearch } = searchContext

    return { onSearch, setOnSearch }
}
