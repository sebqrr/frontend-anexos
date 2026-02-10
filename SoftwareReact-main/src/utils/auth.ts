export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Limpia el historial para que no pueda volver atrás
  window.location.replace("/login");
};