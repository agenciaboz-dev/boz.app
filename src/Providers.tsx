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
                                    <MenuDrawer />
                                    <UserDrawer />
                                    <Snackbar />
                                    <ConfirmDialog />
                                    {children}
                                </MenuProvider>
                            </ZapProvider>
                        </DepartmentsProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
