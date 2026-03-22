import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";
import {useGetTasksQuery} from "../../api/apiSlice.ts";

export const PlannedTasksPage = () => {
    useModalGuard();
    const {
        data: tasks = [],
        isLoading,
        //isFetching,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery();
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Tasks"/>
            <TaskAdder />
            <TasksGrid
                tasks={tasks}
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                error={error}
            />
        </div>
    );
};