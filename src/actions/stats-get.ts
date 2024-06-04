'use server'

import { STATS_GET } from '@/app/functions/api'
import apiError from '@/app/functions/api-error'
import { cookies } from 'next/headers'

export type StatsData = {
  id: number
  title: string
  acessos: string
}

export default async function statsGet() {
  try {
    const token = cookies().get('token')?.value
    if (!token) throw new Error('Acesso negado.')
    const { url } = STATS_GET()
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 5,
      },
    })
    if (!response.ok) throw new Error('Erro ao buscar os dados.')
    const data = (await response.json()) as StatsData[]
    return { data, ok: true, error: '' }
  } catch (error) {
    return apiError(error)
  }
}
