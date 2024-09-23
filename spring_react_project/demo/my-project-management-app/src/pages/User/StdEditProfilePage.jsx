import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import EditProfile from '../../components/User/EditProfile';
import LoginNavBar from '../../components/User/LoginNavBar';


const StdEditProfilePage = () => {
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
                <EditProfile />
            </div>
        </div>
    )
}
export default StdEditProfilePage;