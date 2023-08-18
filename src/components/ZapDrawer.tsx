import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Drawer, IconButton, TextField, Checkbox } from "@mui/material"
import { useZap } from "../hooks/useZap"
import { backdropStyle } from "../style/backdrop"
import { textFieldStyle } from "../style/textfield"
import { Form, Formik, FormikHelpers } from "formik"
import SendIcon from "@mui/icons-material/Send"
import CancelIcon from '@mui/icons-material/Cancel';
import { Message } from "./Message"
import { useIo } from "../hooks/useIo"
import { usePictureModal } from "../hooks/usePictureModal"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useUser } from "../hooks/useUser"
import { useMediaQuery } from "react-responsive"

interface ZapDrawerProps {}

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    useEffect(() => elementRef.current?.scrollIntoView())
    return <div ref={elementRef} />
}

export const ZapDrawer: React.FC<ZapDrawerProps> = ({}) => {
    const isMobile = useMediaQuery({maxWidth: 600})

    const io = useIo()
    const picture = usePictureModal()
    const localStorage = useLocalStorage()

    const { drawer, currentChat: chat } = useZap()
    const { user, firstname } = useUser()

    const [sign, setSign] = useState(!!localStorage.get("boz:zap:sign"))

    const handleClose = () => {
        drawer.close()
    }

    const handleSignCheckbox = (checked: boolean) => {
        setSign(checked)
        localStorage.set("boz:zap:sign", checked)
    }

    const handleMessageSubmit: (
        { message }: { message: string },
        bag: FormikHelpers<{
            message: string
        }>
    ) => void = (data, bag) => {
        bag.resetForm()
        let message = data.message
        if (sign) {
            message += "\n\n"
            message += `${firstname} - ${user?.department.name}`
        }

        io.emit("message:new", { chat, message })
    }

    return (
        <Drawer
            anchor={ isMobile ? "top" : "right"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: isMobile ? "100vw" : "50vw", backgroundColor: "background.default" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
        >
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    height: "100vh",
                    padding: "1vw",
                    color: "secondary.main",
                    gap: "1vw",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ gap: "2vw", alignItems: "center", height: isMobile ? "7vh" : "5vh", padding: isMobile ? "2vw" : "" }}>
                    <Avatar
                        src={chat?.profilePic}
                        sx={{ width: isMobile ? "12vw" : "3vw", height: isMobile ? "12vw" : "3vw", bgcolor: "primary.main", cursor: "pointer" }}
                        onClick={() => picture.open(chat?.profilePic || "")}
                    />
                    <p style={{ fontWeight: "bold" }}>{chat?.name}</p>
                    <IconButton sx={{ color: "white", marginLeft: "auto", padding: isMobile ? "0" : "" }} onClick={() => handleClose()}>
                        <CancelIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: "80vh",
                        bgcolor: "background.default",
                        overflowY: "auto",
                        borderRadius: isMobile ? "0 3vw 0 3vw" : "0 1.5vw 0 1.5vw",
                        padding: "2vw",
                        color: "text.secondary",
                        flexDirection: "column",
                        gap: isMobile ? "2.5vw" : "0.25vw",

                        "::-webkit-scrollbar-thumb": {
                            backgroundColor: "primary.main",
                        },
                    }}
                >
                    {chat?.messages?.map((message) => (
                        <Message key={message.id._serialized} message={message} />
                    ))}
                    <AlwaysScrollToBottom />
                </Box>
                <Formik initialValues={{ message: "" }} onSubmit={handleMessageSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField
                                placeholder="Envie uma mensagem"
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                autoComplete="off"
                                InputProps={{
                                    sx: { color: "primary.main", bgcolor: "background.default", paddingLeft: "0", paddingRight: "0", },
                                    startAdornment: (
                                        <Checkbox title="assinar mensagem" checked={sign} onChange={(_, checked) => handleSignCheckbox(checked)} />
                                    ),
                                    endAdornment: (
                                        <IconButton color="primary" type="submit">
                                            <SendIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Form>
                    )}
                </Formik>
            </Box>
        </Drawer>
    )
}
