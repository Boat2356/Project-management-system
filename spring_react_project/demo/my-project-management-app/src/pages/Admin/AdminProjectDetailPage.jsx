import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminProjectDetail from '../../components/Admin/AdminProjectDetail';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminProjectDetailPage = () => {
  return (
    <div>
      <NawNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminProjectDetail />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminProjectDetailPage
