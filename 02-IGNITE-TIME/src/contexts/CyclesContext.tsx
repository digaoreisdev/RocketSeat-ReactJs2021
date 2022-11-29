import { createContext, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

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
  CreateNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider({
  children, }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  
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
  
  function CreateNewCycle(data: CreateCycleData)
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
    // reset()
  }
  
  function interruptCurrentCycle()
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
  
  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCyclesFinished,
        amountSecondsPassed,
        setSecondsPassed,
        CreateNewCycle,
        interruptCurrentCycle
        }}
    >
      
    </CycleContext.Provider>
  )
}