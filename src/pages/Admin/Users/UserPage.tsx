import React from "react"
import { Box } from "@mui/material"
import { Header } from "../../../components/Header"

interface UserPageProps {
    currentUser: User
    user?: User
}

export const UserPage: React.FC<UserPageProps> = ({ currentUser, user }) => {
    const initialValues: UserForm = {
        name: "",
        email: "",
        username: "",
        cpf: "",
        birth: "",
        role: 0,
    }

    const handleSubmit = (values: UserForm) => {}

    return (
        <Box sx={{}}>
            <Header user={currentUser} />
        </Box>
    )
}
