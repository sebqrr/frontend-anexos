import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/authServices';

export default function ResetPassword() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones Locales
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Llamada al Backend
      await AuthService.resetPasswordPublic(email, newPassword);
      
      setSuccess(true);
      
      // Redirigir al login automáticamente
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Error al actualizar. Verifica que el correo sea correcto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative overflow-hidden">
      
      {/* Fondo animado */}
      <div className="position-absolute w-100 h-100 bg-animated"></div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden card-entry" style={{ maxWidth: '450px', width: '100%', zIndex: 10 }}>
        
        {/* Header Azul */}
        <div className="bg-primary p-4 text-center text-white position-relative overflow-hidden">
          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-white opacity-10 float-animation" style={{width: '150px', height: '150px'}}></div>
          <div className="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-white opacity-10 float-animation-delayed" style={{width: '100px', height: '100px'}}></div>
          
          <div className="position-relative z-1">
            <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3 icon-pop">
                <i className="bi bi-shield-lock-fill display-4 text-white"></i>
            </div>
            <h3 className="fw-bold">Restablecer Clave</h3>
            <p className="small opacity-75 mb-0 px-4">Ingresa tu correo y crea una nueva contraseña.</p>
          </div>
        </div>

        <div className="card-body p-4 p-md-5">
          
          {!success ? (
            <form onSubmit={handleSubmit}>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center small py-2 rounded-3 mb-4 shake-animation" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Input Correo */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Tu Correo</label>
                <div className="input-group input-group-lg group-focus-effect">
                  <span className="input-group-text bg-light border-end-0 text-muted ps-3"><i className="bi bi-envelope"></i></span>
                  <input 
                    type="email" 
                    className="form-control bg-light border-start-0 fs-6" 
                    placeholder="usuario@ejemplo.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Input Nueva Contraseña */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Nueva Contraseña</label>
                <div className="input-group input-group-lg group-focus-effect">
                  <span className="input-group-text bg-light border-end-0 text-muted ps-3"><i className="bi bi-key"></i></span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control bg-light border-start-0 border-end-0 fs-6" 
                    placeholder="Mínimo 6 caracteres" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Input Confirmar Contraseña */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Confirmar Contraseña</label>
                <div className="input-group input-group-lg group-focus-effect">
                  <span className="input-group-text bg-light border-end-0 text-muted ps-3"><i className="bi bi-check-lg"></i></span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control bg-light border-start-0 border-end-0 fs-6" 
                    placeholder="Repite la contraseña" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                  />
                  <button className="btn btn-light border border-start-0 text-muted pe-3" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} transition-icon`}></i>
                  </button>
                </div>
              </div>

              <div className="d-grid gap-3">
                <button 
                    type="submit" 
                    className="btn btn-primary rounded-pill py-3 fw-bold shadow-sm btn-animate"
                    disabled={loading}
                >
                  {loading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Guardando...</span>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </button>
                
                <Link to="/" className="btn btn-light rounded-pill py-3 fw-bold text-muted border-0 hover-bg-gray">
                  Cancelar
                </Link>
              </div>

            </form>
          ) : (
            <div className="text-center animate-fade-in py-3">
              <div className="mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle p-4 mb-3 icon-pop">
                    <i className="bi bi-check-circle-fill display-1 text-success"></i>
                </div>
                <h4 className="fw-bold text-dark mb-2">¡Éxito!</h4>
                <p className="text-muted small px-3">
                  Tu contraseña ha sido actualizada correctamente.
                </p>
              </div>
              
              <div className="d-grid">
                <Link to="/" className="btn btn-primary rounded-pill py-3 fw-bold shadow-sm btn-animate">
                  Ir al Inicio de Sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .card-entry { animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .icon-pop { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s backwards; }
        .group-focus-effect:focus-within { box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.15); border-radius: 0.5rem; transition: box-shadow 0.3s ease; }
        .form-control:focus { box-shadow: none; }
        .btn-animate { transition: all 0.3s ease; }
        .btn-animate:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2) !important; }
        .hover-bg-gray:hover { background-color: #e9ecef; }
        .shake-animation { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .float-animation-delayed { animation: float 7s ease-in-out infinite 1s; }
        @keyframes float { 0% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-15px); } 100% { transform: translate(-50%, -50%) translateY(0px); } }
      `}</style>
    </div>
  );
}