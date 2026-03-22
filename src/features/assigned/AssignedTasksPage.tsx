import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";

export const AssignedTasksPage = () => {
    useModalGuard();
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Assigned to me"/>
        </div>
    );
};