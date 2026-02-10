import { useState } from 'react';
import { saveAs } from 'file-saver';
import { crearAnexoManual, crearAnexoInteligente } from '../services/CrearAnexo';

export default function CrearAnexo() {
  const [plantillaId, setPlantillaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const plantillas = [
    { 
      id: 'plantilla_anexo2.docx', 
      nombre: 'Anexo N° 2 - Plan Formativo SENCE',
      previewImg: '/img/vista_previa_anexo2.png', 
      campos: [
        { key: 'nombre_ejecutor', label: 'Nombre Organismo Ejecutor', type: 'text' },
        { key: 'rut_ejecutor', label: 'RUT Ejecutor', type: 'text' },
        { key: 'telefono_ejecutor', label: 'Teléfono', type: 'tel' },
        { key: 'direccion_ejecutor', label: 'Dirección', type: 'text' },
        { key: 'comuna_ejecutor', label: 'Comuna', type: 'text' },
        { key: 'region_ejecutor', label: 'Región', type: 'text' },
        { key: 'entidad_requirente', label: 'Entidad Requirente', type: 'text' },
        { key: 'código_curso', label: 'Código del Curso', type: 'text' },
        { key: 'horas', label: 'Horas Totales', type: 'number' },
        { key: 'objetivo_general', label: 'Objetivo General', type: 'textarea' },
        { key: 'contenidos', label: 'Contenidos', type: 'textarea' },
      ]
    }
  ];

  const plantillaSeleccionada = plantillas.find(p => p.id === plantillaId);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    } else {
      setPdfFile(null);
    }
  };

  const handleProcesar = async () => {
    if (!plantillaId) return alert("Por favor selecciona una plantilla.");
    setLoading(true);

    try {
      // Variable para guardar la respuesta del servicio (blob + status)
      let resultado;

      if (pdfFile) {
        console.log("🤖 Generando con IA...");
        resultado = await crearAnexoInteligente(pdfFile, formData, plantillaId);
      } else {
        console.log("✍️ Generando Manual...");
        resultado = await crearAnexoManual(formData, plantillaId);
      }

      // 1. Descargar el archivo SIEMPRE (porque el backend lo envió)
      saveAs(resultado.blob, `Anexo_${pdfFile ? 'IA' : 'Manual'}_${Date.now()}.docx`);

      // 2. Verificar si se guardó en BD (usando el header que mandó el backend)
      if (resultado.saved) {
        alert("✅ ¡Éxito! Documento generado y guardado en el Historial.");
      } else {
        alert("⚠️ El documento se generó correctamente, pero hubo un error al guardarlo en la Base de Datos. (No aparecerá en el historial)");
      }

    } catch (error: any) {
      console.error(error);
      alert(`❌ Error crítico: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid fade-in h-100">
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Generador de Anexos</h2>
        <p className="text-muted">Sube una Base Técnica (PDF) para usar IA, o rellena manualmente.</p>
      </div>

      <div className="row g-4 h-100">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="col-lg-6 d-flex flex-column">
          <div className="card border-0 shadow-sm rounded-4 flex-grow-1" style={{minHeight: '600px'}}>
            <div className="card-body p-4 overflow-auto custom-scrollbar" style={{ maxHeight: '80vh' }}>
              
              <div className="mb-4 bg-light p-3 rounded-3 border">
                <label className="form-label fw-bold small text-uppercase text-primary mb-2">1. Selecciona Plantilla</label>
                <select 
                  className="form-select form-select-lg border-0 shadow-sm"
                  value={plantillaId}
                  onChange={(e) => {
                    setPlantillaId(e.target.value);
                    setFormData({});
                    setPdfFile(null);
                  }}
                >
                  <option value="">-- Selecciona el documento --</option>
                  {plantillas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              {plantillaSeleccionada ? (
                <div className="fade-in">
                  
                  {/* Input PDF */}
                  <div className={`mb-4 p-3 rounded-3 border ${pdfFile ? 'border-success bg-success-subtle' : 'border-primary border-opacity-25 bg-white'}`}>
                    <label className="form-label fw-bold text-dark d-flex align-items-center justify-content-between">
                      <span><i className="bi bi-robot me-2"></i>Carga Inteligente (Opcional)</span>
                      {pdfFile && <span className="badge bg-success">PDF Cargado</span>}
                    </label>
                    <input 
                      type="file" 
                      accept="application/pdf"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="form-text small mt-2">
                      {pdfFile ? "✅ La IA leerá este PDF." : "ℹ️ Sube PDF para usar IA."}
                    </div>
                  </div>

                  {/* Inputs Manuales */}
                  <h6 className="fw-bold border-bottom pb-2 mb-3 text-dark">3. Datos Administrativos</h6>
                  <div className="row g-3">
                    {plantillaSeleccionada.campos.map((campo) => (
                      <div key={campo.key} className={campo.type === 'textarea' ? 'col-12' : 'col-md-6'}>
                        <label className="form-label small fw-bold text-muted mb-1">{campo.label}</label>
                        {campo.type === 'textarea' ? (
                          <textarea 
                            className="form-control bg-light border-0 rounded-3"
                            rows={3}
                            placeholder={pdfFile ? "La IA intentará llenar esto..." : "Escribe aquí..."}
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        ) : (
                          <input 
                            type={campo.type} 
                            className="form-control bg-light border-0 rounded-3 p-2"
                            placeholder="..."
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Botón */}
                  <div className="d-grid mt-5 sticky-bottom bg-white pt-3 border-top">
                    <button 
                      onClick={handleProcesar}
                      className={`btn rounded-pill py-3 fw-bold shadow hover-scale ${pdfFile ? 'btn-success' : 'btn-primary'}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</span>
                      ) : (
                        <span>{pdfFile ? "✨ Generar con IA" : "📄 Generar Manual"}</span>
                      )}
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-5 text-muted"><p>Selecciona una plantilla.</p></div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-secondary bg-opacity-10">
            <div className="card-body p-0 d-flex align-items-center justify-content-center">
              {plantillaSeleccionada ? (
                <img 
                   src={plantillaSeleccionada.previewImg} 
                   alt="Vista Previa" 
                   className="shadow-lg border bg-white"
                   style={{ maxWidth: '80%', borderRadius: '4px' }}
                   onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Vista+Previa'; }}
                 />
              ) : (
                <div className="text-muted text-center opacity-50"><h1>📄</h1><p>Vista Previa</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 4px; }
      `}</style>
    </div>
  );
}