import { useContext } from "react"
import CoffeeContext from "../contexts/coffeeContext"
import { useIo } from "./useIo"
import { useUser } from "./useUser"

export const useCoffee = () => {
    const io = useIo()
    const { user } = useUser()
    const coffeeContext = useContext(CoffeeContext)
    const { wanting, setWanting, wantingList, openModal, setOpenModal, maker, timer, making, lottery } = coffeeContext

    const modal = {
        open: openModal,
        setOpen: setOpenModal,
    }

    const toogleWanting = (checked: boolean) => {
        io.emit("coffee:wanting", { user, wanting: checked })
        setWanting(checked)
    }

    return { wanting, toogleWanting, wantingList, modal, maker, timer, making, lottery }
}
