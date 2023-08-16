import React, { useEffect, useState } from "react"
import { Avatar, Box, SxProps } from "@mui/material"
import { useImageUrl } from "../hooks/useImageUrl"
import { useCustomers } from "../hooks/useCustomers"

interface CustomerAvatarProps {
    customer: Customer
    sx?: SxProps
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ customer, sx }) => {
    const { getCustomerPic } = useImageUrl()
    const { customers } = useCustomers()

    const [url, setUrl] = useState(getCustomerPic(customer))

    useEffect(() => {
        setUrl((url) => `${url}?timestamp=${new Date().getTime()}`)
    }, [customer])

    return <Avatar src={url} sx={sx} variant="rounded" />
}
