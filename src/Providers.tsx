import { ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import React from "react"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { UserDrawer } from "./components/UserDrawer"
import { MenuProvider } from "./contexts/menuContext"
import { MenuDrawer } from "./components/MenuDrawer"
import { ZapProvider } from "./contexts/zapContext"
import { DepartmentsProvider } from "./contexts/departmentsContext"
import { ConfirmDialog } from "./components/ConfirmDialog"
import { PictureModalProvider } from "./contexts/pictureModalContext"
import { PictureModal } from "./components/PictureModal"
import { SearchProvider } from "./contexts/searchContext"
import { CustomersProvider } from "./contexts/customersContext"
import { ServiceModal } from "./components/ServiceModal"
import { RoleModal } from "./components/RoleModal"
import { CoffeeProvider } from "./contexts/coffeeContext"
import { CoffeeModal } from "./components/CoffeeSystem/CofffeModal"
import { GoogleOAuthProvider } from "@react-oauth/google"
import google_client_secret from "./api/google_client_secret.json"
import { GoogleProvider } from "./contexts/googleContext"
import { WarningsProvider } from "./contexts/warningsContext"
import { WakeupProvider } from "./contexts/wakeupContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <GoogleProvider>
                        <GoogleOAuthProvider clientId={google_client_secret.web.client_id}>
                            <SearchProvider>
                                <UserProvider>
                                    <DepartmentsProvider>
                                        <CustomersProvider>
                                            <ZapProvider>
                                                <WarningsProvider>
                                                    <WakeupProvider>
                                                        <MenuProvider>
                                                            <PictureModalProvider>
                                                                <CoffeeProvider>
                                                                    <RoleModal />
                                                                    <ServiceModal />
                                                                    <PictureModal />
                                                                    <MenuDrawer />
                                                                    <UserDrawer />
                                                                    <Snackbar />
                                                                    <ConfirmDialog />
                                                                    <CoffeeModal />
                                                                    {children}
                                                                </CoffeeProvider>
                                                            </PictureModalProvider>
                                                        </MenuProvider>
                                                    </WakeupProvider>
                                                </WarningsProvider>
                                            </ZapProvider>
                                        </CustomersProvider>
                                    </DepartmentsProvider>
                                </UserProvider>
                            </SearchProvider>
                        </GoogleOAuthProvider>
                    </GoogleProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
