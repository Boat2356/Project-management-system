import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdManageProject from '../../components/User/StdManageProject';
import LoginNavBar from '../../components/User/LoginNavBar';


const StdManageProjectPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็ตโทเคน
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

    return (
        <div>
            {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
            <div className='d-flex'>
                <StdSideBar />
                <StdManageProject />
            </div>
        </div>
    )
}
export default StdManageProjectPage;