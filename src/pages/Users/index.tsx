import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useSearch } from "../../hooks/useSearch"
import { useUser } from "../../hooks/useUser"
import normalize from "../../tools/normalize"
import { Box, Paper, useMediaQuery } from "@mui/material"
import { UserList } from "../Admin/Users/UserList"
import { Profile } from "../Profile"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"

interface UsersProps {
    user: User
}

export const Users: React.FC<UsersProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const navigate = useNavigate()

    const { setOnSearch } = useSearch()
    const { list } = useUser()

    const [userList, setUserList] = useState(list)

    const handleSearch = (value: string) => {
        const result = list.filter((user) => normalize(user.name).includes(value))
        setUserList(result)
    }

    useEffect(() => {
        setUserList(list)
        setOnSearch(() => handleSearch, "usuários")
    }, [list])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Routes>
                <Route
                    index
                    element={
                        <Paper
                            elevation={0}
                            sx={{
                                // width: "100%",
                                gap: "2vw",
                                flexWrap: "wrap",
                                backgroundColor: "background.default",
                                margin: isMobile ? "0 0 0 2vw" : "2vw 2vw 0 2vw",
                                height: isMobile ? "100vh" : "85vh",
                            }}
                        >
                            <UserList list={userList} />
                        </Paper>
                    }
                />
                <Route path="/:username" element={<Profile user={user} admin />} />
            </Routes>
        </Box>
    )
}
