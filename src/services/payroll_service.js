const payroll_api_url = "http://localhost:4000/api/payroll";

class employee_services {
    
    async generateEmployeePayroll(id){
        console.log(id)
      return fetch(payroll_api_url+ "/" + id);
    // return fetch(payroll_api_url+ "/" + id, {
    //     method: 'post',
    //     //mode: 'no-cors',        
    //     headers: { "Content-Type": "application/json" },
    //    })
       //return res;
    }
    async generateEmployeeOldPayroll(id){
        
        return fetch(payroll_api_url+ "/old/" + id, function(err,res){
          return res;
        });
         //return res;
      }
     //return res;
  }


export default new employee_services();