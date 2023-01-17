import { HandPalm, Play } from "phosphor-react";
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
    StopCountdownButton,
    TaskInput,
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O intervalo precisa ser de no mínimo 5 minutos.")
        .max(60, "O intervalo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; //Inferindo automaticamente os campos do formulário como tipagem

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleID] = useState<string | null>(null);
    const [amoutSecondsPassesd, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                );

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) =>
                        state.map((cycle) => {
                            if (cycle.id === activeCycleId) {
                                return { ...cycle, finishedDate: new Date() };
                            } else {
                                return cycle;
                            }
                        })
                    );
                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId]);

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

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interrupedDate: new Date() };
                } else {
                    return cycle;
                }
            })
        );
        setActiveCycleID(null);
    }
    console.log(cycles);

    function handleCreateNewCycle(data: NewCycleFormData) {
        setAmountSecondsPassed(0);
        const id = new Date().getTime().toString();
        const newCycle: Cycle = {
            id,
            minutesAmount: data.minutesAmount,
            task: data.task,
            startDate: new Date(),
        };

        setCycles((prev) => [...prev, newCycle]);
        setActiveCycleID(id);
        reset();
    }

    const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassesd : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    const task = watch("task");
    const isSubmitDisabled = !task;

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                {activeCycle ? (
                    <StopCountdownButton
                        onClick={handleInterruptCycle}
                        type="button"
                    >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton
                        disabled={isSubmitDisabled}
                        type="submit"
                    >
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}
