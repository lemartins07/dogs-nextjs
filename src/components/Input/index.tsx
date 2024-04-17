import React from 'react'
import styles from './input.module.css'

type InputProps = React.ComponentProps<'input'> & {
  label: string
  error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input type="text" className={styles.input} id={props.name} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
