import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { logout } from "../utils/auth";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", emoji: "🏠" },
  { name: "Crear Anexo", path: "/crear-anexo", emoji: "➕" },
  { name: "Gestionar Anexos", path: "/gestionar-anexos", emoji: "📋" },
  { name: "Configuración", path: "/configuracion", emoji: "⚙️" },
];

export default function LayoutAdmin() {
  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar  */}
      <aside className="bg-dark text-white shadow" style={{ width: "280px" }}>
        <div className="p-4 border-bottom border-secondary">
          <span className="fs-5 fw-bold">Software React</span>
        </div>
        
        <nav className="nav flex-column mt-3 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link border-0 mb-1 rounded-3 text-start transition-all ${
                  isActive ? "bg-primary text-white shadow-sm" : "text-white-50"
                }`
              }
            >
              <span className="me-3">{item.emoji}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Área de Contenido */}
      <div className="flex-fill d-flex flex-column overflow-hidden">
        <header className="navbar navbar-light bg-white px-4 py-3 shadow-sm border-bottom">
          <h1 className="h5 m-0 fw-bold">Panel de Administración</h1>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </header>

        <main className="p-4 overflow-auto">
          {/* AQUÍ es donde se cargan tus componentes hijos */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}