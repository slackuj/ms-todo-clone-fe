import { IoAdd } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbCalendarWeek } from "react-icons/tb";
import './TaskAdder.css';


export const TaskAdder = () => {
    return (
        <div className="taskAdder-container">
            <div className="taskTitle-container">
                <IoAdd className="add-task-icon" />
                <input className="task-title" type="text" placeholder="Add a task" />
            </div>
            <div className="taskActions-container">
                <div className="taskProperties-container">
                   <div className="dateButton-container">
                       <button className="dateButton" title="Add due date">
                           <TbCalendarWeek />
                       </button>
                   </div>
                    <div className="reminderButton-container">
                        <button className="reminderButton" title="Remind me">
                            <IoNotificationsOutline />
                        </button>
                    </div>
                </div>
                <button className="addTaskButton">Add</button>
            </div>
        </div>
    );
};