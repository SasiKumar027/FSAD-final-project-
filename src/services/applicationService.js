export const applyForJob = (
  applications,
  setApplications,
  jobId,
  studentName
) => {
  const exists = applications.find(
    (a) => a.jobId === jobId && a.studentName === studentName
  );

  if (exists) return false;

  const newApplication = {
    id: Date.now(),
    jobId,
    studentName,
    status: "pending",
    hoursLogged: 0,
    feedback: "",
  };

  setApplications([...applications, newApplication]);
  return true;
};

export const updateApplicationStatus = (
  applications,
  setApplications,
  id,
  status
) => {
  setApplications(
    applications.map((a) =>
      a.id === id ? { ...a, status } : a
    )
  );
};

export const logApplicationHours = (
  applications,
  setApplications,
  id,
  hours
) => {
  setApplications(
    applications.map((a) =>
      a.id === id ? { ...a, hoursLogged: a.hoursLogged + hours } : a
    )
  );
};

export const addApplicationFeedback = (
  applications,
  setApplications,
  id,
  feedback
) => {
  setApplications(
    applications.map((a) =>
      a.id === id ? { ...a, feedback } : a
    )
  );
};