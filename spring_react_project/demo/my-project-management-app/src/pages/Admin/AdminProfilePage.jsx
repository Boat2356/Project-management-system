import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminProfile from '../../components/Admin/AdminProfile';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminProfilePage = () => {
  return (
    <div>
      <NawNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminProfile />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminProfilePage
