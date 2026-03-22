import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {NewTask, ServerTask, Task, TaskUpdateArgs} from "../types/tasks.ts";
import { selectFocusedTaskId } from "../store/slices/modalsSlice.ts";
import {useAppSelector} from "../hooks/hooks.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api'}),
    tagTypes: ['Task'],

    //endpoints: () => ({})
    endpoints: builder => ({
        getTasks: builder.query<Task[], void> ({
            query: () => '/tasks',
            // takes ServerTask[] and returns Task[]
            transformResponse: (response: {data: ServerTask[]}) => response.data.map(task =>
                ({
                    ...task,
                    // converting 'string' date received from server into pure Date object before receiving the response !!!
                    dueDate: task.dueDate ? new Date(task.dueDate).getTime() : undefined
                })),
            providesTags: (result = [], _error, _arg) => ['Task', ...result.map(({id}) => ({type: 'Task', id }) as const)]
        }),

        getTask: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            // takes ServerTask and returns Task
            transformResponse: (response: { data: ServerTask }) => ({ ...response.data,
                dueDate: response.data.dueDate ? new Date(response.data.dueDate).getTime() : undefined }),
            providesTags: (_result, _error, arg) => [{ type: 'Task', id: arg }]
        }),

        addNewTask: builder.mutation<Task, NewTask>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask
            }),
            transformResponse: (response: {data: Task}) => response.data,
            // applying optimistic update for adding new tasks to the cache
            // and also handling the true id returned from the server !!!
            async onQueryStarted(newTask, lifecycleApi) {

                const tempId = crypto.randomUUID();
                const taskPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        //Object.assign(draft, NewTask);
                        //  YOU ALSO NEED TO HANDLE EXTRA LISTS CASE
                        draft.push({ id: tempId, ...newTask, isImportant: false, isCompleted: false});
                    })
                );

                try {
                    // wait for response
                    const { data: newTaskFromServer } = await lifecycleApi.queryFulfilled;
                    lifecycleApi.dispatch(
                        apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                            const task = draft.find(t => t.id === tempId);
                            if (task) {
                                task.id = newTaskFromServer.id; // replacing tempId with id returned by server
                            }
                        })
                    );
                } catch {
                    // rollback if backend fails
                    taskPatchResult.undo();
                }
            }
        }),

        // endpoint for updating task
        editTask: builder.mutation<Task, TaskUpdateArgs>({
            query: taskUpdateArgs => ({
                url: `/tasks/${taskUpdateArgs.id}`,
                method: 'PATCH',
                body: taskUpdateArgs.modifiedData
            }),

            // optimistic update
            async onQueryStarted(taskUpdateArgs, lifecycleApi) {


                //const state = lifecycleApi.getState() as RootState;
                //const focusedTask = selectFocusedTask(state);
                const postPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        const task = draft.find(t => t.id === taskUpdateArgs.id);
                        if (task) {
                            // Update the draft
                            Object.assign(task, taskUpdateArgs.modifiedData);
/*


                            // focusedTask inside this block === current focusedTask




                            // Get FRESH state
                            const currentState = lifecycleApi.getState() as RootState;
                            const focusedTask = selectFocusedTask(currentState);
                  */          // because task completion/importance can be toggled even if it is not focused (i.e in modal)
                            // also task title to be made editable later... just as in MS To Do app !!!
                   /*         if (focusedTask && focusedTask.id === taskUpdateArgs.id) {
                                console.log(`updating focused task on updateQueryData:\n
                                `
                            );
                                console.log(task.steps);
                                console.log(focusedTask.steps);
                                lifecycleApi.dispatch(updateFocusedTask(current(task)));
                            }
                    */    }
                    })
                );

                try {
                    await lifecycleApi.queryFulfilled;
                    /*// H A N D L E   S T E P S  U P D A T E S
                    if ("steps" in taskUpdateArgs.modifiedData){
                        lifecycleApi.dispatch(
                            apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                                const task = draft.find(task => task.id === taskUpdateArgs.id);
                                // skip if task steps is empty due to deletion (undefined)
                                // task.steps?.length allows us to ensure that updatedTaskFromServer is not empty (or undefined) !!!
                                if (task && task.steps?.length){
                                    // UPDATE STEPS FOR EVENTUALLY UPDATING TEMPID OF NEW STEP IF NEW STEP WAS ADDED
                                    // i.e skip if steps were updated or deleted only ( no new step added )



                                    // focusedTask inside this block === current focusedTask



                                    // Get FRESH state
                                    const currentState = lifecycleApi.getState() as RootState;
                                    const focusedTask = selectFocusedTask(currentState);
                                    if (focusedTask.steps?.length && task.steps.length > focusedTask.steps.length){
                                        task.steps = updatedTaskFromServer.steps;
                                        //if (focusedTask){
                                        // irrelevant for now , because task steps are only updatable via modal
                                        console.log(`updating focused task after queryFulfilled:\n
                                `
                                        );
                                        console.log(task.steps);
                                        console.log(focusedTask.steps);
                                        lifecycleApi.dispatch(updateFocusedTask(current(task)));
                                       // }
                                    }
                     */
                      /*      })
                        )
                    }*/
                } catch {
                    postPatchResult.undo();


                    // focusedTask inside this block === old focusedTask defined on onQueryStarted




                    /*// rollback focusedTask
                    if (focusedTask && focusedTask.id === taskUpdateArgs.id) {
                        lifecycleApi.dispatch(updateFocusedTask(focusedTask));
                    }*/
                }
            }
        }),

        // endpoint for deletion
        deleteTask: builder.mutation<{success: boolean}, string>({
            query: id => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),

            // optimistic deletion
            async onQueryStarted(id, lifecycleApi) {
                const patchDeletionResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        return draft.filter(task => task.id !== id);
                    })
                );
                try {
                    await lifecycleApi.queryFulfilled;
                } catch {
                    patchDeletionResult.undo();
                }
            }
        })
    })
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useAddNewTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
} = apiSlice;

export const useFocusedTask = () => {
    const focusedTaskId = useAppSelector(selectFocusedTaskId);
    return useGetTasksQuery(undefined, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            task: data?.find(task => task.id === focusedTaskId),
            isLoading,
            isError
        })
    });
};