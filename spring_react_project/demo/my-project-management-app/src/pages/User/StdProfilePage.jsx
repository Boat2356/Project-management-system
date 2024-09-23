import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdProfile from '../../components/User/StdProfile';


const StdProfilePage = () => {

    return (
        <div>
            <NewNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <StdProfile />
            </div>
        </div>
    )
}
export default StdProfilePage;