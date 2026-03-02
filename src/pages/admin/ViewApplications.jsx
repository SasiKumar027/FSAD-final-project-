import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { STATUS } from "../../utils/constants";

function ViewApplications() {
  const { applications, setApplications, jobs } = useContext(AppContext);
  const [feedback, setFeedback] = useState("");
  const [hoursInput, setHoursInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [showHoursModal, setShowHoursModal] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(null);

  const updateStatus = (id, status) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const handleLogHours = (id) => {
    const h = Number(hoursInput);
    if (!h || h <= 0) {
      setFeedback("Please enter a valid number");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, hoursLogged: app.hoursLogged + h }
          : app
      )
    );
    setFeedback(`✓ ${h} hours logged successfully!`);
    setTimeout(() => setFeedback(""), 3000);
    setHoursInput("");
    setShowHoursModal(null);
  };

  const handleGiveFeedback = (id) => {
    if (!feedbackInput.trim()) {
      setFeedback("Please enter feedback");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, feedback: feedbackInput } : app
      )
    );
    setFeedback("✓ Feedback submitted successfully!");
    setTimeout(() => setFeedback(""), 3000);
    setFeedbackInput("");
    setShowFeedbackModal(null);
  };

  return (
    <div className="container">
      <h3>Applications</h3>
      {applications.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999", fontSize: "1.1em" }}>
          No applications yet.
        </p>
      ) : (
        <div className="job-grid">
          {applications.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            return (
              <div key={app.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                  <div>
                    <h4 className="job-card-title" style={{ margin: 0 }}>
                      {job?.title || "Unknown Job"}
                    </h4>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.9em", color: "#aaa" }}>
                      {app.studentName}
                    </p>
                  </div>
                  <span className={"badge badge-" + app.status}>{app.status}</span>
                </div>
                <p style={{ margin: "8px 0", color: "#aaa" }}>
                  <strong>Department:</strong> {job?.department || "N/A"}
                </p>
                <p style={{ margin: "8px 0", color: "#aaa" }}>
                  <strong>Hours/Week:</strong> {job?.hoursPerWeek || "N/A"}
                </p>
                <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
                <p style={{ margin: "8px 0", color: "#aaa" }}>
                  <strong>Applied Date:</strong> {new Date(app.id).toLocaleDateString()}
                </p>
                <p style={{ margin: "8px 0", color: "#aaa" }}>
                  <strong>Hours Logged:</strong> {app.hoursLogged}
                </p>
                {app.feedback && (
                  <div style={{ marginTop: "12px", padding: "10px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "6px" }}>
                    <strong>Feedback Given:</strong>
                    <p style={{ margin: "6px 0 0 0" }}>{app.feedback}</p>
                  </div>
                )}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                  {app.status !== STATUS.APPROVED && (
                    <button
                      onClick={() => updateStatus(app.id, STATUS.APPROVED)}
                      style={{ flex: 1, backgroundColor: "#10b981" }}
                    >
                      Approve
                    </button>
                  )}
                  {app.status !== STATUS.REJECTED && (
                    <button
                      onClick={() => updateStatus(app.id, STATUS.REJECTED)}
                      style={{ flex: 1, backgroundColor: "#ef4444" }}
                    >
                      Reject
                    </button>
                  )}
                </div>
                {app.status === STATUS.APPROVED && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={() => setShowHoursModal(app.id)} style={{ flex: 1 }}>
                      Log Hours
                    </button>
                    <button onClick={() => setShowFeedbackModal(app.id)} style={{ flex: 1, backgroundColor: "#f59e0b" }}>
                      Give Feedback
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Hours Input Modal */}
      {showHoursModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            minWidth: "320px",
            maxWidth: "420px",
            color: "#333"
          }}>
            <h3 style={{ marginTop: 0 }}>Log Hours</h3>
            <input
              type="number"
              min="1"
              value={hoursInput}
              onChange={(e) => setHoursInput(e.target.value)}
              placeholder="Enter hours to add"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1em",
                boxSizing: "border-box",
                marginBottom: "12px"
              }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleLogHours(showHoursModal)}
                style={{
                  flex: 1,
                  backgroundColor: "#10b981",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowHoursModal(null);
                  setHoursInput("");
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#e5e7eb",
                  color: "#333",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Input Modal */}
      {showFeedbackModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            minWidth: "320px",
            maxWidth: "420px",
            color: "#333"
          }}>
            <h3 style={{ marginTop: 0 }}>Give Feedback</h3>
            <textarea
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="Enter your feedback..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1em",
                minHeight: "100px",
                boxSizing: "border-box",
                marginBottom: "12px",
                fontFamily: "inherit"
              }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleGiveFeedback(showFeedbackModal)}
                style={{
                  flex: 1,
                  backgroundColor: "#f59e0b",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowFeedbackModal(null);
                  setFeedbackInput("");
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#e5e7eb",
                  color: "#333",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {feedback && (
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: feedback.includes("✓") ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)",
          color: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          fontSize: "1em",
          zIndex: 1000
        }}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default ViewApplications;