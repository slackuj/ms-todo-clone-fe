import './TasksGrid.css';
import type {Task} from "../types/tasks.ts";
import {GoStar, GoStarFill} from "react-icons/go";
import type {ReactNode} from "react";
import {useGetTasksQuery} from "../api/apiSlice.ts";
import {useAppDispatch} from "../hooks/hooks.ts";
import {focusTask} from "../store/slices/modalsSlice.ts";

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
        dispatch(focusTask(props.task));
    };

    const dateToFormat = props.task.dueDate ? new Date(props.task.dueDate) : null;
    const dueDate = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    }).format(dateToFormat ?? 0);

    const IMPORTANCE_ICON: Readonly<Record<string, ReactNode>> ={
        false: <GoStar/>,
        true: <GoStarFill color="#2564cf"/>,
    };
    return (
        <div className="grid-row" key={props.task.id}>
            <div></div>
            <div onClick={handleFocusTask}>{props.task.title}</div>
            <div>{props.task.dueDate ? dueDate : ''}</div>
            <div>{IMPORTANCE_ICON[String(props.task.isImportant)]}</div>
        </div>
    );
};

export const TasksGrid = () => {
    let gridRows: ReactNode;
    const {
        data: tasks = [],
        isLoading,
        //isFetching,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery();

    if(isLoading) {
        gridRows = <div>Loading...</div>;
    } else if (isSuccess) {
        console.log(tasks);
    // dissociate tasks into tasks having due date and the others
    const dueDatedTasks = tasks.filter(task => task.dueDate);
    const notDueDatedTasks = tasks.filter(task => !task.dueDate);
    const sortedTasks = dueDatedTasks.slice();
    sortedTasks.sort((a,b) => {
        return a.dueDate!.getTime() - b.dueDate!.getTime()
    }
    );
    // push tasks without due dates into grid-rows first !
    const renderedNotDueDatedTasks = notDueDatedTasks.map(task => <GridRow key={task.id} task={task} />);
    const renderedDueDatedTasks = dueDatedTasks.map(task => <GridRow key={task.id} task={task} />);
    gridRows = renderedNotDueDatedTasks.concat(renderedDueDatedTasks);
    } else if (isError) {
        gridRows = <div>{error.toString()}</div>
    }
    return (
        <div className="grid-container">
            <GridHeader />
            {gridRows}
        </div>
    );
};