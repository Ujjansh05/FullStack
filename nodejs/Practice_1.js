const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employees = [];

function showMenu() {
  console.log('\n--- Employee Management System ---');
  console.log('1. Add a new employee');
  console.log('2. List all employees');
  console.log('3. Remove an employee by ID');
  console.log('4. Exit');
  
  rl.question('Please choose an option: ', (option) => {
    handleMenuChoice(option.trim());
  });
}

function handleMenuChoice(option) {
  switch (option) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees();
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
      console.log('Exiting the application. Goodbye! 👋');
      rl.close();
      break;
    default:
      console.log('Invalid option. Please choose a number from 1 to 4.');
      showMenu();
      break;
  }
}

function addEmployee() {
  rl.question('Enter employee ID: ', (id) => {
    if (employees.some(emp => emp.id === id)) {
      console.log('❌ Error: An employee with this ID already exists.');
      showMenu();
      return;
    }
    
    rl.question('Enter employee name: ', (name) => {
      employees.push({ id, name });
      console.log(`✅ Employee "${name}" added successfully!`);
      showMenu();
    });
  });
}

function listEmployees() {
  if (employees.length === 0) {
    console.log('No employees found. The list is empty.');
  } else {
    console.log('\n--- List of Employees ---');
    employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}`);
    });
    console.log('-------------------------');
  }
  showMenu();
}

function removeEmployee() {
  rl.question('Enter the ID of the employee to remove: ', (id) => {
    const initialLength = employees.length;
    employees = employees.filter(emp => emp.id !== id);
    
    if (employees.length === initialLength) {
      console.log(`❌ Error: Employee with ID "${id}" was not found.`);
    } else {
      console.log(`✅ Employee with ID "${id}" removed successfully.`);
    }
    showMenu();
  });
}

console.log('Welcome to the Employee Management CLI!');
showMenu();
