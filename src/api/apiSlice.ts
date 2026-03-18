import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {NewTask, Task, TaskUpdateArgs} from "../types/tasks.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api'}),
    tagTypes: ['Task'],

    //endpoints: () => ({})
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
                const taskPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        //Object.assign(draft, NewTask);
                        draft.push({ id: tempId, ...newTask});
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
                const postPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, draft => {
                        const task = draft.find(task => task.id === taskUpdateArgs.id);
                        if (task) {
                            Object.assign(task, { id: taskUpdateArgs.id, ...taskUpdateArgs.modifiedData });
                            //task = { id: taskUpdateArgs.id, ...taskUpdateArgs.modifiedData };
                        }
                    })
                );

                try {
                    await lifecycleApi.queryFulfilled;
                } catch {
                    postPatchResult.undo();
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
                        return draft.filter(post => post.id !== id);
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