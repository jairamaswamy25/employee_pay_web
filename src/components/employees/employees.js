import Employee_Services from '../../services/employee_services'
import React, {Component} from "react";
import '../schedules/schedules.css'
import { Link } from 'react-router-dom';
class employees extends Component{
  constructor(props){
    super(props)
    this.state = {
        employee_details:[],
        employee_selected: "",
        is_loading:false,
        is_error:false
    }
    Employee_Services.getEmployees.bind(this)
    // this.add_schedule = this.add_schedule.bind(this);
    // this.edit_schedule = this.edit_schedule.bind(this);
    // this.delete_schedule = this.delete_schedule.bind(this);
}
async getEmployeess(){
  var employees = await (await Employee_Services.getEmployees()).json()
  this.is_loading = false;
  this.is_error=false;
  this.setState({employee_details:employees, is_loading:false});
}

async componentDidMount(){
  this.getEmployeess()
}

generatePayroll = async (event) => {
    window.location.href="/payrolls/" + this.state.employee_selected 
};
  generateOldPayroll = async (event) => {
    event.preventDefault();
   // const old_payroll_report = await (await Payroll_Services.generateEmployeeOldPayroll(this.state.employee_selected)).json()
    window.location.href="/payrolls/old/" + this.state.employee_selected 
    
  }

renderTableHeader = () => {
    const headers_list=["select","_id", "employee_first_name", "employee_last_name", "Edit/Delete"]
    return headers_list.map(header => <th key={header}>{header}</th>)
}
onEmployeeChanged = (event, itemRows) => {
    this.setState({employee_selected:event.target.value})
   
  }
renderTableRows = () => {
  const data = this.state.employee_details;

  return data.map((val) => (<tr key={val._id}>
    <td>
              <input
                type="radio"
                name="radioButton"
                value={val._id}
                checked={this.state.employee_selected===val._id}
                onChange={this.onEmployeeChanged}
              />
            </td>
    <td>{val._id}</td>
    <td>{val.employee_first_name}</td>
    <td>{val.employee_last_name}</td>
    <td>
        <button
          type="button"
          onClick={ () => this.edit_schedule(val._id)}
        >
          Edit
        </button>
        <button type="button" onClick={ () => this.delete_schedule(val._id)}>
          Delete
        </button>
        
      </td>
    </tr>
    ));
    
}

render() {

  const {employee_details,is_loading,is_error}=this.state
  if(is_loading){
      return <div>loading...</div>
  }
  if (is_error){
      return <div>error...</div>
  }
  return employee_details.length>0 ?(
    <div>
<div className = "row">
{/* <Link className="d-grid gap-2" to='/payrolls'> */}
<button className="btn btn-primary" onClick={this.generatePayroll}> Generate Employee Payroll </button>
                 
 {/* </Link>  */}
 {/* <Link className="d-grid gap-2" to='/payrolls/old/:id'> */}
<button className="btn btn-primary" onClick={this.generateOldPayroll}> Generate Employee old Payroll</button>
                 
 {/* </Link>  */}
                   </div>
  <table className='schedules' >
    <thead><tr>{this.renderTableHeader()}</tr></thead>
    <tbody>{this.renderTableRows()}</tbody>
  </table> 
    </div>
       
  ): (<div>no users {this.state.employee_details.length}</div>)
 
  }
  
}
export default employees;