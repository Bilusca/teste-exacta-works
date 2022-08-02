import { CaretRight } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  ErrorMessage,
  FormContainer,
  FormController,
  InputBase,
  InputContainer,
  RadioController,
  RegistrationContainer,
  SubmitButton,
} from './styles'

type Inputs = {
  rg: string
  emissionDate: Date
  expedition: string
  gender: 'male' | 'female'
}

const schema = yup.object({
  rg: yup
    .string()
    .required('RG obrigatório')
    .matches(/[0-9]/, 'O RG não pode conter letras'),
  emissionDate: yup.date().required('Data de emissão obrigatório'),
  expedition: yup.string().required(),
  gender: yup.string().required(),
})

export function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(errors)

  return (
    <RegistrationContainer>
      <h1>Dados pessoais</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <InputContainer>
            <FormController>
              <label htmlFor="rg">Número do RG</label>
              <InputBase
                type="text"
                {...register('rg')}
                className={errors.rg ? 'error' : ''}
              />
              {errors.rg && <ErrorMessage>{errors.rg.message}</ErrorMessage>}
            </FormController>
            <FormController>
              <label htmlFor="emissionDate">Data de emissão</label>
              <InputBase
                type="date"
                {...register('emissionDate')}
                className={errors.emissionDate ? 'error' : ''}
              />
              {errors.emissionDate && (
                <ErrorMessage>{errors.emissionDate.message}</ErrorMessage>
              )}
            </FormController>
            <FormController>
              <label htmlFor="expedition">Orgão expedidor</label>
              <InputBase
                as="select"
                {...register('expedition')}
                className={errors.expedition ? 'error' : ''}
              >
                <option selected disabled>
                  Selecione um orgão
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </InputBase>
            </FormController>
          </InputContainer>
          <InputContainer>
            <FormController isRow>
              <span>Sexo</span>
              <RadioController>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  {...register('gender')}
                />
                <label htmlFor="male">Masculino</label>
              </RadioController>
              <RadioController>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  {...register('gender')}
                />
                <label htmlFor="female">Feminino</label>
              </RadioController>
            </FormController>
          </InputContainer>
          <InputContainer centered>
            <SubmitButton type="submit">
              Continuar <CaretRight size={24} weight="duotone" />
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      </form>
    </RegistrationContainer>
  )
}
