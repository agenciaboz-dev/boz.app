import { ConfirmDialog, ConfirmDialogProvider } from 'burgos-confirm'
import { Snackbar, SnackbarProvider } from 'burgos-snackbar'
import React from 'react'
import { IoProvider } from './contexts/ioContext'
import { UserProvider } from './contexts/userContext'

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers:React.FC<ProvidersProps> = ({ children }) => {
    
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <UserProvider>

                <IoProvider>
                        <Snackbar />
                        <ConfirmDialog />
                    {children}
                </IoProvider>
                </UserProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}