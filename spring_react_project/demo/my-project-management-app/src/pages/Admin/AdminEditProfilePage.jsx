import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NewNavBar from '../../components/User/NewNavBar';
import AdminEditProfile from '../../components/Admin/AdminEditProfile';
import AdminProtectedRoute from '../../components/Admin/AdminProtectedRoute';

const AdminEditProfilePage = () => {

  return (
    <div>
      <NewNavBar />
      <AdminProtectedRoute>
        <div className='d-flex'>
          <AdminSidebar />
          <AdminEditProfile />
        </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default AdminEditProfilePage