import './App.css';
import React from 'react';
import Schedules from "./components/schedules/schedules"
import AddSchedules from "./components/schedules/add_schedule"
import EditSchedules from "./components/schedules/edit_schedule"
import Employees from "./components/employees/employees"

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'


function App() {

  return (
    <div className='App'>
      <Router>
   
        <Routes>
          <Route exact path="/schedules" element={<Schedules/>}/>
          <Route exact path="/schedules/add" element={<AddSchedules/>}/>
          <Route exact path="/schedules/edit/:id" element={<EditSchedules/>}/>

          <Route exact path="/employees" element={<Employees/>}/>
          
        </Routes>

      </Router>
    </div>
  )
}

export default App;
