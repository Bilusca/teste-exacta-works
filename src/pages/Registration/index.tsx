import { CaretRight } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  FormContainer,
  FormController,
  InputBase,
  RadioController,
  RegistrationContainer,
} from './styles'

enum GenderEnum {
  male = 'male',
  female = 'female',
}

type Inputs = {
  rg: string
  emissionDate: Date
  expedition: string
  gender: GenderEnum
}

export function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <RegistrationContainer>
      <h1>Dados pessoais</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormController>
            <label htmlFor="rg">Número do RG</label>
            <InputBase type="text" {...register('rg', { required: true })} />
          </FormController>
          <FormController>
            <label htmlFor="emissionDate">Data de emissão</label>
            <InputBase
              type="date"
              {...register('emissionDate', { required: true })}
            />
          </FormController>
          <FormController>
            <label htmlFor="expedition">Orgão expedidor</label>
            <InputBase
              as="select"
              {...register('expedition', { required: true })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </InputBase>
          </FormController>
          <FormController isRow>
            <RadioController>
              <input
                type="radio"
                id="male"
                value="male"
                {...register('gender', { required: true })}
              />
              <label htmlFor="male">Masculino</label>
            </RadioController>
            <RadioController>
              <input
                type="radio"
                id="female"
                value="female"
                {...register('gender', { required: true })}
              />
              <label htmlFor="female">Feminino</label>
            </RadioController>
          </FormController>
          <button type="submit">
            Continuar <CaretRight size={24} weight="duotone" />
          </button>
        </FormContainer>
      </form>
    </RegistrationContainer>
  )
}
