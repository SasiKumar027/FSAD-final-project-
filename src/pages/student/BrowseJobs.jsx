import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import JobCard from "../../components/jobs/JobCard";
import { applyForJob } from "../../services/applicationService";

function BrowseJobs() {
  const { jobs, applications, setApplications, currentUser } = useContext(AppContext);
  const [feedback, setFeedback] = useState("");

  const handleApply = (jobId) => {
    if (!currentUser) {
      setFeedback("Please login to apply for jobs.");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    const success = applyForJob(applications, setApplications, jobId, currentUser.name);
    if (success) {
      setFeedback("✓ Application submitted successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } else {
      setFeedback("You have already applied for this job.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const getAppliedJobs = () => {
    return applications
      .filter((app) => app.studentName === currentUser?.name)
      .map((app) => app.jobId);
  };

  const appliedJobIds = getAppliedJobs();

  return (
    <div className="container">
      <h3>Available Jobs</h3>
      {feedback && (
        <div style={{
          backgroundColor: feedback.includes("✓") ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
          border: feedback.includes("✓") ? "1px solid #10b981" : "1px solid #ef4444",
          color: feedback.includes("✓") ? "#10b981" : "#ef4444",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "16px",
          textAlign: "center"
        }}>
          {feedback}
        </div>
      )}
      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            isApplied={appliedJobIds.includes(job.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BrowseJobs;