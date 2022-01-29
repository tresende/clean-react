import React from 'react'
import { Signup } from '@/presentation/pages'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: () => JSX.Element
}

const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
