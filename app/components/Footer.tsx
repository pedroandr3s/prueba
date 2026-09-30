// Pie de página con el copyright.
export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "1rem", textAlign: "center" }}>
      <p>&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
    </footer>
  );
}