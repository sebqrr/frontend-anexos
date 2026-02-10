import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerAnexoPorId, actualizarAnexo } from "../services/EditarAnexo";

const EditarAnexo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [datos, setDatos] = useState({
    nombrePlantilla: "",
    nombreEjecutor: "",
    rutEjecutor: "",
    telefono: "",
    direccion: "",
    comuna: "",
    region: "",
    entidadRequirente: "",
    codigoCurso: "",
    horasTotales: "",
    objetivoGeneral: "",
    contenidos: ""
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (!id) return;
        const anexo = await obtenerAnexoPorId(id);
        const dr = anexo.datosRellenados || {}; 

        // 2. 🔹 Cargamos todos los valores desde MongoDB
        setDatos({
          nombrePlantilla: anexo.nombrePlantilla || "",
          nombreEjecutor: dr.nombre || "",
          rutEjecutor: dr.rutEjecutor || "",
          telefono: dr.telefono || "",
          direccion: dr.direccion || "",
          comuna: dr.comuna || "",
          region: dr.region || "",
          entidadRequirente: dr.entidadRequirente || "",
          codigoCurso: dr.codigoCurso || "",
          horasTotales: dr.horasTotales || "",
          objetivoGeneral: dr.objetivoGeneral || "",
          contenidos: dr.contenidos || ""
        });
      } catch (error) {
        alert("Error al cargar el anexo");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  const manejarGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;

      
      const payload = {
        nombrePlantilla: datos.nombrePlantilla,
        datosRellenados: {
          nombre: datos.nombreEjecutor,
          rutEjecutor: datos.rutEjecutor,
          telefono: datos.telefono,
          direccion: datos.direccion,
          comuna: datos.comuna,
          region: datos.region,
          entidadRequirente: datos.entidadRequirente,
          codigoCurso: datos.codigoCurso,
          horasTotales: datos.horasTotales,
          objetivoGeneral: datos.objetivoGeneral,
          contenidos: datos.contenidos
        }
      };

      await actualizarAnexo(id, payload);
      alert("Anexo actualizado con éxito");
      navigate("/gestionar-anexos");
    } catch (error: any) {
      alert(error.message || "No se pudo actualizar");
    }
  };

  if (loading) return <div className="p-5 text-center">Cargando datos...</div>;

  return (
    <div className="container mt-4 mb-5 fade-in">
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h2 className="h4 fw-bold mb-4 text-primary">✏️ Editar Anexo Completo</h2>
        
        <form onSubmit={manejarGuardar}>
          <div className="row g-3">
            {/* --- SECCIÓN GENERAL --- */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nombre de la Plantilla</label>
              <input type="text" className="form-control" value={datos.nombrePlantilla} onChange={(e) => setDatos({...datos, nombrePlantilla: e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nombre Organismo Ejecutor</label>
              <input type="text" className="form-control" value={datos.nombreEjecutor} onChange={(e) => setDatos({...datos, nombreEjecutor: e.target.value})} />
            </div>

            {/* --- DATOS IDENTIFICACIÓN --- */}
            <div className="col-md-4">
              <label className="form-label small fw-bold">RUT Ejecutor</label>
              <input type="text" className="form-control" value={datos.rutEjecutor} onChange={(e) => setDatos({...datos, rutEjecutor: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Teléfono</label>
              <input type="text" className="form-control" value={datos.telefono} onChange={(e) => setDatos({...datos, telefono: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Entidad Requirente</label>
              <input type="text" className="form-control" value={datos.entidadRequirente} onChange={(e) => setDatos({...datos, entidadRequirente: e.target.value})} />
            </div>

            {/* --- UBICACIÓN --- */}
            <div className="col-md-4">
              <label className="form-label small fw-bold">Dirección</label>
              <input type="text" className="form-control" value={datos.direccion} onChange={(e) => setDatos({...datos, direccion: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Comuna</label>
              <input type="text" className="form-control" value={datos.comuna} onChange={(e) => setDatos({...datos, comuna: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Región</label>
              <input type="text" className="form-control" value={datos.region} onChange={(e) => setDatos({...datos, region: e.target.value})} />
            </div>

            {/* --- DETALLES CURSO --- */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">Código del Curso</label>
              <input type="text" className="form-control" value={datos.codigoCurso} onChange={(e) => setDatos({...datos, codigoCurso: e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Horas Totales</label>
              <input type="text" className="form-control" value={datos.horasTotales} onChange={(e) => setDatos({...datos, horasTotales: e.target.value})} />
            </div>

            {/* --- ÁREA TEXTO --- */}
            <div className="col-12">
              <label className="form-label small fw-bold">Objetivo General</label>
              <textarea className="form-control" rows={2} value={datos.objetivoGeneral} onChange={(e) => setDatos({...datos, objetivoGeneral: e.target.value})} />
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold">Contenidos</label>
              <textarea className="form-control" rows={3} value={datos.contenidos} onChange={(e) => setDatos({...datos, contenidos: e.target.value})} />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary rounded-pill px-5 shadow-sm">Guardar Cambios</button>
            <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAnexo;