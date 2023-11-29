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
  console.log("employee id : ", selectedEmployeeId);

  const employeeList = document.querySelector(".employee-name-list");
  const employeeInfo = document.querySelector(".employee-single-info");

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      console.log("selected employee id : ", selectedEmployeeId);
      renderEmployees();
      renderSingleEmployee();
    }
  });

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee-list-item");

      if (parseInt(selectedEmployeeId) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
        console.log("selected employee : ", selectedEmployee);
      }

      employee.setAttribute("id", emp.id);

      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i> <br/>`;
      employeeList.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    employeeInfo.innerHTML = `
    <div class="flex flex-col items-center jusify-center">
    <img class="w-56" src="${selectedEmployee.imageUrl}" alt="">
    <div class="flex flex-col ">
    <span>Name : ${selectedEmployee.firstName} ${selectedEmployee.lastName} </span>
    <span>age : ${selectedEmployee.age}</span>
    <span>contact : ${selectedEmployee.contactNumber}</span>
    <span>email : ${selectedEmployee.email}</span>
    <span>address : ${selectedEmployee.address}</span>
    </div>
    </div>
    `;
  };

  if (selectedEmployee) {
    renderSingleEmployee();
  }

  renderEmployees();
})();
