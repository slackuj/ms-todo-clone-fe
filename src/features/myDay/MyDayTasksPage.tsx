import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";
import {useGetTasksQuery} from "../../api/apiSlice.ts";

export const MyDayTasksPage = () => {
    useModalGuard();
    const {
        data: tasks = [],
        isLoading,
        //isFetching,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery();

    const myDayTasks = tasks.filter((task) => {
        if (task.dueDate) {
            const todayMidnightTimeStamp = new Date().setHours(0, 0, 0, 0);
            const taskMidnightTimeStamp = new Date(task.dueDate).setHours(0, 0, 0, 0);
            return todayMidnightTimeStamp === taskMidnightTimeStamp;
        } else {
            return false;
        }
    });

    return (
        <div className="page-content">
            <TasksToolBar listTitle="My Day"/>
            <TaskAdder/>
            <TasksGrid
                tasks={myDayTasks}
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                error={error}
            />
        </div>
    );
};