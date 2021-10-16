import React from 'react'
import { render } from '@testing-library/react'

import Input from './'
import Context from '@/presentation/contexts/form/form-context'

describe('input', () => {
  test('should begin with readonly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })
})
