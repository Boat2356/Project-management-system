import React,{useEffect,useState} from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar';
import NewNavBar from '../../components/User/NewNavBar';
import AdminEditProfile from '../../components/Admin/AdminEditProfile';
import LoginNavBar from '../../components/User/LoginNavBar';

const AdminEditProfilePage = () => {
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
                <AdminSidebar />
                <AdminEditProfile />
    
            </div>
    </div>
  )
}

export default AdminEditProfilePage