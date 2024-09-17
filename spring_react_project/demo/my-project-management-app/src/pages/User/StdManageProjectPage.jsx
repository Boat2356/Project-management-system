import React from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NawNavBar from '../../components/User/NewNavBar';
import StdManageProject from '../../components/User/StdManageProject';

const StdManageProjectPage = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <StdManageProject />
            </div>
        </div>
    )
}
export default StdManageProjectPage;