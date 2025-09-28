import React from 'react'
import "./Job.css"
import NavbarII from '../../components/Navbar2/NavbarII'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../AuthContext'


const Job = () => {

const {companiess} = useAuth();

const { companyId } = useParams();
const company = companiess.find((company)=>{
  company._id === Number(companyId);
});

  return (
    <div>
     <NavbarII></NavbarII>
    </div>
  )
}

export default Job