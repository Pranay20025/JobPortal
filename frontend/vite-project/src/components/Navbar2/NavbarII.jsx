import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const NavbarII = () => {

  const {companiess} = useAuth();

  const { companyId } = useParams();
  const company = companiess.find((company) => company._id === companyId);

  
  return (
    
    <div className='navbar'>
    <div className="nav-menu">
     <Link to={`/getCompanies/${company._id}/addJob`}>Add Job</Link>
     <Link to={`/getCompanies/${company._id}/getJobs`}>Get Jobs</Link>
    </div>
  </div>
  )
}

export default NavbarII