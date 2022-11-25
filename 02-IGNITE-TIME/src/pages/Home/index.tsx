import {
  HandPalm,
  Play,
} from "phosphor-react"

import {
  FormProvider,
  useForm,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

import {
  createContext,
  useState,
} from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles"

import { NewCycleForm } from "./components/NewCyclesForm";
import { Countdown } from "./components/Countdown";

// controlled / unControlled

/**
* function register(name: string) {
*   return {
*     onChange: () => void,  
*     onBlur: () => void,  
*     onFocus: () => void,
*   }
* }
*/

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa a ser executada'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  
  const { handleSubmit, watch, reset } = newCycleForm
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  
  function markCurrentCyclesFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle;
        }
      }),
    )
  }
  
  function handleCreateNewCycle(data: NewCycleFormData)
  {
    const id = String(new Date().getTime())
    const newCycle: Cycle = 
    {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset();
  }
  
  function handleInterruptCycle()
  {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle;
      }
    }),
    )
    setActiveCycleId(null);
  }
  
  const task = watch('task')
  const isSubmitDisable = !task;
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCyclesFinished,
            amountSecondsPassed,
            setSecondsPassed
            }}
          >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          
          <Countdown />
        </CycleContext.Provider>
        
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}