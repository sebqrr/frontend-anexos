import { logout } from "../utils/auth";

export default function Configuracion() {
  return (
    <div className="container-fluid fade-in">
      {/* Cabecera */}
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Configuración</h2>
        <p className="text-muted">Gestiona tus preferencias personales y los ajustes del sistema.</p>
      </div>

      <div className="row g-4">
        {/* Navegación de Ajustes (Sidebar interno) */}
        <div className="col-md-3">
          <div className="list-group list-group-flush shadow-sm rounded-4 overflow-hidden">
            <button className="list-group-item list-group-item-action active p-3 border-0">
              <span className="me-2">👤</span> Mi Perfil
            </button>
            
            <button className="list-group-item list-group-item-action p-3 border-0 text-danger">
              <span className="me-2">🚪</span> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Panel de Contenido */}
        <div className="col-md-9">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              
              {/* Sección: Perfil */}
              <section className="mb-5">
                <h5 className="fw-bold mb-4">Información del Perfil</h5>
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: "80px", height: "80px" }}>
                    JP
                  </div>
                  <div className="ms-4">
                    <button className="btn btn-sm btn-primary rounded-pill px-3">Cambiar Foto</button>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 ms-2">Eliminar</button>
                    <p className="text-muted small mt-2 mb-0">JPG o PNG. Máximo 1MB.</p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Nombre Completo</label>
                    <input type="text" className="form-control rounded-3" defaultValue="Juan Pérez" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Correo Electrónico</label>
                    <input type="email" className="form-control rounded-3" defaultValue="juan.perez@empresa.com" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Cargo</label>
                    <input type="text" className="form-control rounded-3" defaultValue="Administrador de RRHH" readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Idioma</label>
                    <select className="form-select rounded-3">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </section>

              <hr className="my-5 text-muted opacity-25" />

             

              {/* Botones de guardado */}
              <div className="d-flex justify-content-end gap-2 mt-5">
                <button className="btn btn-light rounded-pill px-4">Descartar</button>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm">Guardar Cambios</button>
                <button
              className="list-group-item list-group-item-action p-3 border-0 text-danger"
              onClick={logout}
            >
              <span className="me-2">🚪</span> Cerrar Sesión
            </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}