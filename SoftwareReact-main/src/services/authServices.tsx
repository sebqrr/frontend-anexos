import axios from "axios";

// ⚠️ AJUSTA EL PUERTO SI TU BACKEND CORRE EN EL 4000
const API_URL = "http://localhost:3000/api"; 

const TOKEN_KEY = "token_sence_app";
const USER_KEY = "user_sence_app";

// --- INTERFACES ---
export interface User {
  id: string;
  nombre: string;
  email: string;
  rol?: string;
}

export interface LoginResponse {
  token: string;
  usuario: User;
  message?: string;
}

// --- SERVICIO DE AUTENTICACIÓN ---
export const AuthService = {
  
  // 1. LOGIN
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en Login:", error);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  },

  // 2. REGISTRO
  register: async (nombre: string, email: string, password: string): Promise<any> => {
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

  // 3. CAMBIAR CONTRASEÑA (Privado - Usuario Logueado)
  changePassword: async (currentPassword: string, newPassword: string): Promise<any> => {
    try {
      const token = localStorage.getItem(TOKEN_KEY); 
      if (!token) throw new Error("No hay sesión activa");

      const response = await axios.put(
        `${API_URL}/auth/change-password`, 
        { currentPassword, newPassword },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al cambiar la contraseña");
    }
  },

  // 👇 4. RESTABLECER CONTRASEÑA (Público - Olvidé mi clave)
  resetPasswordPublic: async (email: string, newPassword: string): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/auth/reset-password-public`, {
        email,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al restablecer contraseña");
    }
  },

  // 5. CERRAR SESIÓN
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = "/";
  },

  // 6. UTILIDADES
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
        try { return JSON.parse(userStr) as User; } catch (e) { return null; }
    }
    return null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  }
};