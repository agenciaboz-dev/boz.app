import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Grid, IconButton, Paper, Skeleton } from "@mui/material"
import { Subroute } from "./Subroute"
import { api } from "../../../api"
import { NagazapPhoneNumber } from "../../../types/NagazapPhoneNumber"
import { Title } from "../../Profile/UserComponents"
import { Refresh } from "@mui/icons-material"

interface InfoProps {}

interface PhoneProps {
    nagaPhone: NagazapPhoneNumber
}

const NagaPhone: React.FC<PhoneProps> = ({ nagaPhone }) => {
    return (
        <Grid item xs={1}>
            <Paper sx={{ padding: "1vw", flexDirection: "column", gap: "1vw" }}>
                <Title name={nagaPhone.verified_name} />
                <Box>Número: {nagaPhone.display_phone_number}</Box>
                <Box sx={{ alignItems: "center", gap: "1vw" }}>
                    Confiabilidade:{" "}
                    <Box sx={{ borderRadius: "100%", width: "1vw", height: "1vw", bgcolor: nagaPhone.quality_rating.toLowerCase() }} />
                </Box>
            </Paper>
        </Grid>
    )
}

export const Info: React.FC<InfoProps> = ({}) => {
    const [loading, setLoading] = useState(true)
    const [phones, setPhones] = useState<NagazapPhoneNumber[]>([])

    const fetchInfo = async () => {
        setLoading(true)

        try {
            const response = await api.get("/whatsapp/info")
            console.log(response.data)
            setPhones(response.data.phone_numbers.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <Subroute
            title="Informações"
            right={
                <IconButton onClick={fetchInfo} disabled={loading}>
                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : <Refresh />}
                </IconButton>
            }
        >
            <Grid container columns={3} spacing={2}>
                {loading ? (
                    <Grid item xs={1}>
                        <Skeleton variant="rounded" animation="wave" sx={{ width: "100%", height: "9.5vw" }} />
                    </Grid>
                ) : (
                    phones.map((item) => <NagaPhone key={item.id} nagaPhone={item} />)
                )}
            </Grid>
        </Subroute>
    )
}
