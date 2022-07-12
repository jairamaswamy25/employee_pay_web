import React, {Component, useState} from "react";
import Employee_Services from '../../services/employee_services'
import Schedule_Services from '../../services/schedule_services'
import Search from './search_employee'
import moment from "moment"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {AutoComplete} from 'react-autocomplete'
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
class add_schedule extends Component{
  //const [search_employees, setSearchEmployees] = useState();
  constructor(props){
    super(props)
    this.state = {
        employee_details:[],
        //search_employees:[],
        employee_selected: "",
        employee_id:"",
        schedule_start_time:"",
        schedule_end_time:"",
        is_loading:false,
        is_error:false
    }
    Employee_Services.getEmployees.bind(this)
    Employee_Services.searchEmployees.bind(this)
   
  }
  
  async getEmployeess(){
    var employeess = await (await Employee_Services.getEmployees()).json()
    this.is_loading = false;
    this.is_error=false;
    this.setState({employee_details:employeess, is_loading:false});
  }
  handleAddFormSubmit = async (event) => {
    event.preventDefault();
   
    const start_time = moment(new Date(this.state.schedule_start_time)).format("yyyy-MM-DDTHH:mm:ss.SSS").toString()
    const end_time = moment(new Date(this.state.schedule_end_time)).format("yyyy-MM-DDTHH:mm:ss.SSS").toString()
    const employee_id = this.state.employee_selected

    const input_body =  {
      "start_time":start_time,"end_time":end_time,"_id":employee_id
    }
    console.log(start_time)
    console.log(end_time)
    const res = await Schedule_Services.addSchedules(input_body)
    if(res.ok){
      //navigate('/schedules');
      //this.props.hi
      window.location.href="/schedules"
    }
    console.log(end_time)
    //console.log(new Date(this.state.schedule_start_time).toLocaleString())
  
    
    
  };
  async componentDidMount(){
    this.getEmployeess()
  }
  
  // async SearchEmployees (key_word) {
  //   var search_employeess =[]
  //   if (key_word!=="")
  //   {
  //     search_employeess = await (await Employee_Services.searchEmployees(key_word)).json()
  //     //console.log(search_employeess);
  //     this.setState({search_employees:search_employeess});
  //     //console.log(search_employeess);
      
  //     //console.log(this.state.search_employees);
  //   }
    
  //   return search_employeess;
  // }

  onEmployeeChanged = (event, itemRows) => {
    this.setState({employee_selected:event.target.value})
   
  }
  setScheduleStartTime = (event)=>{
    this.setState({schedule_start_time:event.target.value})
  }
  setScheduleEndTime = (event)=>{
    this.setState({schedule_end_time:event.target.value})
  }


  renderTableHeader = () => {
  const headers_list=["select","_id", "employee_first_name", "employee_last_name"]
  return headers_list.map(header => <th key={header}>{header}</th>)
  }
  
  renderTableRows = () => {
    const data = this.state.employee_details;

  return data.map((val) => (<tr key={val._id}>
     <td>
              <input
                type="radio"
                name="radioButton"
                value={val._id}
                checked={this.state.employee_selected==val._id}
                onChange={this.onEmployeeChanged}
              />
            </td>
    <td>{val._id}</td>
    <td>{val.employee_first_name}</td>
    <td>{val.employee_last_name}</td>
    </tr>
    ));
      
  }


  
  render() {
    
  //console.log(this.state.search_employees)
    return (
      <div>
        <h1>add schedule</h1>
        {/* <div>
          <ReactSearchAutocomplete
            items={this.state.search_employees}
            onSearch={this.handleOnSearch}
            onHover={this.handleOnHover}
            onSelect={this.handleOnSelect}
            onFocus={this.handleOnFocus}
            //formatResult={this.formatResult}
            styling={{ zIndex: 1 }}
            autoFocus
          />
          </div> */}
       <Search></Search>
         
        <form onSubmit={this.handleAddFormSubmit}>
        <div>
          <input
            type="datetime-local"
            name="start_time"
            required="required"
            placeholder="Enter Start time..."
            onChange={this.setScheduleStartTime}
            value={this.state.schedule_start_time}
  
          />
          <input
            type="datetime-local"
            name="end_time"
            required="required"
            placeholder="Enter end time..."
            onChange={this.setScheduleEndTime}
            value={this.state.schedule_end_time}
  
          />
          <br></br>
          <button type="submit">Add</button>
          <table className='schedules' >
      <thead><tr>{this.renderTableHeader()}</tr></thead>
      <tbody>{this.renderTableRows()}</tbody>
    </table> 
          </div>      
          
        </form>
        
        <div>
        
        </div>
      
        
      </div>
    ) 
   
    }
}



export default add_schedule
