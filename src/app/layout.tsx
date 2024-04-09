import type { Metadata } from 'next'
import './globals.css'
import { typeSecond } from './functions/fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Dogs Next',
  description: 'Rede social para cachorros',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={typeSecond.variable}>
      <body>
        <div className="App">
          <Header />
          <main className="AppBody">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
