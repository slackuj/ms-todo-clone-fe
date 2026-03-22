import { TbCalendarWeek } from "react-icons/tb";
import './DatePicker.css';
import {GrClose} from "react-icons/gr";
import {useFocusedTask} from "../api/apiSlice.ts";
import {useTasksUpdater} from "../hooks/hooks.ts";
import React from "react";

export const ModalDatePicker = () => {

    const { updateTaskDueDate } = useTasksUpdater();
    const { task } = useFocusedTask();
    if (!task) {
        return null;
    }

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const dueDate = value ? new Date(value).getTime() : null;
        await updateTaskDueDate(task.id, dueDate);
    };

    const handleDateDeletion = async() => {
        await updateTaskDueDate(task.id, null);
    }

    // Convert Date object to YYYY-MM-DD string for the input
    const dateToString = (date: Date | undefined): string => {
        if (!date) return "";
        return date.toISOString().split('T')[0];
    };

    // Calculate today's date in YYYY-MM-DD to disable past days
    const todayStr = new Date().toISOString().split('T')[0];

    const formatDate = (date: Date | undefined): string => {
        if (!date) return "Add due date";

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const resetTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const targetTime = resetTime(date);

        if (targetTime === resetTime(today)) return "Today";
        if (targetTime === resetTime(tomorrow)) return "Tomorrow";

        const isThisYear = date.getFullYear() === today.getFullYear();

        return 'Due ' + date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: isThisYear ? undefined : 'numeric',
        });
    };

    /*const handleChange = async () = {

    };*/

    return (
        <div className="ModalDatePicker-container">
            <div className="icon-wrapper" data-tooltip="Add due date">
                <TbCalendarWeek className="date-icon" />
                <input
                    type="date"
                    className="hidden-date-input"
                    defaultValue={dateToString( task.dueDate ? new Date(task.dueDate) : undefined )}
                    min={todayStr} // Blocks selection of past dates
                    onChange={handleDateChange}
                />
            </div>
                <span className="display-date-text">
                    {formatDate(task.dueDate ? new Date(task.dueDate) : undefined)}
                </span>
            {task.dueDate ? <GrClose onClick={handleDateDeletion} /> : ''}
        </div>
    );
};