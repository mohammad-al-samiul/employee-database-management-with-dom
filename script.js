// (async function () {
//   const res = await fetch("./data.json");
//   const data = await res.json();

//   const employees = data;
//   let selectedEmployeeId = employees[0].id;
//   let selectedEmployee = employees[0];

//   const employeeList = document.querySelector(".employee_name_list");

//   const renderEmployees = () => {
//     employeeList.innerHTML = "";
//     employees.forEach((emp) => {
//         const employee = document.createElement("span");
//         employee.classList.add("employee-list-item");

//         if(parseInt(selectedEmployeeId) === emp.id){
//             employee.classList.add("selected");
//             selectedEmployee = emp;
//         }
//         employee.setAttribute("id", emp.id);
//         employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i> <br/>`;
//         employeeList.append(employee);
//     });
//   };

//   renderEmployees();
// })();

(async function () {
  const res = await fetch("./data.json");
  const data = await res.json();

  const employees = data;

  let selectedEmployee = employees[0];
  //console.log(selectedEmployee);
  let selectedEmployeeId = employees[0].id;
  //   console.log(selectedEmployeeId);

  const employeeList = document.querySelector(".employee-name-list");

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee-list-item");

      if (parseInt(selectedEmployeeId) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i> <br/>`;
      employeeList.append(employee);


    });
  };

  renderEmployees();
})();
