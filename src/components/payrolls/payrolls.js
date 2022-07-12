import Employee_Services from '../../services/employee_services'
import Payroll_Services from '../../services/payroll_service'
import React, {Component} from "react";
import '../schedules/schedules.css'
import { Link } from 'react-router-dom';
class payrolls extends Component{
  constructor(props){
    super(props)
    this.state = {
        payroll_details:[],
        employee_selected: "",
        is_loading:false,
        is_error:false
    }
    Payroll_Services.generateEmployeePayroll.bind(this)
}
async generateEmployeePayrollss(id){
  var payrolls = await (await Payroll_Services.generateEmployeePayroll(id)).json()
  console.log(payrolls)
  this.is_loading = false;
  this.is_error=false;
  if(payrolls)
  {
    this.setState({payroll_details:payrolls, is_loading:false});
  }
  
}

async componentDidMount(){
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    this.generateEmployeePayrollss(id)
}


  

renderTableHeader = () => {
    const headers_list=["Employee ID","Employee Name", "Total Salary", "tax", "Take Home", "Status", "Schedules"]
    return headers_list.map(header => <th key={header}>{header}</th>)
}
onEmployeeChanged = (event, itemRows) => {
    this.setState({employee_selected:event.target.value})
   
  }
renderTableRows = () => {
  const val = this.state.payroll_details;

  return ((<tr key={val._id}>
   
    <td>{val._id}</td>
    <td>{val.employee_first_name+ " " +val.employee_last_name}</td>
    <td>{val.payroll.total_salary}</td>
    <td>{val.payroll.tax}</td>
    <td>{val.payroll.take_home}</td>
    <td>{"Paid"}</td>
    <td>
    {val.payroll.schedules_paid.map((sch)=>(
           sch.start_time+"-"+sch.end_time + "\n"
        ))}

    </td>
    </tr>
))
    
//   return data.map((val) => (<tr key={val._id}>
   
//     <td>{val._id}</td>
//     <td>{val.employee_first_name+ " " +val.employee_last_name}</td>
//     <td>{val.payroll.total_salary}</td>
//     <td>{val.payroll.tax}</td>
//     <td>{val.payroll.take_home}</td>
//     <td>{"Paid"}</td>
//     <td>
//     {val.payroll.schedules_paid.map((sch)=>(
//            sch.start_time+"-"+sch.end_time + "\n"
//         ))}

//     </td>
//     </tr>
//     ));
    
}

render() {

  const {payroll_details,is_loading,is_error}=this.state
  if(is_loading){
      return <div>loading...</div>
  }
  if (is_error){
      return <div>error...</div>
  }
  return payroll_details.length>0 ?(
    <div>
<div className = "row">
                </div>
  <table className='schedules' >
    <thead><tr>{this.renderTableHeader()}</tr></thead>
    <tbody>{this.renderTableRows()}</tbody>
  </table> 
    </div>
       
  ): (<div>no users {this.state.payroll_details.length}</div>)
 
  }
  
}
export default payrolls;