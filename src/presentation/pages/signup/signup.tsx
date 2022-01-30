import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Styles from './signup-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type SignupProps = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup = ({ validation, addAccount, saveAccessToken }: SignupProps) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const isValidButton =
    !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError || !!state.nameError

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (
        state.isLoading ||
        state.emailError ||
        state.passwordError ||
        state.passwordError ||
        state.passwordConfirmationError
      ) {
        return
      }
      setState({ ...state, isLoading: true })
      const { accessToken } = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      saveAccessToken.save(accessToken)
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
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button disabled={isValidButton} className={Styles.submit} type="submit" data-testid="submit">
            Entrar
          </button>
          <Link replace data-testid="login-link" to="/login" className={Styles.link}>
            Voltar para o login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
