import ContaHeader from '@/components/ContaHeader'
import { ReactNode } from 'react'

export default async function ContaLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container">
      <ContaHeader />
      {children}
    </div>
  )
}
