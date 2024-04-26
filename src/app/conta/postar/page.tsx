import ContaPhotoPostar from '@/components/ContaHeader/ContaPhotoPostar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Postar | Minha Conta',
}

export default async function PostarPage() {
  return <ContaPhotoPostar />
}
