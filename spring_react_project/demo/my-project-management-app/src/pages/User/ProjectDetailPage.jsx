import React, {useEffect,useState} from 'react'
import NewNavBar from '../../components/User/NewNavBar'
import ProjectDetail from '../../components/User/ProjectDetail'
import LoginNavBar from '../../components/User/LoginNavBar';
const ProjectDetailPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็ตโทเคน
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
      <ProjectDetail/>
    </div>
  )
}

export default ProjectDetailPage
