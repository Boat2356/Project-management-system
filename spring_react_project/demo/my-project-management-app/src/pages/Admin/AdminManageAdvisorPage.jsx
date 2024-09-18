import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageAdvisor from '../../components/Admin/AdminManageAdvisor';

const AdminManageAdvisorPage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminManageAdvisor />
    
            </div>
    </div>
  )
}

export default AdminManageAdvisorPage