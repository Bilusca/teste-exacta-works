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
import { parseDateString } from '@/lib/parseDateString'

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
  emissionDate: yup
    .date()
    .nullable()
    .typeError('Data de emissão obrigatória')
    .transform(parseDateString)
    .max(new Date(), 'Data inválida'),
  expedition: yup.string().required('Orgão expedidor é obrigatório'),
  gender: yup.string().required('Selecione um gênero'),
})

export function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ resolver: yupResolver(schema), mode: 'all' })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
                defaultValue=""
              >
                <option disabled value="">
                  Selecione um orgão expedidor
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </InputBase>
              {errors.expedition && (
                <ErrorMessage>{errors.expedition.message}</ErrorMessage>
              )}
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
              {errors.gender && (
                <ErrorMessage>{errors.gender.message}</ErrorMessage>
              )}
            </FormController>
          </InputContainer>
          <InputContainer centered>
            <SubmitButton type="submit" disabled={!isValid}>
              Continuar <CaretRight size={24} weight="duotone" />
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      </form>
    </RegistrationContainer>
  )
}
