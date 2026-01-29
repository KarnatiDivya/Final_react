// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ isLoggedIn, children }) {
//   if (!isLoggedIn) {
//     alert("Please login");
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;



// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth, onAuthStateChanged } from "../firebase";

// function ProtectedRoute({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user); // true if user exists
//     });
//     return unsubscribe;
//   }, []);

//   if (isLoggedIn === null) {
//     // Still checking auth
//     return <p>Loading...</p>;
//   }

//   if (!isLoggedIn) {
//     alert("Please login");
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, isGuest, children }) {
  if (!isLoggedIn && !isGuest) {
    return <Navigate to="/myapp/login" replace />;
  }
  return children;
}

