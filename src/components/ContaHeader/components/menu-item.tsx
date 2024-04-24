import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type MenuItemProps = {
  icon: ReactNode
  isMobile: boolean
  href: string
  name: string
}

export default function MenuItem({
  icon,
  isMobile,
  href,
  name,
}: MenuItemProps) {
  const pathname = usePathname()

  return (
    <Link href={href} className={pathname === href ? 'active' : ''}>
      {icon}
      {isMobile && name}
    </Link>
  )
}
