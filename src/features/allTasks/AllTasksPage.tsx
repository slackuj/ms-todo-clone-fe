import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";

export const AllTasksPage = () => {
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Tasks"/>
            <TaskAdder />
            <TasksGrid />
        </div>
    );
};