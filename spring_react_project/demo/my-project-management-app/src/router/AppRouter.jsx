import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/Admin/AdminPage';
import UserPage from '../pages/User/UserPage';
import ProjectCrud from '../pages/Admin/ProjectPage';
import CourseCrud from '../pages/Admin/CoursePage';
import SupervisorCrud from '../pages/Admin/SupervisorPage';
import HomePage from '../pages/User/HomePage';
import StdProfilePage from '../pages/User/StdProfilePage';
import StdEditProfilePage from '../pages/User/StdEditProfilePage';
import StdAddProjectPage from '../pages/User/StdAddProjectPage';
import StdManageProjectPage from '../pages/User/StdManageProjectPage';
import AdminProfilePage from '../pages/Admin/AdminProfilePage';
import AdminEditProfilePage from '../pages/Admin/AdminEditProfilePage';
import AdminManageProjectPage from '../pages/Admin/AdminManageProjectPage';
import AdminManageSubjectPage from '../pages/Admin/AdminManageSubjectPage';
import AdminManageAdvisorPage from '../pages/Admin/AdminManageAdvisorPage';

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
            <Route path="/user/std-profile" element = {<StdProfilePage />} />  
            <Route path="/user/std-edit-profile" element = {<StdEditProfilePage />} />
            <Route path="/user/std-add-project" element = {<StdAddProjectPage />} />  
            <Route path="/user/std-manage-project" element = {<StdManageProjectPage />} /> 
            <Route path="/admin/profile" element = {<AdminProfilePage />} />  
            <Route path="/admin/edit-profile" element = {<AdminEditProfilePage />} />  
            <Route path="/admin/manage-project" element = {<AdminManageProjectPage />} />  
            <Route path="/admin/manage-subject" element = {<AdminManageSubjectPage />} />  
            <Route path="/admin/manage-advisor" element = {<AdminManageAdvisorPage />} />  

        </Routes>   
    </Router>
  );
};

export default AppRouter;