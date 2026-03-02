import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Navbar() {
  const { currentUser } = useContext(AppContext);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        color: "white",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <div style={{ fontSize: "1.5em", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
        <span>📚</span> Work-Study Portal
      </div>
      <div style={{ fontSize: "0.95em", opacity: 0.95 }}>Welcome, <strong>{currentUser?.name}</strong></div>
    </div>
  );
}

export default Navbar;