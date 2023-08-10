import { ConfirmDialog, ConfirmDialogProvider } from 'burgos-confirm'
import { Snackbar, SnackbarProvider } from 'burgos-snackbar'
import React from 'react'
import { IoProvider } from './contexts/ioContext'
import { UserProvider } from './contexts/userContext'
import { UserDrawer } from "./components/UserDrawer"
import { MenuProvider } from "./contexts/menuContext"
import { MenuDrawer } from "./components/MenuDrawer"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        <MenuProvider>
                            <MenuDrawer />
                            <UserDrawer />
                            <Snackbar />
                            <ConfirmDialog />
                            {children}
                        </MenuProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}