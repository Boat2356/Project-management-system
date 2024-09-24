import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageAdvisor from '../../components/Admin/AdminManageAdvisor';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminManageAdvisorPage = () => {
  return (
    <div>
      <NawNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminManageAdvisor />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminManageAdvisorPage