import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: () => JSX.Element
}

const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
