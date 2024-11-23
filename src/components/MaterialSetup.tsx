'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'

export const MaterialSetup = ({ children }: PropsWithChildren) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}
