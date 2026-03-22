import {NavLink} from "react-router";
import type {ReactNode} from "react";
import {TITLE_ICON} from "./TasksToolBar.tsx";
import {useAppSelector} from "../hooks/hooks.ts";
import {
    selectAllTasksCount,
    selectImportantTasksCount,
    selectMyDayTasksCount,
    selectPlannedTasksCount
} from "../features/tasks/tasksSlice.ts";

export const SideBar = () => {

    const mydayTasks = useAppSelector(selectMyDayTasksCount);
    const importantTasks = useAppSelector(selectImportantTasksCount);
    const plannedTasks = useAppSelector(selectPlannedTasksCount);
    const allTasks = useAppSelector(selectAllTasksCount);

    let mydayTasksBadge: ReactNode;
    let importantTasksBadge: ReactNode;
    let plannedTasksBadge: ReactNode;
    let allTasksBadge: ReactNode;

    if (mydayTasks > 0) {
        mydayTasksBadge = (<span className="task-count">{mydayTasks}</span>);
    }
    if (importantTasks > 0) {
        importantTasksBadge = (<span className="task-count">{importantTasks}</span>);
    }
    if (plannedTasks > 0) {
        plannedTasksBadge = (<span className="task-count">{plannedTasks}</span>);
    }
    if (allTasks > 0) {
        allTasksBadge = (<span className="task-count">{allTasks}</span>);
    }
    const pageTitle = ["My Day", "Important", "Planned", "Assigned to me", "Tasks"];
    let content: ReactNode;
    content = (
        <ul>
            <NavLink to="/tasks/myday">
                <li>
                    <span className="page-icon">{TITLE_ICON[pageTitle[0]]}</span>
                    <span className="page-title">{pageTitle[0]}</span>
                    {mydayTasksBadge}
                </li>
            </NavLink>
            <NavLink to="/tasks/important">
                <li>
                    <span className="page-icon">{TITLE_ICON[pageTitle[1]]}</span>
                    <span className="page-title">{pageTitle[1]}</span>
                    {importantTasksBadge}
                </li>
            </NavLink>
            <NavLink to="/tasks/planned">
                <li>
                    <span className="page-icon">{TITLE_ICON[pageTitle[2]]}</span>
                    <span className="page-title">{pageTitle[2]}</span>
                    {plannedTasksBadge}
                </li>
            </NavLink>
            <NavLink to="/tasks/assigned">
                <li>
                    <span className="page-icon">{TITLE_ICON[pageTitle[3]]}</span>
                    <span className="page-title">{pageTitle[3]}</span>
                </li>
            </NavLink>
            <NavLink to="/tasks/all">
                <li>
                    <span className="page-icon">{TITLE_ICON[pageTitle[4]]}</span>
                    <span className="page-title">{pageTitle[4]}</span>
                    {allTasksBadge}
                </li>
            </NavLink>
        </ul>
    );

    return (
        <div className="sidebar">
            {content}
        </div>
    );
};