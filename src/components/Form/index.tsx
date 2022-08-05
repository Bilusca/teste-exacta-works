import { ChangeEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { parseCpf } from '@/lib/parseCpfString'
import { parseDateString } from '@/lib/parseDateString'
import { useDocumentContext } from '@/context/DocumentContext'
import { useStepContext } from '@/context/StepContex'

import {
  ErrorMessage,
  FormContainer,
  FormController,
  InfoContainer,
  InputBase,
  InputContainer,
  RadioController,
  SubmitButton,
} from './styles'
import { CaretRight, Check, CircleNotch } from 'phosphor-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { selectGender } from '@/lib/selectGender'

type Inputs = {
  name: string
  cpf: string
  amount: number
  installments: number
  rg: string
  emissionDate: Date
  expedition: string
  gender: 'male' | 'female'
  description: string
}

interface Document {
  name: string
  emissionDate: string | Date
  expedition: string
  rg: string
  gender: string
  description: string
  amount: number
  installments: number
  cpf: string
}

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  cpf: yup
    .string()
    .required('CPF obrigatório')
    .matches(/[0-9-.]/, 'O CPF não pode conter letras')
    .transform(parseCpf)
    .min(14, 'CPF Inválido')
    .max(14, 'CPF Inválido'),
  rg: yup
    .string()
    .required('RG obrigatório')
    .matches(/[0-9-.]/, 'O RG não pode conter letras'),
  emissionDate: yup
    .date()
    .nullable()
    .typeError('Data de emissão obrigatória')
    .transform(parseDateString)
    .max(new Date(), 'Data inválida'),
  expedition: yup.string().required('Orgão expedidor é obrigatório'),
  gender: yup.string().required('Selecione um gênero'),
  amount: yup
    .number()
    .typeError('Digite um valor')
    .min(1, 'Valor mínimo R$ 1')
    .required('O valor do emprestimo é obrigatório'),
  installments: yup
    .number()
    .typeError('Digite um valor')
    .min(1, 'Valor mínimo de parcelas é 1')
    .max(12, 'Valor Máximo de parcelas é 12')
    .required('O valor das parcelas são obrigatórios'),
  description: yup.string().required('Descrição é obrigatória'),
})

interface FormProps {
  loading: boolean
  onSubmitForm: (data: Inputs) => void
  document?: Document
}

export function Form({ loading, onSubmitForm, document }: FormProps) {
  const { expeditionOrg } = useDocumentContext()
  const { goToNextStep, selectedStep } = useStepContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    getFieldState,
    watch,
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'all',
    // @ts-ignore: Unreachable code error
    defaultValues: document ?? {},
  })

  function handleApplyMask(e: ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseCpf(e.target.value, e.target.value)
    e.target.value = parsedValue
  }

  function handleDisabled(field: 'amount' | 'installments') {
    const { error } = getFieldState(field)
    const value = watch(field)

    if (error) {
      return true
    }

    if (!value) {
      return true
    }
  }

  const submitForm: SubmitHandler<Inputs> = async (data) => {
    try {
      await onSubmitForm(data)
      reset()
    } catch {
      toast.error('Ocorreu um erro ao adiocionar')
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {selectedStep === 1 && (
        <FormContainer>
          <InputContainer>
            <FormController flex={1}>
              <label className={errors.amount ? 'error' : ''} htmlFor="amount">
                Valor
              </label>
              <InputBase
                type="number"
                {...register('amount')}
                className={errors.amount ? 'error' : ''}
                placeholder="Digite um valor"
              />
              {errors.amount && (
                <ErrorMessage>{errors.amount.message}</ErrorMessage>
              )}
            </FormController>
          </InputContainer>
          <InputContainer>
            <FormController flex={1}>
              <label
                className={errors.installments ? 'error' : ''}
                htmlFor="installments"
              >
                Parcelas
              </label>
              <InputBase
                type="number"
                {...register('installments')}
                className={errors.installments ? 'error' : ''}
                placeholder="Digite a quantidade de parcelas"
              />
              {errors.installments && (
                <ErrorMessage>{errors.installments.message}</ErrorMessage>
              )}
            </FormController>
          </InputContainer>
          <InputContainer centered>
            <SubmitButton
              type="button"
              onClick={() => goToNextStep()}
              disabled={
                handleDisabled('amount') || handleDisabled('installments')
              }
            >
              Continuar
              <CaretRight size={24} weight="duotone" />
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      )}
      {selectedStep === 2 && (
        <FormContainer>
          <InputContainer>
            <FormController flex={1}>
              <label className={errors.name ? 'error' : ''} htmlFor="name">
                Nome
              </label>
              <InputBase
                type="text"
                {...register('name')}
                className={errors.name ? 'error' : ''}
                placeholder="Digite seu Nome"
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FormController>
            <FormController>
              <label className={errors.cpf ? 'error' : ''} htmlFor="cpf">
                Cpf
              </label>
              <InputBase
                type="text"
                {...register('cpf')}
                className={errors.cpf ? 'error' : ''}
                placeholder="Digite seu cpf"
                onChange={handleApplyMask}
              />
              {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
            </FormController>
          </InputContainer>
          <InputContainer>
            <FormController flex={1}>
              <label
                className={errors.description ? 'error' : ''}
                htmlFor="description"
              >
                Motivo do empréstimo
              </label>
              <InputBase
                type="text"
                {...register('description')}
                className={errors.description ? 'error' : ''}
                placeholder="Motivo do emprestimo"
              />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </FormController>
          </InputContainer>
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
              <span>Sexo </span>
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
            <SubmitButton
              type="button"
              disabled={!isValid}
              onClick={() => goToNextStep()}
            >
              Continuar
              <CaretRight size={24} weight="duotone" />
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      )}
      {selectedStep === 3 && (
        <FormContainer>
          <InfoContainer>
            <div>
              <span>
                <b>Nome:</b> {getValues().name}
              </span>
              <span>
                <b>Cpf:</b> {getValues().cpf}
              </span>
              <span>
                <b>Rg:</b> {getValues().rg}
              </span>
              <span>
                <b>Data de emissão:</b>{' '}
                {format(new Date(getValues().emissionDate), 'dd/MM/yyyy')}
              </span>
              <span>
                <b>Sexo:</b> {selectGender(getValues().gender)}
              </span>
            </div>
            <div>
              <span>
                <b>Valor:</b> {getValues().amount}
              </span>
              <span>
                <b>Parcelas:</b> {getValues().installments}
              </span>
              <span>
                <b>Descrição:</b> {getValues().description}
              </span>
            </div>
          </InfoContainer>
          <InputContainer centered>
            <SubmitButton
              type="button"
              disabled={!isValid || !isDirty}
              onClick={() => goToNextStep()}
            >
              Continuar
              <CaretRight size={24} weight="duotone" />
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      )}
      {selectedStep === 4 && (
        <FormContainer>
          <InfoContainer>
            <p>
              Pronto, agora analisaremos seu pedido, retornaremos o mais rápido
              possível 🤑
            </p>
          </InfoContainer>
          <InputContainer centered>
            <SubmitButton
              type="submit"
              disabled={!isValid || !isDirty || loading}
            >
              Concluir pedido
              {loading ? (
                <CircleNotch className="animate" size={24} weight="duotone" />
              ) : (
                <Check size={24} weight="duotone" />
              )}
            </SubmitButton>
          </InputContainer>
        </FormContainer>
      )}
    </form>
  )
}
