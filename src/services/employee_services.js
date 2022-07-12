const employee_api_url = "http://localhost:4000/api/employees";

class employee_services {
    
    async getEmployees(){
        // const response = await fetch(
        //     schedule_api_url).then((response) => response.json());
        // return response
      return fetch(employee_api_url, function(err,res){
        return res;
      });
       //return res;
    }
    async searchEmployees(key_word){
      // const response = await fetch(
      //     schedule_api_url).then((response) => response.json());
      // return response
    return fetch(employee_api_url + '/search/' + key_word, function(err,res){
      return res;
    });
     //return res;
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

export default new employee_services()