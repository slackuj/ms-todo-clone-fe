import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";

export const MyDayTasksPage = () => {
    return (
        <div className="page-content">
            <TasksToolBar listTitle="My Day"/>
            <TaskAdder/>
        </div>
    );
};