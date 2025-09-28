import React from 'react'
import "./Hero.css"

const Hero = () => {
  return  (
    <div className='hero'>
    <div className='hero__container'>
     <center> <button className='heading'>No. 1 Website for Coders</button></center>
      <pre><h1>Search Apply And Get Your <h1 className='horizon'>          Dream Jobs</h1></h1></pre>
      <div className='hero__search'>
        <input type="text" placeholder="Search for jobs"/>
        <button>Search</button>
      </div>
      <pre className='hero__description'>
         Welcome to CodeHorizon, your ultimate destination for tech and coding careers. Whether you’re a seasoned developer or a passionate newcomer, CodeHorizon connects you with opportunities to innovate and grow.
        </pre>
    </div>
    </div>
  )
}


export default Hero