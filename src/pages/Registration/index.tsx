import { CaretRight, CircleNotch } from 'phosphor-react'
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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { Steps } from '@/components/Steps'

type Inputs = {
  rg: string
  emissionDate: Date
  expedition: string
  gender: 'male' | 'female'
}

type ExpeditionOrg = {
  label: string
  value: string
}

type ReponseProps = {
  orgao_emissor: ExpeditionOrg[]
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
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(schema), mode: 'all' })
  const [expeditionOrg, setExpeditionOrg] = useState<ExpeditionOrg[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    axios.get<ReponseProps>('data.json').then((response) => {
      setExpeditionOrg(response.data.orgao_emissor)
    })
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    try {
      const response = await api.post('documents', data)

      reset()
      toast.success(response.data.response)
    } catch {
      toast.error('Não foi possível cadastrar o documento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegistrationContainer>
      <Steps />
      <h1>Dados pessoais</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <InputContainer>
            <FormController flex={1}>
              <label className={errors.rg ? 'error' : ''} htmlFor="rg">
                Número do RG
              </label>
              <InputBase
                type="text"
                {...register('rg')}
                className={errors.rg ? 'error' : ''}
                placeholder="Digite seu RG"
              />
              {errors.rg && <ErrorMessage>{errors.rg.message}</ErrorMessage>}
            </FormController>
            <FormController>
              <label
                className={errors.emissionDate ? 'error' : ''}
                htmlFor="emissionDate"
              >
                Data de emissão
              </label>
              <InputBase
                type="date"
                {...register('emissionDate')}
                className={errors.emissionDate ? 'error' : ''}
                placeholder="Data de emissão do documento"
              />
              {errors.emissionDate && (
                <ErrorMessage>{errors.emissionDate.message}</ErrorMessage>
              )}
            </FormController>
            <FormController>
              <label
                className={errors.expedition ? 'error' : ''}
                htmlFor="expedition"
              >
                Orgão expedidor
              </label>
              <InputBase
                as="select"
                {...register('expedition')}
                className={errors.expedition ? 'error' : ''}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione um orgão expedidor
                </option>
                {!!expeditionOrg &&
                  expeditionOrg.map((org) => (
                    <option key={org.value} value={org.value}>
                      {org.label}
                    </option>
                  ))}
              </InputBase>
              {errors.expedition && (
                <ErrorMessage>{errors.expedition.message}</ErrorMessage>
              )}
            </FormController>
          </InputContainer>
          <InputContainer centered>
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
            <SubmitButton type="submit" disabled={!isValid || loading}>
              Continuar
              {loading ? (
                <CircleNotch className="animate" size={24} weight="duotone" />
              ) : (
                <CaretRight size={24} weight="duotone" />
              )}
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      </form>
    </RegistrationContainer>
  )
}
