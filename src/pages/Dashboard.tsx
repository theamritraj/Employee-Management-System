import React, { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import { v4 as uuidv4 } from 'uuid';

const Dashboard: React.FC = () => {
  // Load employees from localStorage or initialize with an empty array
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Save employees to localStorage 
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addOrUpdateEmployee = (employee: Employee) => {
    if (employee.id) {
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    } else {
      employee.id = uuidv4();
      setEmployees([...employees, employee]);
    }
    setEditingEmployee(null);
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const editEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Manage Employees</h2>
      <EmployeeForm onSubmit={addOrUpdateEmployee} initialData={editingEmployee || undefined} />
      <EmployeeTable employees={employees} onEdit={editEmployee} onDelete={deleteEmployee} />
    </div>
  );
};

export default Dashboard;
