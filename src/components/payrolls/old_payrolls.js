import Payroll_Services from '../../services/payroll_service'
import React, {Component} from "react";
import '../schedules/schedules.css'
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom';
class old_payolls extends Component{
  constructor(props){
    super(props)
    this.state = {
        old_payroll_details:[],
        employee_selected: "",
        is_loading:false,
        is_error:false
    }
    Payroll_Services.generateEmployeeOldPayroll.bind(this)
}
async generateEmployeeOldPayrollss(id){
  
  var old_payrolls = await (await Payroll_Services.generateEmployeeOldPayroll(id)).json()
  this.is_loading = false;
  this.is_error=false;
  this.setState({old_payroll_details:old_payrolls, is_loading:false});
}

async componentDidMount(){
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    this.generateEmployeeOldPayrollss(id)
}


  

renderTableHeader = () => {
    const headers_list=["paroll_id","Employee_name", "Total Salary", "tax", "Take Home", "schedules"]
    return headers_list.map(header => <th key={header}>{header}</th>)
}

renderTableRows = () => {
  const data = this.state.old_payroll_details;

  return data.map((val) => (<tr key={val._id}>
   
    <td>{val._id}</td>
    <td>{val.Employee.employee_first_name + " " +val.Employee.employee_last_name}</td>
    <td>{val.total_salary}</td>
    <td>{val.tax}</td>
    <td>{val.take_home}</td>
    <td>
        {val.schedules_paid.map((sch)=>(
           sch.start_time+"-"+sch.end_time + "\n"
        ))}


    </td>
    </tr>
    ));
    
}

render() {
  const {old_payroll_details,is_loading,is_error}=this.state
  if(is_loading){
      return <div>loading...</div>
  }
  if (is_error){
      return <div>error...</div>
  }
  return old_payroll_details.length>0 ?(
    <div>
<div className = "row">
                </div>
  <table className='schedules' >
    <thead><tr>{this.renderTableHeader()}</tr></thead>
    <tbody>{this.renderTableRows()}</tbody>
  </table> 
    </div>
       
  ): (<div>no users {this.state.old_payroll_details.length}</div>)
 
  }
  
}
export default old_payolls;