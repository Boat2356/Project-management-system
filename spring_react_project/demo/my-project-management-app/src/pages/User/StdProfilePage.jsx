import React, {useEffect,useState} from 'react'
import StdSideBar from '../../components/User/StdSideBar';
import NewNavBar from '../../components/User/NewNavBar';
import StdProfile from '../../components/User/StdProfile';
import LoginNavBar from '../../components/User/LoginNavBar';


const StdProfilePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็คโทเคน
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);
    return (
        <div>
            {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
            <div className='d-flex'>
                <StdSideBar />
                <StdProfile />
            </div>
        </div>
    )
}
export default StdProfilePage;