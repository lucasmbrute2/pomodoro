interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

export enum ActionTypes {
    ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
    INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
    MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function cylesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            };
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === action.payload.activeCycleId) {
                        return { ...cycle, interrupedDate: new Date() };
                    } else {
                        return cycle;
                    }
                }),
                activeCycleId: null,
            };

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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
}
