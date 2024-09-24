import React, { useEffect, useState } from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import EditProfile from '../../components/User/EditProfile';
import StdProtectedRoute from '../../components/User/StdProtectedRoute';

const StdEditProfilePage = () => {

    return (
        <div>
            <NewNavBar />
            <StdProtectedRoute>
                <div className='d-flex'>
                    <StdSideBar />
                    <EditProfile />
                </div>
            </StdProtectedRoute>
        </div>
    )
}
export default StdEditProfilePage;