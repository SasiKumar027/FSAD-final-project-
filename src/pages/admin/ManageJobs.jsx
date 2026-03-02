import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import JobForm from "../../components/jobs/JobForm";
import JobCard from "../../components/jobs/JobCard";
import Modal from "../../components/common/Modal";
import { createJob, deleteJob } from "../../services/jobService";

function ManageJobs() {
  const { jobs, setJobs } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (jobData) => {
    createJob(jobs, setJobs, jobData);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteJob(jobs, setJobs, id);
  };

  return (
    <div className="container">
      <button onClick={() => setModalOpen(true)}>Add Job</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3>Add New Job</h3>
        <JobForm onSubmit={handleAdd} />
      </Modal>

      <h3>All Jobs</h3>
      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}>
            <button className="button-danger" onClick={() => handleDelete(job.id)}>
              Delete
            </button>
          </JobCard>
        ))}
      </div>
    </div>
  );
}

export default ManageJobs;