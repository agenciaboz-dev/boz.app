import React from "react"
import { Box, Grid } from "@mui/material"
import { FailedMessageLog } from "../../../../types/server/Meta/WhatsappBusiness/Logs"
import { usePhoneMask } from "burgos-masks"
import { TaiTextField } from "../../../../components/TaiTextField"
import MaskedInputCerto from "../../../../components/MaskedInputCerto"

interface FailedLogContainerProps {
    log: FailedMessageLog
}

export const FailedLogContainer: React.FC<FailedLogContainerProps> = ({ log }) => {
    const mask = usePhoneMask()
    console.log(log)
    return (
        <Grid container columns={3} spacing={2}>
            <Grid item xs={1}>
                <TaiTextField
                    label={new Date(Number(log.timestamp)).toLocaleString("pt-br")}
                    value={log.number.slice(2)}
                    InputProps={{
                        inputComponent: MaskedInputCerto,
                        inputProps: { mask },
                        endAdornment: (
                            <Box
                                sx={{
                                    bgcolor: "error.main",
                                    width: "1vw",
                                    height: "1vw",
                                    borderRadius: "100%",
                                }}
                            />
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TaiTextField label="Erro" value={log.data.error.message} />
            </Grid>
        </Grid>
    )
}
