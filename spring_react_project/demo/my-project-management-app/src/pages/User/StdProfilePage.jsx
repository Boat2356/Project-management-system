import React, { useEffect, useState } from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdProfile from '../../components/User/StdProfile';
import StdProtectedRoute from '../../components/User/StdProtectedRoute';

const StdProfilePage = () => {

    return (
        <div>
            <NewNavBar />
            <StdProtectedRoute>
                <div className='d-flex'>
                    <StdSideBar />
                    <StdProfile />
                </div>
            </StdProtectedRoute>
        </div>
    )
}
export default StdProfilePage;