import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

interface modalsState {
    isModalOpen: boolean;
    isDialogModalOpen: boolean;
    focusedTaskId: string;
    focusedStepId: string | undefined; // used for step deletion
}

const initialState: modalsState = {
    isModalOpen: false,
    isDialogModalOpen: false,
    focusedTaskId: "",
    focusedStepId: undefined
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        closeModal: state => {
            state.isModalOpen = false;
        },

        toggleDialogModal: (state, action: PayloadAction<string | undefined>) => {
            // string is passed on deletion
            // undefined is passed on cancellation
            state.focusedStepId = action.payload;
            state.isDialogModalOpen = !state.isDialogModalOpen;
        },

        focusTask: (state, action: PayloadAction<string>) => {
            state.focusedTaskId = action.payload;
            // display modal !!!
            state.isModalOpen = true;
        }

        /*updateFocusedTask: (state, action: PayloadAction<Task>) => {
            // BECAUSE WE DON'T WANT TO TOGGLE MODAL WHEN USER TOGGLES TASK COMPLETION FROM TASKGRID
            state.focusedTask = { ...state.focusedTask, ...action.payload };
        }*/
    }
});

// exporting generated action creators
export const {
    closeModal,
    focusTask,
    toggleDialogModal
} = modalsSlice.actions;

export default modalsSlice.reducer;

// selectors
export const selectIsModalOpen = (state: RootState) => state.modals.isModalOpen;
export const selectIsDialogModalOpen = (state: RootState) => state.modals.isDialogModalOpen;
export const selectFocusedTaskId = (state: RootState) => state.modals.focusedTaskId;
export const selectFocusedStepId = (state: RootState) => state.modals.focusedStepId;