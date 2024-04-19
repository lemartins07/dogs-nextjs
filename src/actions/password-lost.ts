'use server'

import { PASSWORD_LOST } from '@/app/functions/api'
import apiError from '@/app/functions/api-error'

export default async function passwordLost(state: object, formData: FormData) {
  const login = formData.get('login') as string | null
  const urlLost = formData.get('url') as string | null

  console.log(formData)
  try {
    if (!login) throw new Error('Preencha os dados.')

    const { url } = PASSWORD_LOST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        url: urlLost,
      }),
    })

    if (!response.ok) throw new Error('Email ou usuário não cadastrado.')

    return { data: null, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
