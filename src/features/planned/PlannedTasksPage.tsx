import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";

export const PlannedTasksPage = () => {
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Planned"/>
            <TaskAdder/>
        </div>
    );
};