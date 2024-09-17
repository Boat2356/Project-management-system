import React from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NawNavBar from '../../components/User/NewNavBar';
import StdProfile from '../../components/User/StdProfile';

const StdProfilePage = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <StdProfile />
            </div>
        </div>
    )
}
export default StdProfilePage;