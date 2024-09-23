import React from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdManageProject from '../../components/User/StdManageProject';
import StdProtectedRoute from '../../components/User/StdProtectedRoute';

const StdManageProjectPage = () => {

    return (
        <div>
            <NewNavBar />
            <StdProtectedRoute>
                <div className='d-flex'>
                    <StdSideBar />
                    <StdManageProject />
                </div>
            </StdProtectedRoute>
        </div>
    )
}
export default StdManageProjectPage;