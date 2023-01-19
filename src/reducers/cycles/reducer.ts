import { ActionTypes } from "./actions";
import { produce } from "immer";

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

export function cylesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            });
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return produce(state, (draft) => {
                const cycleIndex = draft.cycles.findIndex(
                    (cycle) => cycle.id === state.activeCycleId
                );

                if (cycleIndex < 0) return state;
                draft.cycles[cycleIndex].interrupedDate = new Date();
                draft.activeCycleId = null;
            });

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            return produce(state, (draft) => {
                const cycleIndex = draft.cycles.findIndex(
                    (cycle) => cycle.id === state.activeCycleId
                );

                if (cycleIndex < 0) return state;

                draft.cycles[cycleIndex].finishedDate = new Date();
                draft.activeCycleId = null;
            });
        default:
            return state;
    }
}
