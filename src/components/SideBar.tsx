import {NavLink} from "react-router";
import type {ReactNode} from "react";

export const SideBar = () => {

    let content: ReactNode;
    content = (
        <ul>
            <NavLink to="/tasks/myday">
                <li>My Day</li>
            </NavLink>
            <NavLink to="/tasks/important">
                <li>Important</li>
            </NavLink>
            <NavLink to="/tasks/planned">
                <li>Planned</li>
            </NavLink>
            <NavLink to="/tasks/assigned">
                <li>Assigned to me</li>
            </NavLink>
            <NavLink to="/tasks/all">
                <li>Tasks</li>
            </NavLink>
        </ul>
    );

    return (
        <div className="sidebar">
            {content}
        </div>
    );
};