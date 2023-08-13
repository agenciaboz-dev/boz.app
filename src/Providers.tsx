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

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        <DepartmentsProvider>
                            <ZapProvider>
                                <MenuProvider>
                                    <PictureModalProvider>
                                        <PictureModal />
                                        <MenuDrawer />
                                        <UserDrawer />
                                        <Snackbar />
                                        <ConfirmDialog />
                                        {children}
                                    </PictureModalProvider>
                                </MenuProvider>
                            </ZapProvider>
                        </DepartmentsProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
