import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { RoleContainer, RoleSkeletons } from "./RoleContainer"
import { NewButton } from "../../../components/NewButton"
import { useDepartments } from "../../../hooks/useDepartments"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NewUser } from "./NewUser"
import { Profile } from "./Profile"
import { useSearch } from "../../../hooks/useSearch"
import { useUser } from "../../../hooks/useUser"

interface UsersProps {
    user: User
}

export const Users: React.FC<UsersProps> = ({ user }) => {
    const navigate = useNavigate()

    const { departments, loading } = useDepartments()
    const { setOnSearch } = useSearch()
    const { list } = useUser()

    const [userList, setUserList] = useState(list)

    const handleNewUserClick = () => {
        navigate("/admin/users/new")
    }

    const handleSearch = (value: string) => {
        const result = list.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()))
        setUserList(result)
    }

    useEffect(() => {
        setUserList(list)
    }, [list])

    useEffect(() => {
        setOnSearch(() => handleSearch, "usuários")
    })

    return (
        <Routes>
            <Route
                index
                element={
                    <Box sx={{ padding: "2vw", width: "100%", gap: "1vw" }}>
                        <NewButton onClick={handleNewUserClick} bottom={"2vw"} right={"2vw"} />

                        {loading ? (
                            <RoleSkeletons />
                        ) : (
                            departments.map((department) => <RoleContainer key={department.id} department={department} users={userList} />)
                        )}
                    </Box>
                }
            />
            <Route path="/new" element={<NewUser user={user} />} />
            <Route path="/:username" element={<Profile user={user} />} />
        </Routes>
    )
}
