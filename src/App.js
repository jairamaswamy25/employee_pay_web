import './App.css';
import React from 'react';
import Schedules from "./components/schedules/schedules"
import AddSchedules from "./components/schedules/add_schedule"
import EditSchedules from "./components/schedules/edit_schedule"
import Employees from "./components/employees/employees"
import Payrolls from "./components/payrolls/payrolls"
import OldPayrolls from "./components/payrolls/old_payrolls"

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

          <Route exact path="/payrolls/:id" element={<Payrolls/>}/>
          <Route exact path="/payrolls/old/:id" element={<OldPayrolls/>}/>
          
        </Routes>

      </Router>
    </div>
  )
}

export default App;
