

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// import AuthModal from "./Components/AuthModal.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import MyApp from "./MyApp.jsx";

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<AuthModal />} />
//       <Route path="/admin-login" element={<AdminLogin />} />

//       {/* Admin Protected Route */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />
//         }
//       />

//       {/* User Protected Route */}
//       <Route
//         path="/myapp/*"
//         element={user && !isAdminLoggedIn ? <MyApp /> : <Navigate to="/" />}
//       />

//       {/* Catch-all */}
//       <Route
//         path="*"
//         element={
//           isAdminLoggedIn ? (
//             <Navigate to="/admin-dashboard" />
//           ) : user ? (
//             <Navigate to="/myapp" />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }




// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import Cart from "./pages/Cart.jsx";
// import React, { useState } from "react";
// import AdminLogin from "./pages/AdminLogin.jsx";

// function App({ isLoggedIn, setIsLoggedIn}) {
//     const [cart, setCart] = useState([]);
    

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//   <Route
//         path="/myapp/shop"
//         element={
//           <ProtectedRoute isLoggedIn={isLoggedIn}>
//       <Shop cart={cart} setCart={setCart} />
//           </ProtectedRoute>
//         }
//       />    
//  <Route
//     path="/myapp/cart"
//     element={
//       <ProtectedRoute isLoggedIn={isLoggedIn}>
// <Cart cart={cart} setCart={setCart} />   
//    </ProtectedRoute>
//     }
//   />    
//           {/* <Route path="/myapp/cart" element={<Cart cart={cart} setCart={setCart} />} /> */}

  
//   <Route path="/admin-login" element={<AdminLogin />} />
//   <Route path="/admin-dashboard" element={<AdminDashboard />}/>
//   <Route path="/myapp/login" element={<AuthModal />} />


//   </Routes>

  
//   );
// }

// export default App;




// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isGuest, setIsGuest] = useState(false); // <-- false by default
//   const [cartCount, setCartCount] = useState(0);

//   // Load guest status from localStorage
//   useEffect(() => {
//     const savedGuest = localStorage.getItem("isGuest");
//     if (savedGuest === "true") setIsGuest(true);
//   }, []);

//   // Persist guest status
//   useEffect(() => {
//     localStorage.setItem("isGuest", isGuest);
//   }, [isGuest]);

//   return (
//     <>

//       <Routes>
//         {/* Home */}
//         <Route
//           path="/"
//           element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
//         />

     

//         {/* Login / AuthModal */}
//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onClose={() => setModalOpen(false)}
//             />
//           }
//         />

//         {/* Shop - guest + logged in */}
//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         {/* Cart - guest + logged in */}
//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin */}
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


// // src/App.jsx
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import Navbar from "./Components/Navbar.jsx";
// import CategoryPage from "./pages/CategoryPage.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false); // <-- false initially
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <>
//       {/* Navbar always visible */}
//       <Navbar cartCount={cartCount} isGuest={isGuest} setIsGuest={setIsGuest} />

//       <Routes>
//         <Route
//           path="/"
//           element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
//         />

//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onClose={() => setModalOpen(false)}
//             />
//           }
//         />

//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route
//   path="/myapp/category/:category"
//   element={
//     <CategoryPage
//       cart={cart}
//       setCart={setCart}
//       isGuest={isGuest}
//       setIsGuest={setIsGuest}
//     />
//   }
// />
//       </Routes>
//     </>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import Navbar from "./Components/Navbar.jsx";
// import CategoryPage from "./pages/CategoryPage.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   const location = useLocation();

//   // Show Navbar only on certain paths
//   const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
//   const showNavbar =
//     navbarPaths.includes(location.pathname) ||
//     location.pathname.startsWith("/myapp/category/");

//   return (
//     <>
//       {showNavbar && (
//         // <Navbar
//         //   cartCount={cartCount}
//         //   isGuest={isGuest}
//         //   setIsGuest={setIsGuest}
//         //   setIsLoggedIn={setIsLoggedIn}
//         // />
//         <Navbar
//   cartCount={cartCount}
//   isGuest={isGuest}
//   setIsGuest={setIsGuest}
//   setIsLoggedIn={setIsLoggedIn} // <-- add this
// />

//       )}
      

//       <Routes>
//         <Route path="/" element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />} />

//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onClose={() => setModalOpen(false)}
//             />
//           }
//         />

//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} isGuest={isGuest} setIsGuest={setIsGuest} />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} isGuest={isGuest} setIsGuest={setIsGuest} />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />

//         <Route
//           path="/myapp/category/:category"
//           element={
//             <CategoryPage
//               cart={cart}
//               setCart={setCart}
//               isGuest={isGuest}
//               setIsGuest={setIsGuest}
//             />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import Navbar from "./Components/Navbar.jsx";
// import CategoryPage from "./pages/CategoryPage.jsx";
// import AuthModal from "./Components/AuthModal.jsx";

// function AppWrapper() {
//   // Needed to use useLocation inside BrowserRouter
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   const location = useLocation();

//   // Show Navbar only on specific paths
//   const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
//   const showNavbar =
//     navbarPaths.includes(location.pathname) ||
//     location.pathname.startsWith("/myapp/category/");

//   return (
//     <>
//       {/* Navbar */}
//       {showNavbar && (
//         <Navbar
//           cartCount={cartCount}
//           isGuest={isGuest}
//           setIsGuest={setIsGuest}
//           setIsLoggedIn={setIsLoggedIn}
//           setModalOpen={setModalOpen} // control modal from Navbar
//         />
//       )}

//       {/* Auth Modal */}
//       {modalOpen && (
//         <AuthModal
//           setIsLoggedIn={setIsLoggedIn}
//           setIsGuest={setIsGuest}
//           onClose={() => setModalOpen(false)}
//         />
//       )}

//       <Routes>
//         <Route
//           path="/"
//           element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
//         />

//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop
//                 cart={cart}
//                 setCart={setCart}
//                 isGuest={isGuest}
//                 setIsGuest={setIsGuest}
//               />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart
//                 cart={cart}
//                 setCart={setCart}
//                 isGuest={isGuest}
//                 setIsGuest={setIsGuest}
//               />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/category/:category"
//           element={
//             <CategoryPage
//               cart={cart}
//               setCart={setCart}
//               isGuest={isGuest}
//               setIsGuest={setIsGuest}
//             />
//           }
//         />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </>
//   );
// }

// export default AppWrapper;


// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import CategoryPage from "./pages/CategoryPage.jsx";
// import Navbar from "./Components/Navbar.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   const location = useLocation();

//   // Show Navbar only on certain paths
//   const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
//   const showNavbar =
//     navbarPaths.includes(location.pathname) ||
//     location.pathname.startsWith("/myapp/category/");

//   // Load guest status from localStorage
//   useEffect(() => {
//     const savedGuest = localStorage.getItem("isGuest");
//     if (savedGuest === "true") setIsGuest(true);
//   }, []);

//   // Persist guest status
//   useEffect(() => {
//     localStorage.setItem("isGuest", isGuest);
//   }, [isGuest]);

//   return (
//     <>
//       {/* Navbar */}
//       {showNavbar && (
//         <Navbar
//           cartCount={cartCount}
//           isGuest={isGuest}
//           setIsGuest={setIsGuest}
//           setIsLoggedIn={setIsLoggedIn}
//           setModalOpen={setModalOpen} // allows Navbar to open modal
//         />
//       )}

//       {/* Auth Modal */}
//       {modalOpen && (
//         <AuthModal
//           setIsLoggedIn={setIsLoggedIn}
//           setIsGuest={setIsGuest}
//           onClose={() => setModalOpen(false)}
//         />
//       )}

//       {/* Routes */}
//       <Routes>
//         <Route
//           path="/"
//           element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
//         />

//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onClose={() => setModalOpen(false)}
//             />
//           }
//         />

//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />

//         <Route
//           path="/myapp/category/:category"
//           element={
//             <CategoryPage
//               cart={cart}
//               setCart={setCart}
//               isGuest={isGuest}
//               setIsGuest={setIsGuest}
//             />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AuthModal from "./Components/AuthModal.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();

  /* =========================
     🔥 FIREBASE AUTH SYNC
  ========================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsGuest(false); // real user overrides guest
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  /* =========================
     NAVBAR VISIBILITY
  ========================== */
  const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
  const showNavbar =
    navbarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/myapp/category/");

  /* =========================
     GUEST PERSISTENCE
  ========================== */
  useEffect(() => {
    const savedGuest = localStorage.getItem("isGuest");
    if (savedGuest === "true") setIsGuest(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("isGuest", isGuest);
  }, [isGuest]);

  /* =========================
     CART COUNT
  ========================== */
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  return (
    <>
      {/* NAVBAR */}
      {showNavbar && (
        // <Navbar
        //   cartCount={cartCount}
        //   isGuest={isGuest}
        //   setIsGuest={setIsGuest}
        //   setIsLoggedIn={setIsLoggedIn}
        //   setModalOpen={setModalOpen}
        // />

        <Navbar
  isGuest={isGuest}
  setIsGuest={setIsGuest}
  setIsLoggedIn={setIsLoggedIn}
  isLoggedIn={isLoggedIn}
/>
      )}
      
 {/* <Home
      isGuest={isGuest}
      setIsGuest={setIsGuest}
      setIsLoggedIn={setIsLoggedIn}
    /> */}
      {/* AUTH MODAL */}
      {/* {modalOpen && (
        <AuthModal
          setIsLoggedIn={setIsLoggedIn}
          setIsGuest={setIsGuest}
          onClose={() => setModalOpen(false)}
        />
      )} */}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
        />

        <Route
          path="/myapp/login"
          element={
            <AuthModal
              setIsLoggedIn={setIsLoggedIn}
              setIsGuest={setIsGuest}
              onClose={() => setModalOpen(false)}
            />
          }
        />

        <Route
          path="/myapp/shop"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
              <Shop cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myapp/cart"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="/myapp/category/:category"
          element={
            <CategoryPage
              cart={cart}
              setCart={setCart}
              isGuest={isGuest}
              setIsGuest={setIsGuest}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;



// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import CategoryPage from "./pages/CategoryPage.jsx";
// import Navbar from "./Components/Navbar.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   const location = useLocation();

//   /* =========================
//      🔥 FIREBASE AUTH SYNC
//   ========================== */
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setIsGuest(false); // real user overrides guest
//       } else if (!isGuest) {
//         setIsLoggedIn(false);
//       }
//     });
//     return unsubscribe;
//   }, [isGuest]);

//   /* =========================
//      NAVBAR VISIBILITY
//   ========================== */
//   const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
//   const showNavbar =
//     navbarPaths.includes(location.pathname) ||
//     location.pathname.startsWith("/myapp/category/");

//   /* =========================
//      GUEST PERSISTENCE
//   ========================== */
//   useEffect(() => {
//     const savedGuest = localStorage.getItem("isGuest");
//     if (savedGuest === "true") setIsGuest(true);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("isGuest", isGuest);
//     // If guest logs in, also mark as logged in
//     if (isGuest) setIsLoggedIn(true);
//     else if (!auth.currentUser) setIsLoggedIn(false);
//   }, [isGuest]);

//   /* =========================
//      CART COUNT
//   ========================== */
//   useEffect(() => {
//     setCartCount(cart.length);
//   }, [cart]);
//   const handleLogin = () => {
//     setIsLoggedIn(true);   // ✅ Update state to logged in
//     setIsGuest(false);
//     navigate("/");          // optional redirect
//   };

//   // Function to call on logout
//   const handleLogout = async () => {
//     setIsLoggedIn(false);  // ✅ Update state to logged out
//     setIsGuest(false);
//     navigate("/myapp/login");
//   };
//   return (
//     <>
//       {/* NAVBAR */}
//       {showNavbar && (
//         // <Navbar
//         //   cartCount={cartCount}
//         //   isGuest={isGuest}
//         //   setIsGuest={setIsGuest}
//         //   isLoggedIn={isLoggedIn}
//         //   setIsLoggedIn={setIsLoggedIn}
//         // />
//         <Navbar
//         isLoggedIn={isLoggedIn}
//         onLogin={handleLogin}   // pass login handler
//         onLogout={handleLogout} // pass logout handler
//       />
//       )}

//       {/* ROUTES */}
//       <Routes>
//         <Route
//           path="/"
//           element={<Home isGuest={isGuest} setIsGuest={setIsGuest} />}
//         />

//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onClose={() => {}}
//             />
//           }
//         />

//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />

//         <Route
//           path="/myapp/category/:category"
//           element={
//             <CategoryPage
//               cart={cart}
//               setCart={setCart}
//               isGuest={isGuest}
//               setIsGuest={setIsGuest}
//             />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { auth, onAuthStateChanged, signOut } from "./firebase";

// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";
// import Cart from "./pages/Cart.jsx";
// import AuthModal from "./Components/AuthModal.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import Navbar from "./Components/Navbar.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isGuest, setIsGuest] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Sync Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setIsGuest(false);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     setCartCount(cart.length);
//   }, [cart]);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setIsGuest(false);
//   };

//   const handleLogout = async () => {
//     try {
//       if (auth.currentUser) await signOut(auth);
//       setIsLoggedIn(false);
//       setIsGuest(false);
//       navigate("/myapp/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const navbarPaths = ["/", "/myapp/shop", "/myapp/cart"];
//   const showNavbar =
//     navbarPaths.includes(location.pathname) ||
//     location.pathname.startsWith("/myapp/category/");

//   return (
//     <>
//       {showNavbar && (
//         <Navbar
//           cartCount={cartCount}
//           isLoggedIn={isLoggedIn}
//           isGuest={isGuest}
//           onLogin={handleLogin}
//           onLogout={handleLogout}
//         />
//       )}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/myapp/login"
//           element={
//             <AuthModal
//               setIsLoggedIn={setIsLoggedIn}
//               setIsGuest={setIsGuest}
//               onLogin={handleLogin}
//             />
//           }
//         />
//         <Route
//           path="/myapp/shop"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Shop cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/myapp/cart"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn} isGuest={isGuest}>
//               <Cart cart={cart} setCart={setCart} />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
