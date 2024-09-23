import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdManageProject from '../../components/User/StdManageProject';


const StdManageProjectPage = () => {

    return (
        <div>
            <NewNavBar />
            <div className='d-flex'>
                <StdSideBar />
                <StdManageProject />
            </div>
        </div>
    )
}
export default StdManageProjectPage;