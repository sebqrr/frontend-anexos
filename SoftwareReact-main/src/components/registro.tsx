import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/authServices';

export default function Register() {
  const navigate = useNavigate();
  
  const [nombre, setNombre] = useState(""); // Nuevo campo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llamamos al servicio de registro (register)
      await AuthService.register(nombre, email, password);
      
      // Si sale bien, redirigimos al login o al dashboard
      alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
      
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative overflow-hidden">
      
      {/* Fondo animado (Mismo que login) */}
      <div className="position-absolute w-100 h-100 bg-animated"></div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden card-entry" style={{ maxWidth: '400px', width: '100%', zIndex: 10 }}>
        
        {/* Header Animado - Color diferente para diferenciar (Success/Verde o Primary/Azul) */}
        <div className="bg-primary p-4 text-center text-white position-relative overflow-hidden">
          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-white opacity-10 float-animation" style={{width: '150px', height: '150px'}}></div>
          <div className="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-white opacity-10 float-animation-delayed" style={{width: '100px', height: '100px'}}></div>
          
          <div className="position-relative z-1">
            {/* Ícono de "Add User" */}
            <i className="bi bi-person-plus-fill display-1 mb-2 d-block icon-pop"></i>
            <h3 className="fw-bold">Crear Cuenta</h3>
            <p className="small opacity-75 mb-0">Únete a Gestión SENCE</p>
          </div>
        </div>

        <div className="card-body p-4 p-md-5">
          
          {error && (
            <div className="alert alert-danger d-flex align-items-center small py-2 rounded-3 mb-4 shake-animation" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleRegister}>
            
            {/* Input Nombre (Nuevo) */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Nombre Completo</label>
              <div className="input-group input-group-lg group-focus-effect">
                <span className="input-group-text bg-light border-end-0 text-muted ps-3">
                  <i className="bi bi-person"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control bg-light border-start-0 fs-6" 
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Correo</label>
              <div className="input-group input-group-lg group-focus-effect">
                <span className="input-group-text bg-light border-end-0 text-muted ps-3">
                  <i className="bi bi-envelope"></i>
                </span>
                <input 
                  type="email" 
                  className="form-control bg-light border-start-0 fs-6" 
                  placeholder="ejemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase" style={{fontSize: '0.75rem'}}>Contraseña</label>
              <div className="input-group input-group-lg group-focus-effect">
                <span className="input-group-text bg-light border-end-0 text-muted ps-3">
                  <i className="bi bi-lock"></i>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control bg-light border-start-0 border-end-0 fs-6" 
                  placeholder="Crea una contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button 
                  className="btn btn-light border border-start-0 text-muted pe-3" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} transition-icon`}></i>
                </button>
              </div>
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary rounded-pill py-3 fw-bold shadow-sm btn-animate"
                disabled={loading}
              >
                {loading ? (
                  <span><span className="spinner-border spinner-border-sm me-2"></span>Registrando...</span>
                ) : (
                  <span>Registrarme <i className="bi bi-check-lg ms-2 arrow-slide"></i></span>
                )}
              </button>
            </div>

          </form>
        </div>
        
        <div className="card-footer bg-light border-0 text-center py-3">
          <p className="small text-muted mb-0">
            ¿Ya tienes cuenta? <Link to="/login" className="fw-bold text-primary cursor-pointer hover-link text-decoration-none">Inicia sesión aquí</Link>
          </p>
        </div>

      </div>

      {/* ESTILOS CSS EN LÍNEA (Iguales al Login para consistencia visual) */}
      <style>{`
        .card-entry { animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .float-animation-delayed { animation: float 7s ease-in-out infinite 1s; }
        @keyframes float { 0% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-15px); } 100% { transform: translate(-50%, -50%) translateY(0px); } }
        .icon-pop { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s backwards; }
        @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .shake-animation { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        .group-focus-effect:focus-within { box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.15); border-radius: 0.5rem; transition: box-shadow 0.3s ease; }
        .form-control:focus { box-shadow: none; }
        .btn-animate { transition: all 0.3s ease; }
        .btn-animate:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2) !important; }
        .btn-animate:active:not(:disabled) { transform: translateY(0); }
        .btn-animate:hover .arrow-slide { display: inline-block; animation: slideRight 0.5s infinite alternate; }
        @keyframes slideRight { from { transform: translateX(0); } to { transform: translateX(4px); } }
        .hover-link { transition: color 0.2s; }
        .hover-link:hover { color: #0d6efd !important; text-decoration: underline !important; }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
}