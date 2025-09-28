import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Admin from './pages/admin/Admin'
import AddCompany from './pages/AddCompany/AddCompany'
import GetCompanies from './pages/GetCompanies/GetCompanies'
import AddJob from './pages/AddJobs/AddJob'
import GetJobs from './pages/GetJobs/GetJobs'
import Job from './pages/Job/Job'
import Profile from './pages/Profile/Profile'
import GetApplicant from './pages/GetApplicant/GetApplicant'

function App() {

  return (
    <>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/login" element={<Login />} />
    <Route path="/addCompany" element={<AddCompany/>} />
    <Route path="/Profile" element={<Profile/>} />
    <Route path="/getCompanies" element={<GetCompanies />} />
    <Route path="/getCompanies/:companyId" element={<Job />} />
    <Route path="/getCompanies/:companyId/addJob" element={<AddJob />} />
    <Route path="/getCompanies/:companyId/getJobs" element={<GetJobs />} />
    <Route path="/getCompanies/:companyId/getJobs/:jobId" element={<GetApplicant />} />
  </Routes>
  <Footer/>
    </>
  )
}

export default App
