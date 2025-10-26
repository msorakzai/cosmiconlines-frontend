export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f8f8",
        color: "#333",
        padding: "40px 20px",
        textAlign: "center",
        marginTop: "50px",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <p style={{ marginBottom: "15px" }}>
        © {new Date().getFullYear()} CosmicOnlines. All rights reserved.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
        <a href="/about" style={{ color: "#333", textDecoration: "none" }}>About Us</a>
        <a href="/contact" style={{ color: "#333", textDecoration: "none" }}>Contact</a>
        <a href="/terms" style={{ color: "#333", textDecoration: "none" }}>Terms</a>
        <a href="/privacy" style={{ color: "#333", textDecoration: "none" }}>Privacy</a>
      </div>
    </footer>
  );
}
