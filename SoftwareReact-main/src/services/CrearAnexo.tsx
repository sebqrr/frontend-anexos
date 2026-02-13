import axios from "axios";
import { API_URL } from "./config";
import { AuthService } from "../services/authServices"; // 👈 IMPORTANTE

// Helper para procesar la respuesta
const procesarRespuesta = (response: any) => {
  const headerGuardado = response.headers['x-anexo-guardado'];
  const guardadoExitoso = headerGuardado === 'true';

  return {
    blob: response.data,
    saved: guardadoExitoso
  };
};

// --- 1. CREAR MANUALMENTE ---
export const crearAnexoManual = async (datos: any, nombrePlantilla: string) => {
  try {

    const token = AuthService.getToken(); // 👈 OBTENEMOS TOKEN

    const response = await axios.post(
      `${API_URL}/anexos/generar`,
      { nombrePlantilla, datos },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 AGREGADO
        },
        responseType: 'blob'
      }
    );

    return procesarRespuesta(response);

  } catch (error: any) {
    console.error("Error servicio manual:", error);
    throw new Error("Error al generar documento manual.");
  }
};

// --- 2. CREAR INTELIGENTE (IA) ---
export const crearAnexoInteligente = async (
  pdfFile: File,
  datosManuales: any,
  nombrePlantilla: string
) => {
  try {

    const token = AuthService.getToken(); // 👈 OBTENEMOS TOKEN

    const formData = new FormData();
    formData.append("pdfTecnico", pdfFile);
    formData.append("nombrePlantilla", nombrePlantilla);

    formData.append("nombre_organismo", datosManuales.nombre_ejecutor || "");
    formData.append("rut_organismo", datosManuales.rut_ejecutor || "");
    formData.append("telefono_organismo", datosManuales.telefono_ejecutor || "");
    formData.append("direccion_organismo", datosManuales.direccion_ejecutor || "");
    formData.append("comuna_organismo", datosManuales.comuna_ejecutor || "");
    formData.append("region_organismo", datosManuales.region_ejecutor || "");
    formData.append("entidad_requirente", datosManuales.entidad_requirente || "");
    formData.append("codigo_curso", datosManuales.código_curso || "");

    const response = await axios.post(
      `${API_URL}/anexos/inteligente`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 AGREGADO
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob',
      }
    );

    return procesarRespuesta(response);

  } catch (error: any) {
    console.error("Error servicio IA:", error);
    const msg = error.response?.data?.error || "Error al procesar con IA.";
    throw new Error(msg);
  }
};
