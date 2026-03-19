import {type ReactNode, useEffect } from 'react';
import {createPortal} from 'react-dom';
import './Modal.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {closeModal, selectFocusedTask} from "../store/slices/modalsSlice.ts";
import {GoStar, GoStarFill} from "react-icons/go";
import { GoCircle } from "react-icons/go";
import {Steps} from "./Steps.tsx";

export const Modal = () => {

    const dispatch = useAppDispatch();
    const task = useAppSelector(selectFocusedTask);
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

    if (!props.isOpen) return null;

    // createPortal takes two argument: (JSX, DOM node)
    // takes JSX and renders it inside the DOM node

    const IMPORTANCE_ICON: Readonly<Record<string, ReactNode>> ={
        false: <GoStar/>,
        true: <GoStarFill color="#2564cf"/>,
    };

    return createPortal(
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
            <div className="task-details">
                <div className="details-header">
                    <div><GoCircle/></div>
                    <h2 className="details-header">{task.title}</h2>
                    <div>{IMPORTANCE_ICON[String(task.isImportant)]}</div>
                </div>
                <div className="task-steps">
                    <Steps />
                </div>
                <div className="add-to-myday">
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};