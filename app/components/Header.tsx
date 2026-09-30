import Image from "next/image";

// Cabecera: logo y menú de navegación (los enlaces apuntan a los ids de cada sección).
export default function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Image src="/next.svg" alt="Logo" width={40} height={40} />
        <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Resumidor de Documentos</span>
      </div>
      <nav>
        <ul style={{ display: "flex", gap: "1rem" }}>
          <li><a href="#resumir" style={{ color: "#3b82f6", textDecoration: "underline" }}>Resumir</a></li>
          <li><a href="#caracteristicas" style={{ color: "#3b82f6", textDecoration: "underline" }}>Características</a></li>
          <li><a href="#contacto" style={{ color: "#3b82f6", textDecoration: "underline" }}>Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}