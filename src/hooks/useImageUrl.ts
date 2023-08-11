import { api } from "../api"

export const useImageUrl = () => {
    const getProfilePic = (user: User) => `${api.getUri().split("/api")[0]}/static/users/${user.id}/images/profilePic`

    return { getProfilePic }
}
