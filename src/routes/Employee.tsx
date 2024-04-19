import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface Employee {
  id: number;
  nombre: string;
  salario: number;
  fecha_ingreso: Date;
}

export default function Employee() {
  const auth = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);
  

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/employee`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setEmployees(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createEmployee() {
    
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: "" }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Employee;
          setEmployees([...employees, todo]);
        }
      } catch (error) {}
    
  }

  useEffect(() => {
    getTodos();
  }, []);

  

  return (
    <PortalLayout>
      <div className="dashboard">
        <h1>Lista de empleados</h1>
        <div style={{display:'flex'}} >
        <div style={{width:'33%'}}><h3>Nombre</h3></div>
        <div style={{width:'33%'}}><h3>Salario</h3></div>
        <div style={{width:'33%'}}><h3>Fecha Ingreso</h3></div>

        </div>
        {employees.map((employee: Employee) => (
          <div style={{display:'flex'}} key={employee.id}>
            <div style={{width:'33%'}}>
                  
                  <p>{employee.nombre}</p>
            </div>
            <div style={{width:'33%'}}>
                  
                  <p>{employee.salario}</p>
            </div>
            <div style={{width:'33%'}}>
                  
                  <p>{employee.fecha_ingreso.toString()}</p>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
