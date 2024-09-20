import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminEditProfile from '../../components/Admin/AdminEditProfile';

const AdminEditProfilePage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminEditProfile />
    
            </div>
    </div>
  )
}

export default AdminEditProfilePage