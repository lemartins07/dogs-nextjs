import type { Metadata } from 'next'
import './globals.css'
import { typeSecond } from './functions/fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import userGet from '@/actions/user-get'
import { UserContextProvider } from '@/context/user-context'

export const metadata: Metadata = {
  title: 'Dogs Next',
  description: 'Rede social para cachorros',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: user } = await userGet()

  return (
    <html lang="pt-BR" className={typeSecond.variable}>
      <body>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  )
}
