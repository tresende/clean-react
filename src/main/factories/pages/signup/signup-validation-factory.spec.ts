import { makeSignupValidation } from './signup-validation-factory'
import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'

describe('SignupValidationFactory', () => {
  test('Should make validation composite with correct validations', () => {
    const compose = makeSignupValidation()
    expect(compose).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').min(5).required().build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').min(5).required().build(),
        ...Builder.field('passwordConfirmation').min(5).required().build()
      ])
    )
  })
})
