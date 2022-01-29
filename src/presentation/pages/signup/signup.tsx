import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Styles from './signup-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'

type SignupProps = {
  validation: Validation
}

const Signup = ({ validation }: SignupProps) => {
  const [state, setState] = useState({
    isLoading: false,
    name: 'Campo obrigatório',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('email', state.name)
    })
  }, [state.name])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button disabled className={Styles.submit} type="submit" data-testid="submit">
            Entrar
          </button>
          <Link to="/login" className={Styles.link}>
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
