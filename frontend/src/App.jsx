import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/student/HomePage'
import OfferedCourses from './pages/student/OfferedCourses'
import MyEnrollments from './pages/student/MyEnrollments'
import CourseDetails from './pages/student/CourseDetails'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Prof from './pages/prof/Prof'
import AddCourse from './pages/prof/AddCourse'
import MyCourses from './pages/prof/MyCourses'
import Dashboard from './pages/prof/Dashboard'
import StudentsEnrolled from './pages/prof/StudentsEnrolled'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/offered-course' element={<OfferedCourses />}/>
        <Route path='/offered-course/:input' element={<OfferedCourses />}/>
        <Route path='/course/:id' element={<CourseDetails />}/>
        <Route path='/my-enrollments' element={<MyEnrollments />}/>
        <Route path='/player/:courseID' element={<Player />}/>
        <Route path='/loading/:path' element={<Loading />}/>
        <Route path='/prof' element={<Prof />}>
          <Route path='' element={<Dashboard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-course' element={<MyCourses/>}/>
          <Route path='enrolled-students' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>      
    </div>
  )
}

export default App