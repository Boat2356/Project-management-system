import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NewNavBar from '../../components/User/NewNavBar';
import AdminEditProfile from '../../components/Admin/AdminEditProfile';

const AdminEditProfilePage = () => {

  return (
    <div>
      <NewNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminEditProfile />
    
            </div>
    </div>
  )
}

export default AdminEditProfilePage