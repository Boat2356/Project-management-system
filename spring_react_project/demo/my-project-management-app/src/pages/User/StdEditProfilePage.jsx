import React from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NawNavBar from '../../components/User/NewNavBar';
import EditProfile from '../../components/User/EditProfile';

const StdEditProfilePage = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <EditProfile />
            </div>
        </div>
    )
}
export default StdEditProfilePage;