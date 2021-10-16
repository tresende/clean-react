import { makeLoginValidation } from './login-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make validation composite with correct validations', () => {
    const compose = makeLoginValidation()
    expect(compose).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').min(5).required().build()
      ])
    )
  })
})
