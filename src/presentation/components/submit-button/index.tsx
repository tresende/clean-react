import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'
import Styles from './submit-button.scss'

export type SubmitButtonProps = {
  text: string
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  const { state } = useContext(Context)

  return (
    <button disabled={state.isFormInvalid} className={Styles.submit} type="submit" data-testid="submit">
      {text}
    </button>
  )
}

export default SubmitButton
