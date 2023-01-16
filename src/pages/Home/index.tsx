import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
    CountDownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O intervalo precisa ser de no mínimo 5 minutos.")
        .max(60, "O intervalo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; //Inferindo automaticamente os campos do formulário como tipagem

export function Home() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            minutesAmount: 0,
            task: "",
        },
    });

    function handleCreateNewCycle(data: any) {
        // console.log(data);
        reset();
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
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
                        {...register("minutesAmount", {
                            valueAsNumber: true,
                            required: true,
                        })}
                    />
                    <span>+</span>
                    <p>minutos.</p>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}
