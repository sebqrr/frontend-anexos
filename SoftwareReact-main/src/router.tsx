import { createBrowserRouter } from "react-router-dom";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";

// Componentes Públicos
import Login from "./components/login"; 
import Register from "./components/registro"; 


// Componentes Privados (Del Sistema)
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/crearanexo";
import GestionarAnexos from "./components/gestionaranexo";
import EditarAnexo from "./components/EditarAnexo";
import Configuracion from "./components/configuracion";
import RecoverPassword from "./components/cambiaracontrasena";


export const router = createBrowserRouter([
  // =======================================
  // 1. RUTAS PÚBLICAS (Sin Sidebar)
  // =======================================
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },


  // =======================================
  // 2. RUTAS DEL SISTEMA (Con Sidebar y Navbar)
  // =======================================
  {
    element: <LayoutAdmin />, // 👈 Este layout envuelve a todo lo de abajo
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
      // 👇 AQUÍ ESTÁ LA RUTA DE CAMBIAR CONTRASEÑA 👇
      // Al estar dentro de "children" de LayoutAdmin, tendrá el sidebar automáticamente
      {
        path: "configuracion/password", 
        element: < RecoverPassword/>,
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