'use server'

import { COMMENT_POST } from '@/app/functions/api'
import apiError from '@/app/functions/api-error'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { Comment } from './photo-get'

export default async function commentPost(state: object, formData: FormData) {
  const token = cookies().get('token')?.value
  const comment = formData.get('comment') as string | null
  const id = formData.get('id') as string | null

  try {
    if (!token || !comment || !id) throw new Error('Preencha os dados.')

    const { url } = COMMENT_POST(id)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })

    if (!response.ok) throw new Error('Erro ao efetuar o comentário')

    const data = (await response.json()) as Comment

    revalidateTag('comment')

    return { data, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
