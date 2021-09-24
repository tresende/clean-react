import React, { useContext, InputHTMLAttributes } from 'react'

import Context from '@/presentation/contexts/form/fom-context'
import Styles from './input-styles.scss'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
  const { errorState } = useContext(Context)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => (event.target.readOnly = false)

  const getStatus = () => {
    return '🔴'
  }

  const getTitle = () => {
    return error
  }

  const error = errorState[props.name]
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}Status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
