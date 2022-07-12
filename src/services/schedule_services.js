const schedule_api_url = "http://localhost:4000/api/schedules";

class schedule_service {
    
    async getSchedules(){
        // const response = await fetch(
        //     schedule_api_url).then((response) => response.json());
        // return response
      return fetch(schedule_api_url, function(err,res){
        return res;
      });
       //return res;
    }
    async addSchedules(input_body){

      return fetch(schedule_api_url, {
        method: 'post',
        //mode: 'no-cors',        
        body: JSON.stringify(input_body),
        headers: { "Content-Type": "application/json" },
       })
    }
    // createEmployee(employee){
    //     return axios.post(EMPLOYEE_API_BASE_URL, employee);
    // }

    // getEmployeeById(employeeId){
    //     return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    // }

    // updateEmployee(employee, employeeId){
    //     return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    // }

    // deleteEmployee(employeeId){
    //     return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    // }
}

export default new schedule_service()