// import React, { useState } from "react";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import { seriesSuggestions } from "./tmdb-query";
// import Episode from "./Episode.js";

import React, {useState} from "react";
import Employee_Services from '../../services/employee_services'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default  function SearchEmployee() {
  //const [tv_object, setTv_object] = useState();

  // search functions
  const [currentInput, setCurrentInput] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchEmployees, setSearchEmployees] = useState();
  const [search_employees_input, setSearchEmployeesInput] = useState("");


//   async function SearchEmployees (key_word) {
//     var search_employeess =[]
//     if (key_word!=="")
//     {
//       search_employeess =  (await Employee_Services.searchEmployees(key_word)).json()
//       //console.log(search_employeess);
//       this.setState({search_employees:search_employeess});
//       //console.log(search_employeess);
      
//       //console.log(this.state.search_employees);
//     }
// }

  const handleOnSearch = async (string, results) => {
    setSearchString(string);
    setCurrentInput(string);

    //let list =  await this.SearchEmployees(string);
    let list= [];
    if (string!=="")
     {
     list =  await (await Employee_Services.searchEmployees(string)).json()
     }
    //list = await seriesSuggestions(string);
    //console.log(list)
    setSearchEmployees(list);
    console.log(searchEmployees)
    //console.log("resulttssss");

    console.log(string, results);
    return results;

    //console.log(string);
  };

  const handleOnClear = () => {
    console.log("Cleared");
    setSearchString("");
    setCurrentInput("");
  };

  const clearSearchBox = () => {
    setSearchString("");
    setCurrentInput("");
  };
const formatResult = (item) => {
    console.log(item)
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item._id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.employee_first_name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.employee_last_name}</span>
      </>
    )
  }
  const handleOnSelect = (data) => {
    try {
      console.log(data.id);
    } catch (err) {
      console.log(err);
      return;
    }
    setSearchString("");
    setCurrentInput("");
  };

  // search functions

  return (
    <div className="schedules">
      
          <ReactSearchAutocomplete
            onSelect={handleOnSelect}
            items={searchEmployees}
            onSearch={handleOnSearch}
            onClear={handleOnClear}
            formatResult={formatResult}
            inputSearchString={searchString}
            inputDebounce={500}
            autoFocus
          />
    </div>
  );
}

