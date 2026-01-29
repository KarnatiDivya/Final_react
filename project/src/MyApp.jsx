import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut, auth } from "./firebase"; 
// import Navbar from "./Components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import "./Footer.css";

function MyApp({ user }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // This function is passed to Navbar
  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);  // logout from firebase
      navigate("/");                // redirect to login/auth page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <Navbar cartCount={cart.length} onLogout={handleLogout} />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Karnati Divya. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:divyareddykarnati9502@gmail.com">divyareddykarnati9502@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/divyakarnati3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
}

export default MyApp;




















// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { signOut } from "./firebase"; // make sure you export signOut from firebase.js
// import Navbar from "./Components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import "./Footer.css";

// function MyApp({ user }) {
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//  const handleLogout = async () => {
//   try {
//     await signOut(auth); // make sure auth is imported
//     navigate("/");       // redirect after successful logout
//   } catch (err) {
//     console.error("Logout failed:", err);
//   }
// };


//   return (
//     <>
//       <Navbar cartCount={cart.length} onLogout={handleLogout} />
//       <div style={{ paddingTop: "60px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
//           <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//         </Routes>
//       </div>

//       <footer className="footer">
//         <p>© {new Date().getFullYear()} Karnati Divya. All rights reserved.</p>
//         <div className="footer-links">
//           <a href="mailto:divyareddykarnati9502@gmail.com">divyareddykarnati9502@gmail.com</a>
//           <a
//             href="https://www.linkedin.com/in/divyakarnati3/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             LinkedIn
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default MyApp;

