import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = () => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').min(5).required().build()
  ])
}
