export function redirectToLogin(navigate) {
  localStorage.clear();
  navigate("/login");
}
