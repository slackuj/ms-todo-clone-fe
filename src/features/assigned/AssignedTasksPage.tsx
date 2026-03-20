import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";

export const AssignedTasksPage = () => {
    useModalGuard();
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Assigned to me"/>
            <TaskAdder/>
            <TasksGrid />
        </div>
    );
};