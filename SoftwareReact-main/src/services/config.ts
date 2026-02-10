export const API_URL = "http://localhost:3000/api";

// Cambiamos el nombre aquí para que los otros archivos no den error
export interface FormDataAnexoManual {
  nombre_ejecutor: string;
  rut_ejecutor: string;
  telefono_ejecutor: string;
  direccion_ejecutor: string;
  comuna_ejecutor: string;
  region_ejecutor: string;
  entidad_requirente: string;
  codigo_curso: string;
  horas_totales: string | number;
  objetivo_general: string;
  contenidos: string;
  [key: string]: any; 
}

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Sesión expirada.");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};