import axios from "axios";
import { API_URL } from "./config";

export const DashboardService = {
  
  obtenerAnexos: async () => {
    const response = await axios.get(`${API_URL}/anexos`);
    const anexos = Array.isArray(response.data) ? response.data : [];
    
    return anexos.sort((a: any, b: any) => 
      new Date(b.fechaGeneracion).getTime() - new Date(a.fechaGeneracion).getTime()
    );
  },

  fetchDashboardData: async () => {
    try {
      const anexos = await DashboardService.obtenerAnexos();

      const hoyISO = new Date().toISOString().split('T')[0];

      return {
        total: anexos.length,
        hoy: anexos.filter((a: any) => a.fechaGeneracion && a.fechaGeneracion.startsWith(hoyISO)).length,
        pendientes: 0,
        usuarios: 1,
        ultimosAnexos: anexos.slice(0, 5) 
      };
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      throw error;
    }
  }
};