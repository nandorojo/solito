import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../global.css'
import { StylesProvider } from '../src/providers/StylesProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solito Teste',
  description: 'Gestão de salas e usuários',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  )
}
