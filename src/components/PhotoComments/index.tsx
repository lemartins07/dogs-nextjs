import { Comment } from '@/actions/photo-get'
import { useUser } from '@/context/user-context'
import { useEffect, useRef, useState } from 'react'
import styles from './photo-content.module.css'
import PhotoCommentsForms from '../PhotoCommentsForms'

export function PhotoComments(props: {
  single: boolean
  id: number
  comments: Comment[]
}) {
  const [comments, setComments] = useState(() => props.comments)
  const commentSection = useRef<HTMLUListElement>(null)
  const { user } = useUser()

  useEffect(() => {
    if (commentSection.current) {
      commentSection.current.scrollTop = commentSection.current.scrollHeight
    }
  }, [comments])

  return (
    <>
      <ul
        ref={commentSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForms
          id={props.id}
          single={props.single}
          setComments={setComments}
        />
      )}
    </>
  )
}
