import Button from "../common/Button";

function JobCard({ job, onApply, children, isApplied }) {
  return (
    <div className="card">
      <h4 className="job-card-title">{job.title}</h4>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.85em", color: "#6b7280" }}>Department: {job.department}</span>
        <span style={{ fontSize: "0.85em", color: "#6b7280" }}>⌛ {job.hoursPerWeek} hrs/week</span>
      </div>
      {onApply && (
        <Button
          onClick={() => onApply(job.id)}
          disabled={isApplied}
          style={{ opacity: isApplied ? 0.6 : 1, cursor: isApplied ? "not-allowed" : "pointer" }}
        >
          {isApplied ? "✓ Applied" : "Apply"}
        </Button>
      )}
      {children}
    </div>
  );
}

export default JobCard;