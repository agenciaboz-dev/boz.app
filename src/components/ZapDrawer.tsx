import React, { useEffect, useRef } from "react"
import { Avatar, Box, Drawer, IconButton, TextField } from "@mui/material"
import { useZap } from "../hooks/useZap"
import { backdropStyle } from "../style/backdrop"
import { textFieldStyle } from "../style/textfield"
import { Form, Formik, FormikHelpers } from "formik"
import SendIcon from "@mui/icons-material/Send"
import { Message } from "./Message"
import { useIo } from "../hooks/useIo"
import { usePictureModal } from "../hooks/usePictureModal"

interface ZapDrawerProps {}

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    useEffect(() => elementRef.current?.scrollIntoView())
    return <div ref={elementRef} />
}

export const ZapDrawer: React.FC<ZapDrawerProps> = ({}) => {
    const io = useIo()
    const picture = usePictureModal()
    const { drawer, currentChat: chat } = useZap()

    const handleClose = () => {
        drawer.close()
    }

    const handleMessageSubmit: (
        { message }: { message: string },
        bag: FormikHelpers<{
            message: string
        }>
    ) => void = ({ message }, bag) => {
        bag.resetForm()
        io.emit("message:new", { chat, message })
    }

    return (
        <Drawer
            anchor={"right"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "50vw", backgroundColor: "background.default" } }}
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
                <Box sx={{ gap: "2vw", alignItems: "center", height: "5vh" }}>
                    <Avatar
                        src={chat?.profilePic}
                        sx={{ width: "3vw", height: "3vw", bgcolor: "primary.main", cursor: "pointer" }}
                        onClick={() => picture.open(chat?.profilePic || "")}
                    />
                    <p style={{ fontWeight: "bold" }}>{chat?.name}</p>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: "80vh",
                        bgcolor: "background.default",
                        overflowY: "auto",
                        borderRadius: "0 1.5vw 0 1.5vw",
                        padding: "2vw",
                        color: "text.secondary",
                        flexDirection: "column",
                        gap: "0.25vw",

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
                                placeholder="envie uma mensagem"
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                autoComplete="off"
                                InputProps={{
                                    sx: { color: "primary.main", bgcolor: "background.default" },
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
