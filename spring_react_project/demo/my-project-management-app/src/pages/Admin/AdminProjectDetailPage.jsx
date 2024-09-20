import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminProjectDetail from '../../components/Admin/AdminProjectDetail';

const AdminProjectDetailPage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminProjectDetail/>
            </div>
    </div>
  )
}

export default AdminProjectDetailPage
