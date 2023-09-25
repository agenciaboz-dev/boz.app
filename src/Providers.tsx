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

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <SearchProvider>
                    <IoProvider>
                        <UserProvider>
                            <DepartmentsProvider>
                                <CustomersProvider>
                                    <ZapProvider>
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
                                    </ZapProvider>
                                </CustomersProvider>
                            </DepartmentsProvider>
                        </UserProvider>
                    </IoProvider>
                </SearchProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
