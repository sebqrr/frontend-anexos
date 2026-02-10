import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/crearanexo";
import GestionarAnexos from "./components/gestionaranexo";
import Configuracion from "./components/configuracion";
import EditarAnexo from "./components/EditarAnexo";
import Login from "./components/login"; // Asegúrate de importar tu Login

export const router = createBrowserRouter([
  // 1. RUTA PÚBLICA (LOGIN)
  // Esta es la primera pantalla ("/") y NO tiene el LayoutAdmin (sin sidebar)
  {
    path: "/",
    element: <Login />,
  },

  // 2. RUTAS DEL SISTEMA (DASHBOARD)
  // Estas rutas SÍ usan el LayoutAdmin (con sidebar y navbar)
  {
    element: <LayoutAdmin />, // Este layout envuelve a todas las rutas hijas
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
  
  // 3. COMODÍN (Opcional)
  // Si el usuario escribe cualquier ruta rara, lo mandamos al Login
  {
    path: "*",
    element: <Login />,
  }
]);