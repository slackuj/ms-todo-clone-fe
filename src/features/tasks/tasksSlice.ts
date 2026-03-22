import { createSelector } from '@reduxjs/toolkit';
import {apiSlice} from "../../api/apiSlice.ts";

// returns query result object, similar to the return values of useGetTasksQuery() hook
const selectTasksResult = apiSlice.endpoints.getTasks.select();

//JUST get the data (the array of tasks)
const selectTasksData = createSelector(
    selectTasksResult,
    (result) => result.data ?? [] // We grab just the .data property
);

// SPECIALIZED SELECTORS

export const selectAllTasksCount = createSelector(
    [selectTasksData],// one or more input selectors inside array [] or even can be passed as separate objects
    // the output function gets values returned by above input selectors as input arguments
    // and will return when either input values (i.e input arguments to the output function ---> values returned by above input selectors
    // ``` passed inside []```
    // HERE TASKS INPUT ARGUMENT TO OUR OUTPUT FUNCTION IS THE RETURN VALUE OF SelectTasksData FUNCTION !!!
    (tasks) => tasks.length
);

export const selectImportantTasksCount = createSelector(
    [selectTasksData],
    (tasks) => tasks.filter(t => t.isImportant).length
);

export const selectMyDayTasksCount = createSelector(
    [selectTasksData],
    (tasks) => tasks.filter((task) => {
        if (task.dueDate) {
            const todayMidnightTimeStamp = new Date().setHours(0, 0, 0, 0);
            const taskMidnightTimeStamp = new Date(task.dueDate).setHours(0, 0, 0, 0);
            return todayMidnightTimeStamp === taskMidnightTimeStamp;
        } else {
            return false;
        }
    }).length
);

export const selectPlannedTasksCount = createSelector(
    [selectTasksData],
    (tasks) => tasks.filter(t => !t.isCompleted).length
);