import axios from "axios";
import { API_URL } from "./config";

// Clave para guardar en el navegador
const TOKEN_KEY = "token_sence_app";
const USER_KEY = "user_sence_app";

export const AuthService = {
  
  // 1. LOGIN
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        // Guardamos el token y el usuario en LocalStorage
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en Login:", error);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  },

  // 2. REGISTRO (Opcional, si tienes pantalla de registro)
  register: async (nombre: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        nombre,
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al registrarse");
    }
  },

  // 3. CERRAR SESIÓN
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Opcional: recargar la página o redirigir
    window.location.href = "/login";
  },

  // 4. OBTENER USUARIO ACTUAL
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // 5. OBTENER TOKEN (Para las peticiones protegidas)
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  // 6. VERIFICAR SI ESTÁ LOGUEADO
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token; // Devuelve true si hay token, false si no
  }
};