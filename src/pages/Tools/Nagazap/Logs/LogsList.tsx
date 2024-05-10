import React from "react"
import { Box, Grid, Paper } from "@mui/material"
import { LogContainer } from "./LogContainer"
import { FailedMessageLog, SentMessageLog } from "../../../../types/server/Meta/WhatsappBusiness/Logs"
import { FailedLogContainer } from "./FailedLogContainer"
import { Title } from "../../../Profile/UserComponents"

interface LogsListProps {
    list: SentMessageLog[] | FailedMessageLog[]
    type: "success" | "error"
}

export const LogsList: React.FC<LogsListProps> = ({ list, type }) => {
    return (
        <Grid item xs={1}>
            <Paper sx={{ flexDirection: "column", padding: "1vw", gap: "1vw" }}>
                <Title name={type == "success" ? "Enviadas" : "Falhas"} />
                {list.map((item) =>
                    type == "success" ? (
                        <LogContainer key={item.timestamp} log={item as SentMessageLog} />
                    ) : (
                        <FailedLogContainer key={item.timestamp} log={item as FailedMessageLog} />
                    )
                )}
            </Paper>
        </Grid>
    )
}
