async function EmployeeFetchDate() {
    const res = await fetch('./data.json');
    const data = await res.json();
    console.log(data);
}
EmployeeFetchDate();