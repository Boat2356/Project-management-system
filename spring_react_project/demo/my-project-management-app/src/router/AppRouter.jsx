import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/Admin/AdminPage';
import UserPage from '../pages/User/UserPage';
import ProjectCrud from '../pages/Admin/ProjectPage';
import CourseCrud from '../pages/Admin/CoursePage';
import SupervisorCrud from '../pages/Admin/SupervisorPage';
import HomePage from '../pages/User/HomePage';
import StdProfile from '../pages/User/StdProfile'; 
import EditProfile from '../pages/User/EditProfile';
import StdAddProject from '../pages/User/StdAddProject';
import StdManageProject from '../pages/User/StdManageProject';

function AppRouter(){
  return (
    <Router>           
        <Routes>
            <Route path="/admin" element = {<AdminPage />} />
            <Route path="/admin/project-crud" element = {<ProjectCrud />} />
            <Route path="/admin/course-crud" element = {<CourseCrud />} />
            <Route path="/admin/supervisor-crud" element = {<SupervisorCrud />} />
            <Route path="/user" element = {<UserPage />} />
            <Route path="/home-page" element = {<HomePage />} /> 
            <Route path="/user/std-profile" element = {<StdProfile />} />  
            <Route path="/user/edit-profile" element = {<EditProfile />} />
            <Route path="/user/std-add-project" element = {<StdAddProject />} />  
            <Route path="/user/std-manage-project" element = {<StdManageProject />} /> 
        </Routes>   
    </Router>
  );
};

export default AppRouter;