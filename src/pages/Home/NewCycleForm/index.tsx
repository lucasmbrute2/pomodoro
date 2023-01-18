import { FormContainer, MinutesAmountInput, TaskInput } from "./style";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register("task", { required: true })}
            />
            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <span>-</span>
            <MinutesAmountInput
                id="minutesAmount"
                type="number"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register("minutesAmount", {
                    valueAsNumber: true,
                    required: true,
                })}
            />
            <span>+</span>
            <p>minutos.</p>
        </FormContainer>
    );
}
