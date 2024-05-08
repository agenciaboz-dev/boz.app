import React, { useState } from "react"
import { Box, Button, CircularProgress, Paper } from "@mui/material"
import { Title } from "../../Profile/UserComponents"
import { Nagazap } from "../../../types/server/class/Nagazap"
import { TaiTextField } from "../../../components/TaiTextField"
import { useFormik } from "formik"
import { api } from "../../../api"

interface TokenProps {
    nagazap?: Nagazap
    setNagazap: React.Dispatch<React.SetStateAction<Nagazap>>
}

export const Token: React.FC<TokenProps> = ({ nagazap, setNagazap }) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik<{ token: string }>({
        initialValues: { token: nagazap?.token || "" },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)
            try {
                const response = await api.patch("/whatsapp/token", values)
                setNagazap(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        enableReinitialize: true,
    })

    return (
        <Paper
            sx={{
                flexDirection: "column",
                gap: "2vw",
                padding: "2vw",
                width: "99%",
                bgcolor: "background.default",
                borderTopRightRadius: "2vw",
                overflowY: "auto",
            }}
        >
            <Title name={"Token"} />

            {nagazap ? (
                <form onSubmit={formik.handleSubmit} style={{ gap: "1vw", display: "flex" }}>
                    <TaiTextField label="Token" value={nagazap?.token} />
                    <Button type="submit" variant="contained">
                        {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "salvar"}
                    </Button>
                </form>
            ) : (
                <p>cadê o nagazap</p>
            )}
        </Paper>
    )
}
