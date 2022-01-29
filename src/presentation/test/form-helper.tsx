import faker from 'faker'
import { RenderResult, fireEvent } from '@testing-library/react'

export const testErrorWrapChildCount = (sut: RenderResult, field: string, count: number) => {
  const el = sut.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean) => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
