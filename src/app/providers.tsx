import type { ReactNode } from 'react'
import { ThemeProvider } from './ThemeContext'

type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
