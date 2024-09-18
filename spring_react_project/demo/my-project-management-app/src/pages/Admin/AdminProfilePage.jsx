import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminProfile from '../../components/Admin/AdminProfile';

const AdminProfilePage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminProfile />
            </div>
    </div>
  )
}

export default AdminProfilePage
