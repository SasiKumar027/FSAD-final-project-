import { Link } from "react-router-dom";

function Sidebar({ links }) {
  return (
    <div
      style={{
        width: 260,
        background: "#1f2937",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        minHeight: "calc(100vh - 70px)",
        position: "sticky",
        top: "70px",
        overflowY: "auto"
      }}
    >
      <div style={{ padding: "20px" }}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              marginBottom: "8px",
              color: "#e5e7eb",
              textDecoration: "none",
              borderRadius: "8px",
              transition: "all 0.3s",
              fontSize: "0.95em",
              fontWeight: "500",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(102, 126, 234, 0.2)";
              e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.5)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#e5e7eb";
            }}
          >
            {link.icon && <span style={{ fontSize: "1.2em" }}>{link.icon}</span>}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;