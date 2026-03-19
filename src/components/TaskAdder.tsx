import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { DatePicker } from "./DatePicker";
import './TaskAdder.css';
import {useAddNewTaskMutation} from "../api/apiSlice.ts";

export const TaskAdder = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [addNewTask] = useAddNewTaskMutation();

    const handleAddNewTask = async () => {
        try {
            if (dueDate) {
            await addNewTask({
                title: taskTitle,
                dueDate: dueDate.getTime()
            });
            } else {
                await addNewTask({
                    title: taskTitle
                })
            }
        } catch (error) {
            console.log('failed to add new task', error);
        }
    };

    return (
        <div className="taskAdder-container">
            <div className="taskTitle-container">
                <IoAdd className="add-task-icon" />
                <input
                    className="task-title"
                    type="text"
                    placeholder="Add a task"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
            </div>
            <div className="taskActions-container">
                <div className="taskProperties-container">
                    <DatePicker
                        selectedDate={dueDate}
                        onDateChange={setDueDate}
                    />
                </div>
                <button
                    className="addTaskButton"
                    disabled={!taskTitle.trim()}
                    style={{ color: taskTitle.trim() ? '#2564cf' : '#a19f9d' }}
                    onClick={handleAddNewTask}
                >
                    Add
                </button>
            </div>
        </div>
    );
};
