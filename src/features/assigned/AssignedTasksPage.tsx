import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";

export const AssignedTasksPage = () => {
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Assigned to me"/>
            <TaskAdder/>
        </div>
    );
};