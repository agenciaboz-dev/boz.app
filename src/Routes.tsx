import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { useUser } from "./hooks/useUser"
import { WildCard } from "./pages/WildCard"
import { Zap } from "./pages/Zap"
import { Admin } from "./pages/Admin"
import { Customers } from "./pages/Customers"
import { Profile } from "./pages/Profile"
import { Users } from "./pages/Users"
import { Tools } from "./pages/Tools"
import { CheckElectronVersion } from "./components/CheckElectronVersion"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        <>
            <CheckElectronVersion />
            <ReactRoutes>
                <Route index element={<Home user={user} />} />
                <Route path="/profile/:username?" element={<Profile user={user} />} />
                <Route path="/zap" element={<Zap user={user} />} />
                <Route path="/customers/*" element={<Customers user={user} />} />
                <Route path="/users/*" element={<Users user={user} />} />
                <Route path="/tools/*" element={<Tools user={user} />} />
                <Route path="/admin/*" element={<Admin user={user} />} />
                <Route path="*" element={<WildCard />} />
            </ReactRoutes>
        </>
    ) : (
        <ReactRoutes>
            <Route index element={<Login />} />
            <Route path="*" element={<Login />} />
            {/* <Route path="signup" element={<Signup />} /> */}
        </ReactRoutes>
    )
}
