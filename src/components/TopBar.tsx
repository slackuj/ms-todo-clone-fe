import './TopBar.css';
import {NavLink} from "react-router";
import { IoApps } from "react-icons/io5";

/*interface TopBarProps {
    title: string;
}*/

export const TopBar = (/*{title} : TopBarProps*/) => {
    return (
        <div className="topbar">
        <header className="app-header">
            <NavLink
                to="/"
            >
                <IoApps
                    size="1.15em"
                    color="white"
                />
                <span className="header__title">To Do{/*{title}*/}</span>
            </NavLink>
            {/*<ThemeButton/>*/}
        </header>
        </div>
    );
};