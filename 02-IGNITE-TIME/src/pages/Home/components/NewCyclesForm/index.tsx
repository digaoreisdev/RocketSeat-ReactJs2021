import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CyclesContext";

import {
  useForm,
  useFormContext
} from "react-hook-form";

import {
  FormContainer,
  MinutesAmountInput,
  TaskInput
} from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto1" />
        <option value="Projeto2" />
        <option value="Projeto3" />
        <option value="Banana" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}