import React from 'react'
import faker from 'faker'
import { fireEvent, render } from '@testing-library/react'

import Input from './'
import Context from '@/presentation/contexts/form/form-context'

const field = faker.database.column()

const makeSut = () => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={field} />
    </Context.Provider>
  )
}
describe('input', () => {
  test('should begin with readonly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })

  test('should toggle readonly on focus', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBeFalsy()
  })
})
