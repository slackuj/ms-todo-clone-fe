import type {ReactNode} from "react";
import {GoStar, GoStarFill} from "react-icons/go";
import {useTasksUpdater} from "../hooks/hooks.ts";
import type {Task} from "../types/tasks.ts";
import './ImportanceBtn.css';

interface ImportanceBtnProps {
    task: Task;
}

export const ImportanceBtn = (props: ImportanceBtnProps) => {

    const {
        toggleTaskImportance
    } = useTasksUpdater();

    const handleTaskImportance = async () => {
        await toggleTaskImportance(props.task);
    };
    const IMPORTANCE_ICON = new Map<Boolean, ReactNode>([
        [false, <GoStar onClick={handleTaskImportance} className="not-important"/>],
        [true, <GoStarFill className="important" onClick={handleTaskImportance} />]
    ]);

    return (
        <>
            {IMPORTANCE_ICON.get(props.task.isImportant)}
        </>
    );
};