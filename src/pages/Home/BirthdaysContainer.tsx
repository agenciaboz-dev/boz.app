import React from "react"
import { Box } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"
import { useUser } from "../../hooks/useUser"
import { sortBirthday } from "../../tools/sortBirthday"
import { UserAvatar } from "../Admin/Stats/StatusLogs"

interface BirthdayContainerProps {
    user: User
}

export const BirthdaysContainer: React.FC<BirthdayContainerProps> = ({ user }) => {
    const { list } = useUser()
    const next_birthdays = sortBirthday(list)
    // console.log(next_birthdays)

    return (
        <ContainerWrapper>
            <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Aniversários</Box>
            <Box sx={{ flexDirection: "column" }}>
                {next_birthdays.map((user, index) => {
                    const real_birthdate = new Date(user.birth)
                    real_birthdate.setDate(new Date(user.birth).getDate() + 1)
                    return (
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", fontWeight: index === 0 ? "bold" : "" }} key={user.id}>
                            <UserAvatar user={user} />
                            <Box>{real_birthdate.toLocaleDateString("pt-br", { day: "2-digit", month: "long" })}</Box>
                        </Box>
                    )
                })}
            </Box>
        </ContainerWrapper>
    )
}
