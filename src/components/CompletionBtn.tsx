import type {ReactNode} from "react";
import {GoCheckCircle, GoCheckCircleFill, GoCircle} from "react-icons/go";
import {useTasksUpdater} from "../hooks/hooks.ts";
import type {Step, Task} from "../types/tasks.ts";
import './CompletionBtn.css';
import useSound from 'use-sound';
import successSfx from '../assets/sounds/completed.mp3';

interface CompletionBtnProps {
    task: Task;
    step?: Step;
}

export const CompletionBtn = (props: CompletionBtnProps) => {

    const [play] = useSound(successSfx, { volume: 0.5 });
    const {
        toggleTaskCompletion,
        toggleStepCompletion
    } = useTasksUpdater();

    const handleCompletion = async () => {
        if (props.step) {
            await toggleStepCompletion(props.task, props.step.id);
            if (!props.step.isCompleted) play();
        } else {
            await toggleTaskCompletion(props.task);
            if (!props.task.isCompleted) play();
        }
    };
    const TASK_COMPLETE_ICON = new Map<Boolean, ReactNode>([
        [false, <div className="task-incomplete-container"><GoCircle onClick={handleCompletion}  className="task-incomplete-circle"/><GoCheckCircle onClick={handleCompletion} className="task-incomplete-hover-circle"/></div>],
        [true, <GoCheckCircleFill onClick={handleCompletion} className="task-complete-circle"/>]
    ]);

    let btn: ReactNode;

    {/*// may be i need not to make isCompleted, and isImportant properties optional
            // check default response from server and make updates SO THAT `!!` IS NOT REQUIRED */}

    if (props.step) {
        btn = TASK_COMPLETE_ICON.get(props.step.isCompleted);
    } else {
        btn = TASK_COMPLETE_ICON.get(props.task.isCompleted);
    }
    return (
        <div className="completion-btn-container">
            {btn}
        </div>
    );
};