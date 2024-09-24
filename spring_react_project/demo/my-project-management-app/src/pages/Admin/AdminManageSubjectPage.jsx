import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageSubject from '../../components/Admin/AdminManageSubject';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminManageSubjectPage = () => {
  return (
    <div>
      <NawNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminManageSubject />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminManageSubjectPage