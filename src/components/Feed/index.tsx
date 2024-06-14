'use client'

import photosGet, { Photo } from '@/actions/photos-get'
import FeedPhotos from './feed-photos'
import { useEffect, useRef, useState } from 'react'
import styles from './feed.module.css'
import Loading from '../Loading'

type FeedType = {
  photos: Photo[]
  user?: 0 | string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Feed({ photos, user }: FeedType) {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos)
  const [page, setPage] = useState(1)
  const [infinite, setInfinite] = useState(!(photos.length < 6))
  const [loading, setLoading] = useState(false)

  const fetching = useRef(false)
  function inifiteScroll() {
    console.log('aconteceu')
    if (fetching.current) return

    fetching.current = true
    setLoading(true)
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1)
      fetching.current = false
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (page === 1) return
    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        {
          page,
          total: 6,
          user: 0,
        },
        { cache: 'no-store' },
      )

      if (actionData && actionData.data !== null) {
        const { data } = actionData

        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data])
        if (data.length < 6) setInfinite(false)
      }
    }

    getPagePhotos(page)
  }, [page])

  useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', inifiteScroll)
      window.addEventListener('wheel', inifiteScroll)
    } else {
      window.removeEventListener('scroll', inifiteScroll)
      window.removeEventListener('wheel', inifiteScroll)
    }

    return () => {
      window.removeEventListener('scroll', inifiteScroll)
      window.removeEventListener('wheel', inifiteScroll)
    }
  }, [infinite])

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? (
          loading && <Loading />
        ) : (
          <p> Não existem mais postagens.</p>
        )}
      </div>
    </div>
  )
}
