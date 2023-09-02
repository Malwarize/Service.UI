import './output.css';
import Main from './pages/Main';
import Groups from './pages/Groups';
import {Routes, Route, HashRouter} from "react-router-dom";
import React from "react";
import MainServicesForGroup from "./pages/MainServicesForGroup";
import AddGroup from "./pages/AddGroup";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import LogViewer from "./pages/LogViewer";


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
                <Route path={"logs/:serviceName"} element={<LogViewer />} />
            </Routes>
        </HashRouter>
    );
}
