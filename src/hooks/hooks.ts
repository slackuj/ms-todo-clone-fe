// this file serves as a central hub for re-exporting pre-typed Redux hooks
import type {AppDispatch, RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../store/slices/modalsSlice.ts";
import {useEffect} from "react";
import {useEditTaskMutation} from "../api/apiSlice.ts";
import type {Task} from "../types/tasks.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useModalGuard = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(closeModal());
    });
};

export const useTasksUpdater = () => {

    const [updateTask] = useEditTaskMutation();

    const toggleTaskCompletion = async (task: Task) => {
        try {
            await updateTask({ id: task.id, modifiedData: { isCompleted: !task.isCompleted } });
        } catch (error) {
            console.error('failed updating task importance', error);
        }
    };

    const toggleTaskImportance = async (task: Task) => {
        try {
            await updateTask({ id: task.id, modifiedData: { isImportant: !task.isImportant } });
        } catch (error) {
            console.error('failed updating task importance', error);
        }
    };

    const updateTaskTitle = async (taskId: string, title: string) => {
        try {
            await updateTask({ id: taskId, modifiedData: { title: title } });
        } catch (error) {
            console.error('failed updating task title', error);
        }
    };

    return {
        toggleTaskCompletion,
        updateTaskTitle,
        toggleTaskImportance
    };
};