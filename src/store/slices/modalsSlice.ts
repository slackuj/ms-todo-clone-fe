import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

interface modalsState {
    isModalOpen: boolean;
    focusedTaskId: string;
}

const initialState: modalsState = {
    isModalOpen: false,
    focusedTaskId: ""
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        closeModal: state => {
            state.isModalOpen = false;
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
    focusTask
} = modalsSlice.actions;

export default modalsSlice.reducer;

// selectors
export const selectIsModalOpen = (state: RootState) => state.modals.isModalOpen;
export const selectFocusedTaskId = (state: RootState) => state.modals.focusedTaskId;
