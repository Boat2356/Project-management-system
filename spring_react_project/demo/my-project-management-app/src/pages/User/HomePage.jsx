import React from 'react'
import NewNavBar from '../../components/User/NewNavBar';
import Welcome from '../../components/User/Welcome';
import ProjectCard from '../../components/User/ProjectCard';

//หน้า home แบบสมบูรณ์
const HomePage = () => {

  return (
    <div>
      <NewNavBar />
      <Welcome/>
      <ProjectCard/>
    </div>
  )
}
export default HomePage;