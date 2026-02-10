import axios from "axios";
import { API_URL, getAuthHeaders, type FormDataAnexoManual } from "./config";

// 🔹 Obtener UN solo anexo por ID 
export const obtenerAnexoPorId = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/anexos/${id}`, /*getAuthHeaders()*/);
    return response.data;
  } catch (error: any) {
    throw new Error("No se pudo obtener el detalle del anexo.");
  }
};

// 🔹 Actualizar un anexo existente
export const actualizarAnexo = async (id: string | number, formData: Partial<FormDataAnexoManual>) => {
  try {
    const response = await axios.patch(`${API_URL}/anexos/${id}`, formData, /*getAuthHeaders()*/);
    return response.data;
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "Error al actualizar el anexo";
    throw new Error(mensaje);
  }
};