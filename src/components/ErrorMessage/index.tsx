import styles from './error-message.module.css'

type ErrorMessageProps = { error: string }

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error === '') return null
  return <p className={styles.error}>{error}</p>
}
