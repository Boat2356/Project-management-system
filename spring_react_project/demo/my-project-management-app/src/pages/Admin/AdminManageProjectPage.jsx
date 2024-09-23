import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageProject from '../../components/Admin/AdminManageProject';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminManageProjectPage = () => {
  return (
    <div>
      <NawNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminManageProject />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminManageProjectPage