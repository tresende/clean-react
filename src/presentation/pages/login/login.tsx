import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Styles from './login-styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components'

type Props = {
  validation: Validation
  saveAccessToken: SaveAccessToken
  authentication: Authentication
}

const Login = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
    isFormInvalid: false
  })

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)

    const isFormInvalid = !!emailError || !!passwordError

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
