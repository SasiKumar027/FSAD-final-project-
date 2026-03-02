import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import BrowseJobs from "./BrowseJobs";
import MyApplications from "./MyApplications";

function StudentDashboard() {
  const { logout, currentUser, applications, jobs } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const myAppsCount = applications.filter(
    (app) => app.studentName === currentUser?.name
  ).length;
  const approvedApps = applications.filter(
    (app) => app.studentName === currentUser?.name && app.status === "approved"
  ).length;
  const totalHours = applications
    .filter((app) => app.studentName === currentUser?.name)
    .reduce((sum, app) => sum + app.hoursLogged, 0);
  // sum of weekly hours for approved jobs (working hours)
  const workingHours = applications
    .filter((app) => app.studentName === currentUser?.name && app.status === "approved")
    .reduce((sum, app) => {
      const job = jobs.find((j) => j.id === app.jobId);
      return sum + (job?.hoursPerWeek || 0);
    }, 0);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const recentApps = applications
    .filter((app) => app.studentName === currentUser?.name)
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const sidebarLinks = [
    { path: "browse", label: "Browse Jobs", icon: "🔍" },
    { path: "applications", label: "My Applications", icon: "📋" }
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", flexShrink: 0 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "1.5em", cursor: "pointer" }} id="menu-btn">☰</button>
        <div style={{ fontSize: "clamp(1.2em, 5vw, 1.5em)", fontWeight: "bold" }}>📚 Work-Study Portal</div>
        <button onClick={handleLogout} style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "2px solid white", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "0.9em", fontWeight: "600", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#667eea"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "white"; }}>Logout</button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: "260px", background: "#1f2937", borderRight: "1px solid rgba(255,255,255,0.1)", padding: "20px", position: "sticky", top: "70px", height: "100%", maxHeight: "calc(100vh - 70px)", overflowY: "auto", transition: "all 0.3s", flexShrink: 0 }} id="sidebar" className="sidebar">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
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
              <span style={{ fontSize: "1.2em" }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ flex: 1, padding: "24px", background: "#f9fafb", overflowY: "auto", maxWidth: "100%" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ margin: 0, color: "#1f2937", fontSize: "clamp(1.5em, 5vw, 1.8em)" }}>Dashboard</h1>
            <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "clamp(0.9em, 3vw, 1em)" }}>Welcome back! Here's your work-study overview.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "0.85em", color: "#6b7280", marginBottom: "8px", fontWeight: "600" }}>Total Applications</div>
              <div style={{ fontSize: "clamp(1.8em, 8vw, 2.5em)", fontWeight: "bold", color: "#10b981" }}>{myAppsCount}</div>
            </div>
            <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "0.85em", color: "#6b7280", marginBottom: "8px", fontWeight: "600" }}>Approved Jobs</div>
              <div style={{ fontSize: "clamp(1.8em, 8vw, 2.5em)", fontWeight: "bold", color: "#10b981" }}>{approvedApps}</div>
            </div>
            <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "0.85em", color: "#6b7280", marginBottom: "8px", fontWeight: "600" }}>Working Hours (weekly)</div>
              <div style={{ fontSize: "clamp(1.8em, 8vw, 2.5em)", fontWeight: "bold", color: "#3b82f6" }}>{workingHours}</div>
            </div>
            <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "0.85em", color: "#6b7280", marginBottom: "8px", fontWeight: "600" }}>Total Hours Logged</div>
              <div style={{ fontSize: "clamp(1.8em, 8vw, 2.5em)", fontWeight: "bold", color: "#f59e0b" }}>{totalHours}</div>
            </div>
          </div>

          <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)", marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#1f2937", fontSize: "clamp(1.1em, 4vw, 1.3em)" }}>📋 Recent Applications</h3>
            {recentApps.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No applications yet. Start by browsing available jobs!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentApps.map((app) => {
                  const job = jobs.find((j) => j.id === app.jobId);
                  return (
                    <div key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ flex: "1 1 200px", minWidth: "0" }}>
                        <div style={{ fontWeight: "600", color: "#1f2937", fontSize: "clamp(0.9em, 3vw, 1em)" }}>{job?.title || "Unknown Job"}</div>
                        <div style={{ fontSize: "0.85em", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis" }}>{job?.department}</div>
                      </div>
                      <span style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "0.8em", fontWeight: "600", backgroundColor: app.status === "approved" ? "#d1fae5" : app.status === "rejected" ? "#fee2e2" : "#fef3c7", color: app.status === "approved" ? "#065f46" : app.status === "rejected" ? "#7f1d1d" : "#92400e", whiteSpace: "nowrap" }}>{app.status}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Routes>
            <Route path="browse" element={<BrowseJobs />} />
            <Route path="applications" element={<MyApplications />} />
          </Routes>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          #menu-btn {
            display: block !important;
          }
          #sidebar {
            position: fixed;
            left: 0;
            top: 70px;
            width: 260px;
            height: calc(100vh - 70px);
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          #sidebar.open {
            transform: translateX(0);
          }
          #sidebar + div {
            min-width: 0;
          }
        }
        @media (max-width: 480px) {
          #sidebar {
            width: 100%;
          }
        }
      `}</style>

      <script>{`
        const menuBtn = document.getElementById('menu-btn');
        const sidebar = document.getElementById('sidebar');
        if (menuBtn) {
          menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
          });
        }
      `}</script>
    </div>
  );
}

export default StudentDashboard;