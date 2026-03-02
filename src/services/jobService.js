export const createJob = (jobs, setJobs, jobData) => {
  const newJob = {
    id: Date.now(),
    ...jobData,
  };
  setJobs([...jobs, newJob]);
};

export const deleteJob = (jobs, setJobs, id) => {
  setJobs(jobs.filter((job) => job.id !== id));
};