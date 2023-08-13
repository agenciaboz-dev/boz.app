import { useContext } from "react"
import SearchContext from "../contexts/searchContext"

export const useSearch = () => {
    const searchContext = useContext(SearchContext)
    const { onSearch, setOnSearch, placeholder } = searchContext

    return { onSearch, setOnSearch, placeholder }
}
