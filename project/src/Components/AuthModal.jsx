import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from "../firebase";
import "./AuthModal.css";

export default function AuthModal({ onClose, setIsLoggedIn, setIsGuest }) {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Login / Signup handler
  const handleAuth = async () => {
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setIsLoggedIn(true);
      setIsGuest(false);
      if (onClose) onClose();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
  
      setIsGuest(true);
      setIsLoggedIn(true);
  
      if (onClose) onClose();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);    
      setIsGuest(false);
      setIsLoggedIn(false);
      navigate("/myapp/login");
    } catch (err) {
      console.error(err);
    }
  };
  
  const goToAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="fullcard">
      <div className="auth-modal">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <button className="login-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth}>
              {isSignup ? "Create Account" : "Login"}
            </button>

            {error && <p className="error">{error}</p>}

            <p style={{ marginTop: "1em" }}>
              {isSignup ? "Already have an account?" : "Don’t have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                style={{ marginLeft: "0.5em" }}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>

            <button
              onClick={goToAdminLogin}
              style={{ marginTop: "1em", display: "block" }}
              className="admin-login-btn"
            >
              Admin Login
            </button>

            <button
              onClick={handleGuestLogin}
              style={{ marginTop: "1em", display: "block" }}
              className="guest-login-btn"
            >
              Guest Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}



