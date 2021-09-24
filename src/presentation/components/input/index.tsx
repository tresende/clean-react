import React from 'react'
import { InputHTMLAttributes } from 'react-router/node_modules/@types/react'
import Styles from './input-styles.scss'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ ...rest }: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => (event.target.readOnly = false)

  return (
    <div className={Styles.inputWrap}>
      <input {...rest} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Input
