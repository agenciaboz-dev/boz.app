import { useContext } from "react"
import PictureModalContext from "../contexts/pictureModalContext"

export const usePictureModal = () => {
    const { open, setOpen, setUrl, url } = useContext(PictureModalContext)

    const openModal = (url: string) => {
        setUrl(url)
        setOpen(true)
    }

    const close = () => {
        // setUrl("")
        setOpen(false)
    }

    return { isOpen: open, open: openModal, close, url }
}
