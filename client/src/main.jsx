import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Auth.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddCourse from './pages/admin/AddCourse.jsx'
import AddLecture from './pages/admin/AddLecture.jsx'
import AddUser from './pages/admin/AddUser.jsx'

import DashboardI from './pages/instructor/Dashboard.jsx'
import ViewCourse from './component/ViewCourse.jsx'
import ViewLecture from './component/ViewLecture.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin/addCourse' element={<div className='app-container'><Dashboard /> <AddCourse /></div>}></Route>
        <Route path='/admin/addLecture' element={<div className='app-container'><Dashboard /> <AddLecture /></div>}></Route>
        <Route path='/admin/addUser' element={<div className='app-container'><Dashboard /> <AddUser /></div>}></Route>
        <Route path='/admin/viewCourse' element={<div className='app-container'><Dashboard /> <ViewCourse /></div>}></Route>
        <Route path='/admin/viewLecture' element={<div className='app-container'><Dashboard /> <ViewLecture /></div>}></Route>

        <Route path='/user/viewCourse' element={<div className='app-container'><DashboardI /> <ViewCourse /></div>}></Route>
        <Route path='/user/viewLecture' element={<div className='app-container'><DashboardI /> <ViewLecture /></div>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
