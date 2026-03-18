/*
import {apiSlice} from "../../api/apiSlice.ts";
import type {NewTask, Task} from "../../types/tasks.ts";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query<Task[], void> ({
            query: () => '/tasks',
            transformResponse: (response: {data: Task[]}) => response.data,
            providesTags: (result = [], _error, _arg) => ['Task', ...result.map(({id}) => ({type: 'Task', id }) as const)]
        }),

        getTask: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            transformResponse: (response: { data: Task }) => response.data,
            providesTags: (_result, _error, arg) => [{ type: 'Task', id: arg }]
        }),

        addNewTask: builder.mutation<Task, NewTask>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask
            }),
            // applying optimistic update for adding new tasks to the cache
            // and also handling the true id returned from the server !!!
            async onQueryStarted(newTask, lifecycleApi) {

                const tempId = crypto.randomUUID();
                const NewTask = { id: tempId, ...newTask};
                const taskPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        Object.assign(draft, NewTask);
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
        })
    })
});*/
