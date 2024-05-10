import React from "react"
import { Box } from "@mui/material"
import { SentMessageLog } from "../../../../types/server/Meta/WhatsappBusiness/Logs"
import { TaiTextField } from "../../../../components/TaiTextField"
import { usePhoneMask } from "burgos-masks"
import MaskedInputCerto from "../../../../components/MaskedInputCerto"

interface LogContainerProps {
    log: SentMessageLog
}

export const LogContainer: React.FC<LogContainerProps> = ({ log }) => {
    const mask = usePhoneMask()
    return (
        <Box sx={{}}>
            <TaiTextField
                label={new Date(Number(log.timestamp)).toLocaleString("pt-br")}
                value={log.data.contacts[0].wa_id.slice(2)}
                InputProps={{
                    inputComponent: MaskedInputCerto,
                    inputProps: { mask },
                    endAdornment: (
                        <Box
                            sx={{
                                bgcolor: log.data.messages[0].message_status == "accepted" ? "success.main" : "warning.main",
                                width: "1vw",
                                height: "1vw",
                                borderRadius: "100%",
                            }}
                        />
                    ),
                }}
            />
        </Box>
    )
}
