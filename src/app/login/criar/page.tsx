import Cadastro from '@/components/LoginForms/Cadastro'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crie sua conta',
  description: 'Crie sua conta no site Dogs.',
}

export default async function CriarPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Criar</h1>
      <Cadastro />
    </div>
  )
}
