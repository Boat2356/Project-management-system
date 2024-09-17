import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NawNavBar from '../../components/User/NewNavBar';
import AdminDashboard from '../../components/Admin/AdminDashboard';

const AdminDashboardPage =()=> {
  return (
    <div>
      <NawNavBar />
            <div className='d-flex'>
                <AdminSidebar />
                <AdminDashboard />
            </div>
    </div>
  )
}
export default AdminDashboardPage;