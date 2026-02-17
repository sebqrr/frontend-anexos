import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardService } from "../services/DashboardService";
import { eliminarAnexo } from "../services/BorrarAnexo"; 

interface Anexo {
  _id: string;
  nombrePlantilla: string;
  datosRellenados: {
    nombre_ejecutor?: string;
    nombre?: string; 
  };
  fechaGeneracion: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statsData, setStatsData] = useState({
    total: 0,
    hoy: 0,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.fetchDashboardData();
      setAnexos(data.ultimosAnexos);
      setStatsData({ total: data.total, hoy: data.hoy });
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FUNCIÓN: Hace X tiempo
  const tiempoTranscurrido = (fecha: string) => {
    const ahora = new Date().getTime();
    const fechaAnexo = new Date(fecha).getTime();
    const diferencia = ahora - fechaAnexo;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(dias / 365);

    if (segundos < 60) return "Hace unos segundos";
    if (minutos < 60) return `Hace ${minutos} minuto${minutos !== 1 ? "s" : ""}`;
    if (horas < 24) return `Hace ${horas} hora${horas !== 1 ? "s" : ""}`;
    if (dias < 7) return `Hace ${dias} día${dias !== 1 ? "s" : ""}`;
    if (semanas < 4) return `Hace ${semanas} semana${semanas !== 1 ? "s" : ""}`;
    if (meses < 12) return `Hace ${meses} mes${meses !== 1 ? "es" : ""}`;
    return `Hace ${años} año${años !== 1 ? "s" : ""}`;
  };

  // 🔥 FUNCIÓN: Color dinámico
  const obtenerClaseTiempo = (fecha: string) => {
    const ahora = new Date().getTime();
    const fechaAnexo = new Date(fecha).getTime();
    const diferenciaHoras = (ahora - fechaAnexo) / (1000 * 60 * 60);

    if (diferenciaHoras < 24) return "text-success fw-semibold";
    if (diferenciaHoras < 24 * 7) return "text-warning fw-semibold";
    return "text-secondary";
  };

  const handleDelete = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este anexo permanentemente?");
    if (!confirmar) return;

    try {
      await eliminarAnexo(id);
      setAnexos(prevAnexos => prevAnexos.filter(a => a._id !== id));
      setStatsData(prev => ({ ...prev, total: prev.total - 1 }));
      alert("Anexo eliminado correctamente.");
    } catch (error: any) {
      alert("Error al eliminar: " + error.message);
    }
  };

  const statsCards = [
    { title: "Total Anexos", value: statsData.total.toString(), icon: "bi-folder-fill", color: "primary" },
    { title: "Creados Hoy", value: statsData.hoy.toString(), icon: "bi-plus-circle-fill", color: "success" },
    { title: "Pendientes", value: "0", icon: "bi-exclamation-triangle-fill", color: "warning" },
    { title: "Usuarios", value: "1", icon: "bi-people-fill", color: "info" },
  ];

  if (loading) return <div className="p-5 text-center text-muted">Conectando con el backend...</div>;
  if (error) return <div className="p-5 text-center text-danger fw-bold">{error}</div>;

  return (
    <div className="container-fluid p-0 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold text-dark">Panel de Control</h2>
          <p className="text-muted m-0">Resumen en tiempo real desde MongoDB.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={() => navigate("/crear-anexo")}>
          <i className="bi bi-plus-lg me-2"></i> Nuevo Anexo
        </button>
      </div>

      <div className="row g-4 mb-5">
        {statsCards.map((stat, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 d-flex align-items-center">
                <div className={`rounded-circle p-3 bg-${stat.color}-subtle text-${stat.color} me-3`}>
                  <i className={`bi ${stat.icon} fs-3`}></i>
                </div>
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold mb-1">{stat.title}</h6>
                  <h2 className="fw-bold mb-0">{stat.value}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-0 py-3 px-4">
          <h5 className="fw-bold m-0">Últimos Anexos</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Ejecutor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {anexos.map((anexo) => (
                <tr key={anexo._id}>
                  <td className="ps-4 fw-bold">
                    {anexo.datosRellenados?.nombre_ejecutor || 
                     anexo.datosRellenados?.nombre || 
                     "Sin asignar"}
                  </td>

                  <td className="small">
                    <div className="text-muted">
                      {new Date(anexo.fechaGeneracion).toLocaleDateString("es-CL", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>
                    <div className={obtenerClaseTiempo(anexo.fechaGeneracion)}>
                      {tiempoTranscurrido(anexo.fechaGeneracion)}
                    </div>
                  </td>

                  <td>
                    <span className="badge bg-success-subtle text-success rounded-pill px-3">
                      Generado
                    </span>
                  </td>

                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        className="btn btn-sm btn-light text-primary border" 
                        onClick={() => navigate(`/admin/editar-anexo/${anexo._id}`)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      <button 
                        className="btn btn-sm btn-light text-danger border" 
                        onClick={() => handleDelete(anexo._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {anexos.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-muted">
                    No hay anexos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
