import { createContext, ReactNode, useReducer, useState } from "react";
import {
    ActionTypes,
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCyleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle, cylesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
    amoutSecondsPassed: number;
    activeCycleId: string | null;
    cycles: Cycle[];
    markCurrentlyCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptNewCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}
export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContexProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cylesReducer, {
        cycles: [],
        activeCycleId: null,
    });

    const { activeCycleId, cycles } = cyclesState;

    const [amoutSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentlyCycleAsFinished() {
        dispatch(markCurrentCyleAsFinishedAction());
    }

    const setSecondsPassed = (seconds: number) =>
        setAmountSecondsPassed(seconds);

    function interruptNewCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    function createNewCycle(data: CreateCycleData) {
        setAmountSecondsPassed(0);
        const id = new Date().getTime().toString();
        const newCycle: Cycle = {
            id,
            minutesAmount: data.minutesAmount,
            task: data.task,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle));
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                markCurrentlyCycleAsFinished,
                amoutSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptNewCycle,
                activeCycleId,
                cycles,
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}
