import React from 'react'
import NewNavBar from '../../components/User/NewNavBar';
import Welcome from '../../components/User/Welcome';
import ProjectCard from '../../components/User/ProjectCard';
import Footer from '../../components/User/Footer';

//หน้า home แบบสมบูรณ์
const HomePage = () => {
  return (
    <div>
      <NewNavBar/>
      <Welcome/>
      <ProjectCard/>
      <Footer/>
    </div>
  )
}
export default HomePage;