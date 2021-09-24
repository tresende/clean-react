import React from 'react'
import { render } from '@testing-library/react'

import Login from '.'

describe('Login Component', () => {
  test('Should start with inital state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    const button = getByTestId('submit') as HTMLButtonElement
    const emailStatus = getByTestId('emailStatus')
    const passwordStatus = getByTestId('passwordStatus')

    expect(errorWrap.childElementCount).toBe(0)
    expect(button.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
