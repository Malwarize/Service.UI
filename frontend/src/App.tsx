import './App.css';
import Main from './pages/Main';
import Groups from './pages/Groups';
import {Routes, Route, HashRouter} from "react-router-dom";
import React from "react";
import MainServicesForGroup from "./pages/MainServicesForGroup";
import AddGroup from "./pages/AddGroup";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import LogViewer from "./pages/LogViewer";
import GlobalLogViewer from "./pages/GlobalLogViewer";
import Settings from "./pages/Settings";


export default function App() {
    return (
        <HashRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<Main />}  />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupName" element={<MainServicesForGroup/>} />
                <Route path="/addGroup" element={<AddGroup />} />
                <Route path="/groups/:groupName/addService/" element={<AddService />} />
                <Route path="/groups/:groupName/editService/:serviceName" element={<EditService />} />
                <Route path="/logs" element={<GlobalLogViewer />} />
                <Route path={"logs/:serviceName"} element={<LogViewer />} />
                <Route path={"/settings"} element=<Settings/> />
            </Routes>
        </HashRouter>
    );
}
