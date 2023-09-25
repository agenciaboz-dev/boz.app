import React from "react"
import { Box, Switch } from "@mui/material"
import CoffeeIcon from "@mui/icons-material/Coffee"
import { useCoffee } from "../../hooks/useCoffee"

interface CoffeeSwitchProps {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}

export const CoffeeSwitch: React.FC<CoffeeSwitchProps> = ({ top, left, right, bottom }) => {
    const coffee = useCoffee()

    return (
        <Box sx={{ position: "absolute", gap: "1vw", alignItems: "center", padding: "1vw", top, left, right, bottom }}>
            <Switch
                checked={coffee.wanting}
                icon={<CoffeeIcon />}
                checkedIcon={<CoffeeIcon />}
                color="warning"
                onChange={(_, checked) => coffee.toogleWanting(checked)}
            />
            <Box sx={{ color: "secondary.main" }}>
                <p>{coffee.wantingList.length} / 3</p>
            </Box>
        </Box>
    )
}
