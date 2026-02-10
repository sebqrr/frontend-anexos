import axios from "axios";
import { API_URL, getAuthHeaders } from "./config";

export const eliminarAnexo = async (id: string | number) => {
  try {
    const response = await axios.delete(`${API_URL}/anexos/${id}`, /*getAuthHeaders()*/);
    return response.data;
  } catch (error: any) {
    console.error("Error en la petición DELETE:", error.response || error);
    throw new Error(error.response?.data?.error || "No se pudo eliminar el registro");
  }
};