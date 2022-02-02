import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'

export const makeSignupValidation = () => {
  return ValidationComposite.build([
    ...Builder.field('name').min(5).required().build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').min(5).required().build(),
    ...Builder.field('passwordConfirmation').min(5).required().build()
  ])
}
