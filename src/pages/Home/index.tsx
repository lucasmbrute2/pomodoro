import { HandPalm, Play } from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./Countdown";
import * as zod from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CyclesContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O intervalo precisa ser de no mínimo 5 minutos.")
        .max(60, "O intervalo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; //Inferindo automaticamente os campos do formulário como tipagem

export function Home() {
    const { createNewCycle, activeCycle, interruptNewCycle, activeCycleId } =
        useContext(CyclesContext);

    const methods = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            minutesAmount: 0,
            task: "",
        },
    });

    const {
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = methods;

    const task = watch("task");
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...methods}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown activeCycleId={activeCycleId} />

                {activeCycle ? (
                    <StopCountdownButton
                        onClick={interruptNewCycle}
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
