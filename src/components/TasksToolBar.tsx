import { WiDaySunny } from "react-icons/wi";
import { GoStar } from "react-icons/go";
import { TbCalendarWeek } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { LuList } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import type {ReactNode} from "react";
import './TasksToolBar.css';

interface TasksToolBarProps {
    listTitle: string;
}

const TITLE_ICON: Readonly<Record<string, ReactNode>> ={
    "My Day": <WiDaySunny/>,
    "Important": <GoStar/>,
    "Planned": <TbCalendarWeek/>,
    "Assigned to me": <IoPersonOutline/>,
    "Tasks": <GrHomeRounded/>,
};

export const TasksToolBar = (props: TasksToolBarProps) => {

    let titleIcon: ReactNode;
    titleIcon = TITLE_ICON[props.listTitle] ?? <LuList/>;

    return (
        <div className="tasksToolBar">
           <div className="tasksToolBarContainer">
              <div className="tasksToolBar-titleItem">
                  <h2 className="listTitle">
                      {titleIcon}
                      <span>{props.listTitle}</span>
                  </h2>
              </div>
                   <SlOptions className="listOptions"/>
           </div>
        </div>
    )
};