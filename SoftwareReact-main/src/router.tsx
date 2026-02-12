import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/crearanexo";
import GestionarAnexos from "./components/gestionaranexo";
import Configuracion from "./components/configuracion";
import EditarAnexo from "./components/EditarAnexo";
import Login from "./components/login"; 
import Register from "./components/registro"; // 👈 1. IMPORTA EL COMPONENTE AQUÍ

export const router = createBrowserRouter([
  // =======================================
  // 1. RUTAS PÚBLICAS (SIN SIDEBAR)
  // =======================================
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register", // 👈 2. AQUÍ ESTÁ LA NUEVA RUTA
    element: <Register />,
  },

  // =======================================
  // 2. RUTAS DEL SISTEMA (CON SIDEBAR)
  // =======================================
  {
    element: <LayoutAdmin />, 
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "crear-anexo",
        element: <CrearAnexo />,
      },
      {
        path: "gestionar-anexos",
        element: <GestionarAnexos />,
      },
      {
        path: "admin/editar-anexo/:id",
        element: <EditarAnexo />,
      },
      {
        path: "configuracion",
        element: <Configuracion />,
      },
    ],
  },
  
  // =======================================
  // 3. COMODÍN (Cualquier ruta rara -> Login)
  // =======================================
  {
    path: "*",
    element: <Login />,
  }
]);