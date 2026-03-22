import './App.css'
import {TopBar} from "./components/TopBar.tsx";
import {SideBar} from "./components/SideBar.tsx";
import {Route, Routes} from "react-router";
import {MyDayTasksPage} from "./features/myDay/MyDayTasksPage.tsx";
import {ImportantTasksPage} from "./features/important/ImportantTasksPage.tsx";
import {PlannedTasksPage} from "./features/planned/PlannedTasksPage.tsx";
import {AssignedTasksPage} from "./features/assigned/AssignedTasksPage.tsx";
import {AllTasksPage} from "./features/allTasks/AllTasksPage.tsx";
import {Modal} from "./components/Modal.tsx";
import {DialogModal} from "./components/DialogModal.tsx";

export const App = () => {

  return (
      <>
          <TopBar/>
          <div className="container">
          <SideBar/>
              <div className="main-content">
          <Routes>
              <Route path="/tasks/myday" element={<MyDayTasksPage/>}/>
              <Route path="/tasks/important" element={<ImportantTasksPage/>}/>
              <Route path="/tasks/planned" element={<PlannedTasksPage/>}/>
              <Route path="/tasks/assigned" element={<AssignedTasksPage/>}/>
              <Route path="/tasks/all" element={<AllTasksPage/>}/>
          </Routes>
              </div>
              <div id="modal-root">
              <Modal />
              </div>
          </div>
          <DialogModal />
      </>
  )
};