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

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  // Set Employee age to be entered minimum 18 years
  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    // console.log(values);
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    //console.log(empData);
    empData.id = employees[employees.length - 1].id + 1;
    empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      console.log("selected employee id : ", selectedEmployeeId);
      renderEmployees();
      renderSingleEmployee();
    }

    // Employee Delete Logic - START
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
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
    // Employee Delete Logic - START
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
     // Employee Delete Logic - END
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
