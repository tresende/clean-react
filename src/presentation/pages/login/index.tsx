import React, { useState } from 'react'

import { Input, FormStatus, Footer, Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/fom-context'

import Styles from './login.styles.scss'

const Login = () => {
  const [state, setState] = useState({
    isLoading: false
  })

  const [errorState, setErrorState] = useState({
    email: 'Campo Obrigatório',
    password: 'Campo Obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button disabled data-testid="submit" className={Styles.submit} type="submit">
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
