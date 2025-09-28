import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Hero from '../../components/Navbar/Hero/Hero'
import CategoryPannel from '../../components/CategoryPannel/CategoryPannel'
import Opportunity from '../../components/Opportunity/Opportunity'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CategoryPannel/>
      <Opportunity/>
    </div>
  )
}

export default Home