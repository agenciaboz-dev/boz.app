import React, { useEffect, useState } from "react"
import { Box, CircularProgress, IconButton, MenuItem, TextField } from "@mui/material"
import { Subroute } from "../Subroute"
import { TaiTextField } from "../../../../components/TaiTextField"
import { Nagazap } from "../../../../types/server/class/Nagazap"
import { Refresh, Save } from "@mui/icons-material"
import { api } from "../../../../api"

interface OvenProps {
    nagazap?: Nagazap
    setNagazap: React.Dispatch<React.SetStateAction<Nagazap>>
}

export const Oven: React.FC<OvenProps> = ({ nagazap, setNagazap }) => {
    const [frequency, setFrequency] = useState(nagazap?.frequency || "")
    const [batchSize, setBatchSize] = useState(nagazap?.batchSize || 0)
    const [loading, setLoading] = useState(false)
    const [frequencyUnit, setFrequencyUnit] = useState<"mili" | "seg" | "min" | "hour">("mili")

    const textfield_size = 250

    const refresh = async () => {
        setLoading(true)

        try {
            const response = await api.get("/whatsapp")
            setNagazap(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const save = async (type: "frequency" | "batchSize", value: string | number) => {
        if (loading) return
        setLoading(true)
        try {
            let data: any = {}
            data[type] = value
            if (type == "frequency" && frequencyUnit !== "mili") {
                console.log(frequencyUnit)
                data[type] = ((value as number) * (frequencyUnit === "seg" ? 1000 : frequencyUnit === "min" ? 60000 : 3600000)).toString()
            }
            const response = await api.patch("/whatsapp", data)
            setNagazap(response.data)
            setFrequencyUnit("mili")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (nagazap) {
            setFrequency(nagazap.frequency)
            setBatchSize(nagazap.batchSize)
        }
    }, [nagazap])

    return (
        <Subroute
            title="Forno"
            right={
                <Box sx={{ gap: "1vw" }}>
                    <TaiTextField
                        label="Frequência"
                        value={frequency}
                        onChange={(event) => setFrequency(event.target.value)}
                        InputProps={{
                            sx: { width: textfield_size },
                            endAdornment: (
                                <>
                                    <TextField
                                        select
                                        variant="standard"
                                        value={frequencyUnit}
                                        // @ts-ignore
                                        onChange={(event) => setFrequencyUnit(event.target.value)}
                                        InputProps={{ sx: { marginLeft: "auto" } }}
                                    >
                                        <MenuItem value={"mili"}>Mili</MenuItem>
                                        <MenuItem value={"seg"}>Segundos</MenuItem>
                                        <MenuItem value="min">Minutos</MenuItem>
                                        <MenuItem value="hour">Horas</MenuItem>
                                    </TextField>
                                    <IconButton
                                        disabled={frequency == nagazap?.frequency && frequencyUnit == "mili"}
                                        onClick={() => save("frequency", frequency)}
                                    >
                                        <Save />
                                    </IconButton>
                                </>
                            ),
                        }}
                    />
                    <TaiTextField
                        label="Fornada"
                        value={batchSize}
                        type="number"
                        onChange={(event) => setBatchSize(Number(event.target.value))}
                        InputProps={{
                            sx: { width: textfield_size },
                            endAdornment: (
                                <IconButton disabled={batchSize == nagazap?.batchSize} onClick={() => save("batchSize", batchSize)}>
                                    <Save />
                                </IconButton>
                            ),
                        }}
                    />
                    <IconButton onClick={refresh} disabled={loading}>
                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : <Refresh />}
                    </IconButton>
                </Box>
            }
        ></Subroute>
    )
}
