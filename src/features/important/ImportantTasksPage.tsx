import {TasksToolBar} from "../../components/TasksToolBar.tsx";
import {TaskAdder} from "../../components/TaskAdder.tsx";
import {TasksGrid} from "../../components/TasksGrid.tsx";
import {useModalGuard} from "../../hooks/hooks.ts";
import {useGetTasksQuery} from "../../api/apiSlice.ts";

export const ImportantTasksPage = () => {
    useModalGuard();
    const {
        data: tasks = [],
        isLoading,
        //isFetching,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery();

    const importantTasks = tasks.filter((task) => task.isImportant);
    return (
        <div className="page-content">
            <TasksToolBar listTitle="Important"/>
            <TaskAdder/>
            <TasksGrid
                tasks={importantTasks}
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                error={error}
            />
        </div>
    );
};