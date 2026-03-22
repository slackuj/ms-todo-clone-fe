// this file serves as a central hub for re-exporting pre-typed Redux hooks
import type {AppDispatch, RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    closeModal,
    selectFocusedStepId,
    selectIsDialogModalOpen,
    toggleDialogModal
} from "../store/slices/modalsSlice.ts";
import {useEffect} from "react";
import {useEditTaskMutation} from "../api/apiSlice.ts";
import type {Step, Task, TaskUpdateArgs} from "../types/tasks.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useModalGuard = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(closeModal());
    });
};

export const useModal = () => {
    const dispatch = useAppDispatch();
    const focusedStepId = useAppSelector(selectFocusedStepId);

    const deletingStep = !!focusedStepId;
    const isDialogBoxOpen = useAppSelector(selectIsDialogModalOpen);
    const toggleDialogBox = (stepId: string | undefined) => {
        dispatch(toggleDialogModal(stepId));
    };

    const closeTaskModal = () => {
        dispatch(closeModal());
    };

    return{
        deletingStep,
        focusedStepId,
        isDialogBoxOpen,
        toggleDialogBox,
        closeTaskModal
    };
}

export const useTasksUpdater = () => {

    const [updateTask] = useEditTaskMutation();

    const UpdateTask = async(taskUpdateArgs: TaskUpdateArgs) => {
        try {
            await updateTask(taskUpdateArgs);
        } catch (error) {
            console.error(`failed updating task ${taskUpdateArgs} : error: ${error}`);
        }
    };

    const toggleTaskCompletion = async (task: Task) => {
        await UpdateTask({ id: task.id, modifiedData: { isCompleted: !task.isCompleted } });
    };

    const toggleTaskImportance = async (task: Task) => {
        await UpdateTask({ id: task.id, modifiedData: { isImportant: !task.isImportant } });
    };

    const updateTaskTitle = async (taskId: string, title: string) => {
        await UpdateTask({ id: taskId, modifiedData: { title: title } });
    };

    const updateTaskNote = async (taskId: string, note: string) => {
        await UpdateTask({ id: taskId, modifiedData: { note: note } });
    };

    const updateTaskDueDate = async (taskId: string, date: number | null) => {
        await UpdateTask({ id: taskId, modifiedData: { dueDate: date } });
    };

    const updateStepTitle = async (task: Task, stepId: string, stepTitle: string) => {
        const updatedSteps = task.steps?.map((step) =>
            step.id === stepId ? { ...step, title: stepTitle } : step);
        if (updatedSteps){
            await UpdateTask({ id: task.id, modifiedData: { steps: updatedSteps } });
        }
    };

    const addNewStep = async (task: Task, stepTitle: string) => {
        const newStep: Step = {
            id: crypto.randomUUID(),
            title: stepTitle,
            isCompleted: false
        };
        const updatedSteps = task.steps ? [...task.steps, newStep] : [newStep];
        await UpdateTask({ id: task.id, modifiedData: { steps: updatedSteps } });
    };

    const deleteStep = async (task: Task, stepId: string) => {
        const updatedSteps = task.steps?.filter(step => step.id !== stepId);
        if (updatedSteps){
            await UpdateTask({ id: task.id, modifiedData: { steps: updatedSteps } });
        }
    };

    const toggleStepCompletion = async (task: Task, stepId: string) => {
        const updatedSteps = task.steps?.map((step) =>
            // IF I AM NOT WRONG !!! --- CHECK AND UPDATE IF OTHERWISE
            // !!step.isCompleted not required here, because in backend-> schema: step.isCompleted.default(false) forces to return steps.isCompleted as false
            // similar to the response obtained for task.isCompleted and task.isImportant, as observed till now !!!
            step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step);
        if (updatedSteps){
            await UpdateTask({ id: task.id, modifiedData: { steps: updatedSteps } });
        }
    };

    return {
        toggleTaskCompletion,
        updateTaskTitle,
        updateTaskNote,
        updateTaskDueDate,
        toggleTaskImportance,
        addNewStep,
        updateStepTitle,
        deleteStep,
        toggleStepCompletion
    };
};