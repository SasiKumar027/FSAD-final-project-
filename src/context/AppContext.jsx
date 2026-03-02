import { createContext, useEffect, useState } from "react";
import { ROLES } from "../utils/constants";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const defaultJobs = [
    { id: 1, title: "Library Assistant", department: "Library", hoursPerWeek: "10" },
    { id: 2, title: "Lab Technician", department: "Science", hoursPerWeek: "15" },
    { id: 3, title: "IT Support", department: "IT", hoursPerWeek: "12" },
  ];

  const [jobs, setJobs] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("jobs"));
    return stored && stored.length ? stored : defaultJobs;
  });

  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications")) || []
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (name, role, password) => {
    setCurrentUser({ name, role, password });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        applications,
        setApplications,
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};