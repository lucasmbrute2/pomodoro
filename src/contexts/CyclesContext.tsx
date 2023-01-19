import { createContext, ReactNode, useReducer, useState } from "react";

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
    cycles: Cycle[];
    markCurrentlyCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptNewCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

interface DispatchCtx {
    type: string;
    payload: object;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContexProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) => {
            switch (action.type) {
                case "INTERRUPT_CURRENT_CYCLE":
                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === action.payload.activeCycleId) {
                                return { ...cycle, finishedDate: new Date() };
                            } else {
                                return cycle;
                            }
                        }),
                        activeCycleId: null,
                    };
                case "ADD_NEW_CYCLE":
                    return {
                        ...state,
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    };

                case "MARK_CURRENT_CYCLE_AS_FINISHED":
                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === action.payload.activeCycleId) {
                                return { ...cycle, finishedDate: new Date() };
                            } else {
                                return cycle;
                            }
                        }),
                        activeCycleId: null,
                    };
                default:
                    return state;
            }
        },
        {
            cycles: [],
            activeCycleId: null,
        }
    );

    const { activeCycleId, cycles } = cyclesState;

    const [amoutSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentlyCycleAsFinished() {
        dispatch({
            type: "MARK_CURRENT_CYCLE_AS_FINISHED",
            payload: {
                activeCycleId,
            },
        });
    }

    const setSecondsPassed = (seconds: number) =>
        setAmountSecondsPassed(seconds);

    function interruptNewCycle() {
        dispatch({
            type: "INTERRUPT_CURRENT_CYCLE",
            payload: {
                activeCycleId,
            },
        });
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

        dispatch({
            type: "ADD_NEW_CYCLE",
            payload: {
                newCycle,
            },
        });
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
