import React, {useEffect } from 'react';
import {createPortal} from 'react-dom';
import './Modal.css';
import {useAppDispatch, useAppSelector, useModal, useTasksUpdater} from "../hooks/hooks.ts";
import {closeModal, selectIsModalOpen} from "../store/slices/modalsSlice.ts";
import {Steps} from "./Steps.tsx";
import {ModalDatePicker} from "./ModalDatePicker.tsx";
import { LuPanelRightClose } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import classnames from "classnames";
import {CompletionBtn} from "./CompletionBtn.tsx";
import {ImportanceBtn} from "./ImportanceBtn.tsx";
import {useFocusedTask} from "../api/apiSlice.ts";

export const Modal = () => {

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                dispatch(closeModal());
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);
    const isOpen = useAppSelector(selectIsModalOpen);
    const dispatch = useAppDispatch();

    const {
        updateTaskTitle,
        updateTaskNote,
    } = useTasksUpdater();

    const {
        toggleDialogBox,
        closeTaskModal: handleCloseModal
    } = useModal();

    const { task } = useFocusedTask();
    if (!task) {
        return null;
    }

    const handleTaskTitle = async(e: React.FocusEvent<HTMLHeadingElement>) => {
        const title = e.currentTarget.textContent?.trim();
        if (title && title !== task.title) {
            await updateTaskTitle(task.id, title);
        }
    };

    const handleTaskNote = async(e: React.FocusEvent<HTMLTextAreaElement>) => {
        const note = e.currentTarget.value?.trim();
        if (note !== task.note) {
            await updateTaskNote(task.id, note);
        }
    };

    const handleDeletion = () => {
        toggleDialogBox(undefined);
    };


    if (!isOpen) return null;
    const titleClassname = classnames('task-completed-title', { disabled: !task.isCompleted});

    // createPortal takes two argument: (JSX, DOM node)
    // takes JSX and renders it inside the DOM node
    //console.log(task.steps);
    return createPortal(
        <div className="modal-overlay">
            <div className="task-details" >
                <div className="details-header">
                    <div><CompletionBtn task={task} /></div>
                    <h2
                        className={titleClassname + " details-header"}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={handleTaskTitle}
                    >{task.title}</h2>
                    <div><ImportanceBtn task={task} /></div>
                </div>
                <div className="task-steps">
                    <Steps />
                </div>
                <div className="task-dueDate">
                    <ModalDatePicker />
                </div>
                <div className="task-note">
                    <textarea
                        key={task.id}
                        rows={5} cols={33}
                        placeholder="Add note"
                        onBlur={handleTaskNote}
                        autoCorrect="on"
                        autoComplete="on"
                        defaultValue={task.note}
                    />
                </div>
                <div className="modal-footer">
                    <LuPanelRightClose
                        className="hide-modal-btn"
                        onClick={handleCloseModal}
                    />
                    <RiDeleteBin6Line
                        className="delete-btn"
                        onClick={handleDeletion}
                        title="Delete task"
                    />
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};