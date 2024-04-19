import EsqueceuSenha from '@/components/LoginForms/EsqueceuSenha'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Esqueceu a senha | Dogs',
  description: 'Recupere a sua senha',
}

export default async function EsqueceuSenhaPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <EsqueceuSenha />
    </div>
  )
}
