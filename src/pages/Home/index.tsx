import { HandPalm, Play } from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./Countdown";
import * as zod from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
    markCurrentlyCycleAsFinished: () => void;
    amoutSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O intervalo precisa ser de no mínimo 5 minutos.")
        .max(60, "O intervalo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; //Inferindo automaticamente os campos do formulário como tipagem

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleID] = useState<string | null>(null);
    const [amoutSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const methods = useForm<NewCycleFormData>({
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

    function markCurrentlyCycleAsFinished() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() };
                } else {
                    return cycle;
                }
            })
        );
    }

    const setSecondsPassed = (seconds: number) =>
        setAmountSecondsPassed(seconds);

    const {
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = methods;

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider
                    value={{
                        activeCycle,
                        markCurrentlyCycleAsFinished,
                        amoutSecondsPassed,
                        setSecondsPassed,
                    }}
                >
                    <FormProvider {...methods}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown activeCycleId={activeCycleId} />
                </CyclesContext.Provider>

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
