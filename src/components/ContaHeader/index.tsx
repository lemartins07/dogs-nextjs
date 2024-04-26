'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './conta-header.module.css'
import useMedia from '@/hooks/use-media'
import FeedIcon from '@/icons/feed-icon'
import EstatisticasIcon from '@/icons/estatisticas-icon'
import AdicionarIcon from '@/icons/adicionar-icon'
import SairIcon from '@/icons/sair-icon'
import MenuItem from './components/menu-item'
import { useUser } from '@/context/user-context'
import logout from '@/actions/logout'

function getTitle(pathname: string) {
  switch (pathname) {
    case '/conta/postar':
      return 'Poste sua Foto'
    case '/conta/estatisticas':
      return 'Estatísticas'
    default:
      return 'Minha Conta'
  }
}

export default function ContaHeader() {
  const mobile = useMedia('(max-width): 40rem')
  const [mobileMenu, setMobileMenu] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  const { setUser } = useUser()
  async function handleLogout() {
    await logout()
    setUser(null)
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}
      >
        <MenuItem
          name="Minhas Fotos"
          href="/conta"
          icon={<FeedIcon />}
          isMobile={mobile}
        />

        <MenuItem
          name="Estatísticas"
          href="/conta/estatisticas"
          icon={<EstatisticasIcon />}
          isMobile={mobile}
        />

        <MenuItem
          name="Adicionar Foto"
          href="/conta/postar"
          icon={<AdicionarIcon />}
          isMobile={mobile}
        />

        <button onClick={handleLogout}>
          <SairIcon />
          {mobile && 'Sair'}
        </button>
      </nav>
    </header>
  )
}
