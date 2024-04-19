import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

export default function Request() {
  const auth = useAuth();

  interface Request {
    id: number;
    codigo: string;
    descripcion: string;
    resumen: string;
  }

  const [request, setRequest] = useState<Request[]>([]);


  async function getRequest() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/request`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setRequest(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createRequest() {
    
      try {
        const response = await fetch(`${API_URL}/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({  }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Request;
          setRequest([...request, todo]);
        }
      } catch (error) {}
    
  }

  useEffect(() => {
    getRequest();
  }, []);

  

  return (
    <PortalLayout>
      <div className="dashboard">
        <h1>Lista de Solicitudes</h1>
        <div style={{display:'flex'}} >
        <div style={{width:'33%'}}><h3>Codigo</h3></div>
        <div style={{width:'33%'}}><h3>Descripcion</h3></div>
        <div style={{width:'33%'}}><h3>Resumen</h3></div>

        </div>
        {request.map((request: Request) => (
          <div style={{display:'flex'}} key={request.id}>
            <div style={{width:'33%'}}>
                  
                  <p>{request.codigo}</p>
            </div>
            <div style={{width:'33%'}}>
                  
                  <p>{request.descripcion}</p>
            </div>
            <div style={{width:'33%'}}>
                  
                  <p>{request.resumen.toString()}</p>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}

