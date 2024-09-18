import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminManageSubject from '../../components/Admin/AdminManageSubject';

const AdminManageSubjectPage = () => {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminManageSubject />
    
            </div>
    </div>
  )
}

export default AdminManageSubjectPage