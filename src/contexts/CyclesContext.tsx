import { createContext, ReactNode, useState } from "react";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
    amoutSecondsPassed: number;
    activeCycleId: string | null;
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
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleID] = useState<string | null>(null);
    const [amoutSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

    function interruptNewCycle() {
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

    function createNewCycle(data: CreateCycleData) {
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
        // reset();
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
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}
