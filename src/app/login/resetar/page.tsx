import ResetarSenha from '@/components/LoginForms/ResetarSenha'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resetar a senha | Dogs',
  description: 'Resete a sua senha',
}

type ResetarSearchParams = {
  searchParams: {
    key: string
    login: string
  }
}

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <ResetarSenha keyToken={searchParams.key} login={searchParams.login} />
    </div>
  )
}
