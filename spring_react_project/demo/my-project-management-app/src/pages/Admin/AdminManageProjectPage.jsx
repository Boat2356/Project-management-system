import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageProject from '../../components/Admin/AdminManageProject';

const AdminManageProjectPage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminManageProject />
    
            </div>
    </div>
  )
}

export default AdminManageProjectPage