import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import './DialogModal.css';
import {useAppDispatch, useModal, useTasksUpdater} from "../hooks/hooks.ts";
import {toggleDialogModal} from "../store/slices/modalsSlice.ts";
import {useDeleteTaskMutation, useFocusedTask} from "../api/apiSlice.ts";

export const DialogModal = () => {

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                dispatch(toggleDialogModal());
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);
    const dispatch = useAppDispatch();
    const [deleteTask] = useDeleteTaskMutation();

    const {
        deleteStep
    } = useTasksUpdater();

    const {
        deletingStep,
        focusedStepId,
        isDialogBoxOpen,
        toggleDialogBox
    } = useModal();

    const { task } = useFocusedTask();

    if (!task) {
        return null;
    }

    const handleDeletion = async () => {
        if (deletingStep && focusedStepId) {
            await deleteStep(task, focusedStepId);
        } else {
            await deleteTask(task.id);
        }
    };

    const handleCancel = () => {
        toggleDialogBox(undefined);
    };

    if (!isDialogBoxOpen) return null;
    let headerTitle: string;
    let deletionText: string;
    if (deletingStep) {
        const step = task.steps?.find((step) => step.id === focusedStepId);
        if (step) {
            headerTitle = step.title;
            deletionText = "Delete step";
        } else {
            return null;
        }
    } else {
        headerTitle = task.title;
        deletionText = "Delete task";
    }

    // createPortal takes two argument: (JSX, DOM node)
    // takes JSX and renders it inside the DOM node
    //console.log(task.steps);
    return createPortal(
        <div className="dialog-modal-overlay" onClick={handleCancel}>
            <div className="dialog-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header" >
                    <span>"{headerTitle}" will be permanently deleted.</span>
                </div>
                <div className="dialog-description">
                    <span>You won't be able to undo this action.</span>
                </div>
                <div className="dialog-footer">
                    <div className="action-dialog-btns">
                        <button className="dialog-btn gray" onClick={handleCancel}>
                            <span>Cancel</span>
                        </button>
                        <button className="dialog-btn red" aria-describedby="dialog-description" onClick={handleDeletion}>
                            <span>{deletionText}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('dialog-modal') as HTMLElement
    );
};