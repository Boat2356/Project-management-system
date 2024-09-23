import React, {useEffect,useState} from 'react'
import NewNavBar from '../../components/User/NewNavBar';
import Welcome from '../../components/User/Welcome';
import ProjectCard from '../../components/User/ProjectCard';
import LoginNavBar from '../../components/User/LoginNavBar';

//หน้า home แบบสมบูรณ์
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็ตโทเคน
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
      <Welcome/>
      <ProjectCard/>
    </div>
  )
}
export default HomePage;