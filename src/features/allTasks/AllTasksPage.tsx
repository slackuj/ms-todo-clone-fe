import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";

export const AllTasksPage = () => {
    useModalGuard();
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Tasks"/>
            <TaskAdder />
            <TasksGrid />
        </div>
    );
};