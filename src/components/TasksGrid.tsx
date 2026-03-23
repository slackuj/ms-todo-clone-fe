import './TasksGrid.css';
import type {Task} from "../types/tasks.ts";
import type {ReactNode} from "react";
import {useAppDispatch} from "../hooks/hooks.ts";
import {focusTask} from "../store/slices/modalsSlice.ts";
import classnames from "classnames";
import {CompletionBtn} from "./CompletionBtn.tsx";
import {ImportanceBtn} from "./ImportanceBtn.tsx";
import type {SerializedError} from "@reduxjs/toolkit";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

interface GridRowProps {
    task: Task;
}

const GridHeader = () => (
    <div className="grid-header grid-row">
        <div></div>
        <div>Title</div>
        <div>Due Date</div>
        <div>Importance</div>
    </div>
);

const GridRow = (props: GridRowProps) => {
    const dispatch = useAppDispatch();
    const handleFocusTask = () => {
        dispatch(focusTask(props.task.id));
    };

    //const dateToFormat = props.task.dueDate ? new Date(props.task.dueDate) : null;
    const dueDate = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    }).format(props.task.dueDate ?? undefined);

    const titleClassname = classnames('task-completed-title', { disabled: !props.task.isCompleted});

    return (
        <div className="grid-row" key={props.task.id}>
            <CompletionBtn task={props.task} />
            <div className={titleClassname} onClick={handleFocusTask}>{props.task.title}</div>
            <div>{props.task.dueDate ? dueDate : ''}</div>
            <div><ImportanceBtn task={props.task} /></div>
        </div>
    );
};

interface TaskGridProps {
    tasks: Task[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error:  FetchBaseQueryError | SerializedError | undefined;
}

export const TasksGrid = (props: TaskGridProps) => {
    let gridRows: ReactNode;
    if(props.isLoading) {
        gridRows = <div>Loading...</div>;
    } else if (props.isSuccess) {
    //    console.log(tasks);
    // dissociate tasks into tasks having due date and the others
    const dueDatedTasks = props.tasks.filter(task => task.dueDate);
    const notDueDatedTasks = props.tasks.filter(task => !task.dueDate);
    const sortedTasks = dueDatedTasks.slice();
    sortedTasks.sort((a,b) => {
        return a.dueDate! - b.dueDate!;
    }
    );
    // push tasks without due dates into grid-rows first !
    const renderedNotDueDatedTasks = notDueDatedTasks.map(task => <GridRow key={task.id} task={task} />);
    const renderedDueDatedTasks = dueDatedTasks.map(task => <GridRow key={task.id} task={task} />);
    gridRows = renderedNotDueDatedTasks.concat(renderedDueDatedTasks);
    } else if (props.isError && props.error) {
        gridRows = <div>{props.error.toString()}</div>
    }
    return (
        <div className="grid-container">
            <GridHeader />
            {gridRows}
        </div>
    );
};