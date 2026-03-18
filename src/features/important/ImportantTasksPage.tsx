import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";

export const ImportantTasksPage = () => {
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Important"/>
            <TaskAdder/>
        </div>
    );
};