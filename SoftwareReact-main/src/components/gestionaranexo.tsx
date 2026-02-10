import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardService } from "../services/DashboardService"; 
import { eliminarAnexo } from "../services/BorrarAnexo"; 

interface Anexo {
  _id: string;
  nombrePlantilla: string;
  datosRellenados: {
    nombre?: string;
  };
  fechaGeneracion: string;
}

const GestionarAnexos = () => {
  const navigate = useNavigate();
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarAnexos = async () => {
    try {
      setLoading(true);
      const response = await DashboardService.obtenerAnexos();
      
      console.log("Datos recibidos de la API:", response);

      if (Array.isArray(response)) {
        const ordenados = [...response].sort((a, b) => {
          return new Date(b.fechaGeneracion).getTime() - new Date(a.fechaGeneracion).getTime();
        });
        setAnexos(ordenados);
      } else {
        setAnexos([]);
      }
      
    } catch (error) {
      console.error("Error cargando anexos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAnexos();
  }, []);

  useEffect(() => {
    cargarAnexos();
  }, []);

  // 🔹 Función para eliminar
  const manejarBorrar = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este anexo?")) return;
    try {
      await eliminarAnexo(id);
      setAnexos(prev => prev.filter(a => a._id !== id)); // Actualiza la lista visualmente
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-5 text-center">Cargando registros...</div>;

  return (
    <div className="container-fluid fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold text-dark mb-1">Gestión de Anexos</h2>
          <p className="text-muted">Administra los documentos reales de MongoDB.</p>
        </div>
        
        <button 
          className="btn btn-primary rounded-pill px-4"
          onClick={() => navigate("/crear-anexo")}
        >
          <span className="me-2">➕</span> Nuevo Anexo
        </button>
      </div>

      {/* Tabla de Resultados */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">Plantilla</th>
                <th className="py-3 border-0">Fecha</th>
                <th className="py-3 border-0">Trabajador/Ejecutor</th>
                <th className="py-3 border-0">Estado</th>
                <th className="py-3 border-0 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {anexos.map((anexo) => (
                <tr key={anexo._id}>
                  <td className="px-4 fw-semibold">{anexo.nombrePlantilla}</td>
                  <td>{new Date(anexo.fechaGeneracion).toLocaleDateString()}</td>
                  <td>{anexo.datosRellenados?.nombre || "Sin asignar"}</td>
                  <td>
                    <span className="badge rounded-pill bg-success-subtle text-success">
                      Finalizado
                    </span>
                  </td>
                  <td className="text-end px-4">
                    <div className="btn-group gap-1">
                      <button 
                        className="btn btn-sm btn-outline-primary rounded-2" 
                        onClick={() => navigate(`/admin/editar-anexo/${anexo._id}`)} 
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-2"
                        onClick={() => manejarBorrar(anexo._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {anexos.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">No se encontraron registros.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionarAnexos;