import Schedule_Services from '../../services/schedule_services'
import React, {Component} from "react";
import './schedules.css'
import { Link } from 'react-router-dom';
class schedules extends Component{
  constructor(props){
    super(props)
    this.state = {
        schedule_details:[],
        is_loading:false,
        is_error:false
    }
    Schedule_Services.getSchedules.bind(this)
    //this.add_schedule = this.add_schedule.bind(this);
    this.edit_schedule = this.edit_schedule.bind(this);
    this.delete_schedule = this.delete_schedule.bind(this);
}
async getScheduless(){
  var scheduless = await (await Schedule_Services.getSchedules()).json()
  //const scheduless = res.
  //console.log("good boy" + scheduless.length)
  this.is_loading = false;
  this.is_error=false;
  // this.setState({schedule_details:scheduless, is_loading:false}, () => {                              
  // console.log(this.state.schedule_details) });
  this.setState({schedule_details:scheduless, is_loading:false});
  
  //Schedule_Services.getSchedules(function(err,res){
  //   var scheduless =[]
  //   scheduless = res.json()
  //      console.log("good boy")
  //      this.is_loading = false;
  //      this.is_error=false; 
  // //   if (res.ok){
  // //      scheduless = res.json()
  // //      console.log("good boy")
  // //      this.is_loading = false;
  // //      this.is_error=false;  
  // //  }
  // //  else{
  // //   this.is_error=true;
  // //   this.is_loading=false;
  // //   console.log("bad boy")
  // //  }
  //  this.setState({schedule_details:scheduless, is_loading:false}, () => {                              
  //   console.log(this.state.schedule_details) });
  // });
}

async componentDidMount(){
  this.getScheduless()
}
// add_schedule(){
//   this.props.history.push('/schedules/add');
// }
edit_schedule(id){
  this.props.history.push('/schedules/edit/${id}');
}
delete_schedule(id){
  this.props.history.push('/schedules/delete/${id}');
}

renderTableHeader = () => {
  const headers = Object.keys(this.state.schedule_details[0]);
  const headers_list=["_id", "Employee", "start_time", "end_time", "scheduled_hours", "salary", "paid", "Edit/Delete"]
  return headers_list.map(header => <th key={header}>{header}</th>)
}

renderTableRows = () => {
  const data = this.state.schedule_details;

  return data.map((val) => (<tr key={val._id}>
    <td>{val._id}</td>
    <td>{val.Employee.employee_first_name+ " " + val.Employee.employee_last_name}</td>
    <td>{val.start_time}</td>
    <td>{val.end_time}</td>
    <td>{val.scheduled_hours}</td>
    <td>{val.salary}</td>
    <td>{val.paid}</td>
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

  const {schedule_details,is_loading,is_error}=this.state
  if(is_loading){
      return <div>loading...</div>
  }
  if (is_error){
      return <div>error...</div>
  }
  return schedule_details.length>0 ?(
    <div>
<div className = "row">
<Link className="d-grid gap-2" to='/schedules/add'>
<button className="btn btn-primary"> Add Schedule</button>
                 
 </Link> 
                   </div>
  <table className='schedules' >
    <thead><tr>{this.renderTableHeader()}</tr></thead>
    <tbody>{this.renderTableRows()}</tbody>
  </table> 
    </div>
       
  ): (<div>no users {this.state.schedule_details.length}</div>)
 
  }
  
}
export default schedules;