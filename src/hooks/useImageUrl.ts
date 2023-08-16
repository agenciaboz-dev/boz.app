import { api } from "../api"

export const useImageUrl = () => {
    const getProfilePic = (user: User) => `${api.getUri().split("/api")[0]}/static/users/${user.id}/images/profilePic`
    const getCustomerPic = (customer: Customer) => `${api.getUri().split("/api")[0]}/static/customers/${customer.id}/images/profilePic`

    return { getProfilePic, getCustomerPic }
}
