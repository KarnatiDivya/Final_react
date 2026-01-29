// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css"; 

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleAdminLogin = (e) => {
//     e.preventDefault();

//     const adminEmail = "admin@gmail.com";
//     const adminPassword = "admin123";

//     if (email === adminEmail && password === adminPassword) {
//       localStorage.setItem("isAdminLoggedIn", "true");
//       navigate("/admin-dashboard"); 
//     } else {
//       setError("Invalid admin credentials");
//     }
//   };

//   // ✅ Button function to go back to user login page
//   const goToUserLogin = () => {
//     navigate("/"); // redirects to App.jsx user login (AuthModal)
//   };

//   return (
//     <div className="admin-login-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleAdminLogin} className="admin-login-form">
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       {error && <p className="error">{error}</p>}

//       {/* ✅ Button to go back to user login page */}
//       <div style={{ marginTop: "1.5em" }}>
//         <button onClick={goToUserLogin} className="user-login-btn">
//           Go to User Login
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const ADMIN = {
      email: "admin@gmail.com",
      password: "admin123",
    };

    if (email === ADMIN.email && password === ADMIN.password) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
      setPassword(""); // clear password field
    }
  };

  const goToUserLogin = () => {
    navigate("/");
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleAdminLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div style={{ marginTop: "1.5em" }}>
        <button onClick={goToUserLogin} className="user-login-btn">
          Go to User Login
        </button>
      </div>
    </div>
  );
}
