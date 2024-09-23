import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import EditProfile from '../../components/User/EditProfile';


const StdEditProfilePage = () => {

    return (
        <div>
            <NewNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <EditProfile />
            </div>
        </div>
    )
}
export default StdEditProfilePage;