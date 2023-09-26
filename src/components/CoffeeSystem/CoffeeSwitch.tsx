import React from "react"
import { Box, CircularProgress, IconButton, Switch } from "@mui/material"
import CoffeeIcon from "@mui/icons-material/Coffee"
import { useCoffee } from "../../hooks/useCoffee"
import CasinoIcon from "@mui/icons-material/Casino"
import { useUser } from "../../hooks/useUser"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { useIo } from "../../hooks/useIo"

interface CoffeeSwitchProps {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}

export const CoffeeSwitch: React.FC<CoffeeSwitchProps> = ({ top, left, right, bottom }) => {
    const coffee = useCoffee()
    const io = useIo()
    const { user, updateStatus } = useUser()

    const handleFinishCoffee = () => {
        io.emit("coffee:ready")
        updateStatus(1)
    }

    return (
        <Box sx={{ position: "absolute", gap: "1vw", alignItems: "center", padding: "1vw", top, left, right, bottom }}>
            <Switch
                checked={coffee.wanting}
                icon={<CoffeeIcon />}
                checkedIcon={<CoffeeIcon />}
                color={coffee.making ? "warning" : "success"}
                onChange={(_, checked) => coffee.toogleWanting(checked)}
                disabled={coffee.making || coffee.lottery}
            />
            <Box sx={{ color: "secondary.main", gap: "2vw", alignItems: "center" }}>
                <p>{coffee.wantingList.length} / 3</p>
                {coffee.lottery ? (
                    <Box sx={{ gap: "1vw", alignItems: "center" }}>
                        <CasinoIcon />
                        <p>{coffee.maker?.name.split(" ")[0] || coffee.timer}</p>
                    </Box>
                ) : (
                    coffee.maker && (
                        <Box sx={{ gap: "1vw", alignItems: "center" }}>
                            <p>{coffee.maker.name.split(" ")[0]}</p>
                            {coffee.maker.id == user?.id ? (
                                <IconButton onClick={handleFinishCoffee}>
                                    <ThumbUpIcon />
                                </IconButton>
                            ) : (
                                <CircularProgress size="1.5rem" color="warning" />
                            )}
                        </Box>
                    )
                )}
            </Box>
        </Box>
    )
}
