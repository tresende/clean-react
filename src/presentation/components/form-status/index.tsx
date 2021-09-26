import React, { useContext } from 'react'

import Spinner from '@/presentation/components/spinner'
import Context from '@/presentation/contexts/form/fom-context'

import Styles from './form-status-styles.scss'

const FormStatus = () => {
  const { state } = useContext(Context)
  const { isLoading, errorMessage, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
