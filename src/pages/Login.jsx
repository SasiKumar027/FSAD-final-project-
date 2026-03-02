import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ROLES } from "../utils/constants";

function Login() {
  const { login } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login form states
  const [studentName, setStudentName] = useState("student");
  const [studentPassword, setStudentPassword] = useState("1234");
  const [adminName, setAdminName] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("1234");
  
  // Signup form states
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpRole, setSignUpRole] = useState(ROLES.STUDENT);
  
  const navigate = useNavigate();

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentName || !studentPassword) return alert("Please fill in all fields");

    // Check against registered users first
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = registeredUsers.find(
      u => (u.email === studentName || u.name === studentName) && u.password === studentPassword && u.role === ROLES.STUDENT
    );

    if (user) {
      login(user.name, ROLES.STUDENT, studentPassword);
      navigate("/student");
      return;
    }

    // Fall back to hardcoded student credentials
    if (studentName === "student" && studentPassword === "1234") {
      login(studentName, ROLES.STUDENT, studentPassword);
      navigate("/student");
    } else {
      alert("Invalid student credentials");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminName || !adminPassword) return alert("Please fill in all fields");

    // Check against registered admin users
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = registeredUsers.find(
      u => (u.email === adminName || u.name === adminName) && u.password === adminPassword && u.role === ROLES.ADMIN
    );

    if (user) {
      login(user.name, ROLES.ADMIN, adminPassword);
      navigate("/admin");
      return;
    }

    // Fall back to hardcoded admin credentials
    if (adminName === "admin" && adminPassword === "1234") {
      login(adminName, ROLES.ADMIN, adminPassword);
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      return alert("Please fill in all fields");
    }
    
    if (signUpPassword !== signUpConfirmPassword) {
      return alert("Passwords do not match");
    }
    
    if (signUpPassword.length < 4) {
      return alert("Password must be at least 4 characters");
    }
    
    // Get existing users from localStorage or create empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if user already exists
    const userExists = existingUsers.find(u => u.email === signUpEmail);
    if (userExists) {
      return alert("User with this email already exists");
    }
    
    // Add new user
    const newUser = {
      id: Date.now(),
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: signUpRole
    };
    
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    
    alert("✓ Account created successfully! You can now login.");
    
    // Reset signup form and switch to login
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpConfirmPassword("");
    setIsSignUp(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Work Study Portal</h1>
      
      {/* Tab Navigation */}
      <div className="login-tabs">
        <button 
          className={`tab-button ${!isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(false)}
        >
          Login
        </button>
        <button 
          className={`tab-button ${isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Login Forms */}
      {!isSignUp && (
        <div className="login-grid">
          {/* Student Login */}
          <div className="login-card">
            <h2>Student Login</h2>
            <form onSubmit={handleStudentLogin}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn-student">
                Login as Student
              </button>
              <p style={{ textAlign: "center", fontSize: "0.85em", color: "#999", marginTop: "12px" }}>
                Student → student / 1234
              </p>
            </form>
          </div>

          {/* Admin Login */}
          <div className="login-card">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn-admin">
                Login as Admin
              </button>
              <p style={{ textAlign: "center", fontSize: "0.85em", color: "#999", marginTop: "12px" }}>
                Admin → admin / 1234
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Signup Form */}
      {isSignUp && (
        <div className="login-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="login-card" style={{ maxWidth: "450px" }}>
            <h2>Create Your Account</h2>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select value={signUpRole} onChange={(e) => setSignUpRole(e.target.value)}>
                  <option value={ROLES.STUDENT}>Student</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Enter password (min 4 characters)"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className="btn-signup">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;