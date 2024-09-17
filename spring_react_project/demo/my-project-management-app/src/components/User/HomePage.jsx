import React from 'react'
import NewNavBar from './NewNavBar'
import Welcome from './Welcome';
import ProjectCard from './ProjectCard';
import Footer from './Footer';

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