import React, {type ReactNode, useEffect } from 'react';
import {createPortal} from 'react-dom';
import './Modal.css';
import {useAppDispatch, useAppSelector, useTasksUpdater} from "../hooks/hooks.ts";
import {closeModal, selectFocusedTask, selectIsModalOpen} from "../store/slices/modalsSlice.ts";
import {GoCheckCircle, GoCheckCircleFill, GoStar, GoStarFill} from "react-icons/go";
import { GoCircle } from "react-icons/go";
import {Steps} from "./Steps.tsx";
import {ModalDatePicker} from "./ModalDatePicker.tsx";
import { LuPanelRightClose } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

export const Modal = () => {

    const dispatch = useAppDispatch();
    const task = useAppSelector(selectFocusedTask);
    const isOpen = useAppSelector(selectIsModalOpen);
    const {
        toggleTaskCompletion,
        updateTaskTitle,
        toggleTaskImportance
    } = useTasksUpdater();

    const handleTaskCompletion = async () => {
        await toggleTaskCompletion(task);
    };

    const handleTaskImportance = async () => {
        await toggleTaskImportance(task);
    };

    const handleTaskTitle = async(e: React.FocusEvent<HTMLHeadingElement>) => {
        const title = e.currentTarget.textContent?.trim();
        if (title && title !== task.title) {
            await updateTaskTitle(task.id, title);
        }
    };
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

    if (!isOpen) return null;
    const IMPORTANCE_ICON = new Map<Boolean, ReactNode>([
        [false, <GoStar onClick={handleTaskImportance} className="not-important"/>],
        [true, <GoStarFill className="important" onClick={handleTaskImportance} />]
    ]);

    const TASK_COMPLETE_ICON = new Map<Boolean, ReactNode>([
        [false, <div className="task-incomplete-container"><GoCircle onClick={handleTaskCompletion}  className="task-incomplete-circle"/><GoCheckCircle onClick={handleTaskCompletion} className="task-incomplete-hover-circle"/></div>],
        [true, <GoCheckCircleFill onClick={handleTaskCompletion} className="task-complete-circle"/>]
    ]);

    // createPortal takes two argument: (JSX, DOM node)
    // takes JSX and renders it inside the DOM node
    return createPortal(
        <div className="modal-overlay">
            <div className="task-details" >
                <div className="details-header">
                    <div>{TASK_COMPLETE_ICON.get(!!task.isCompleted)}</div>
                    <h2
                        className="details-header"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={handleTaskTitle}
                    >{task.title}</h2>
                    <div>{IMPORTANCE_ICON.get(!!task.isImportant)}</div>
                </div>
                <div className="task-steps">
                    <Steps />
                </div>
                <div className="task-dueDate">
                    <ModalDatePicker />
                </div>
                <div className="task-note">
                    <textarea rows={5} cols={33} placeholder="Add note" />
                </div>
                <div className="modal-footer">
                    <LuPanelRightClose />
                    <RiDeleteBin6Line />
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};