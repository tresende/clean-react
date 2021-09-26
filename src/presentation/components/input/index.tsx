import React, { useContext, InputHTMLAttributes } from 'react'

import Context from '@/presentation/contexts/form/fom-context'
import Styles from './input-styles.scss'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${[props.name]}Error`]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => (event.target.readOnly = false)

  const getStatus = () => (error ? '🔴' : '🟢')

  const getTitle = () => error || 'Tudo Certo!'

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        data-testid={props.name}
        {...props}
        readOnly
        onFocus={enableInput}
        value={state[props.name]}
        onChange={handleChange}
      />
      <span data-testid={`${props.name}Status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
