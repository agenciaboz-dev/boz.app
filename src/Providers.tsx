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
                <UserProvider>
                    <MenuProvider>
                        <IoProvider>
                            <MenuDrawer />
                            <UserDrawer />
                            <Snackbar />
                            <ConfirmDialog />
                            {children}
                        </IoProvider>
                    </MenuProvider>
                </UserProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}