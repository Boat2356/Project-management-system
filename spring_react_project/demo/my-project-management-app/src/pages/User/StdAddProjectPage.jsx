import React from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NawNavBar from '../../components/User/NewNavBar';
import StdAddProject from '../../components/User/StdAddProject';

const StdAddProjectPage = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <StdAddProject />
            </div>
        </div>
    )
}
export default StdAddProjectPage;