


// // src/Components/Navbar.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars } from "react-icons/fa";
// import { auth } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import "./Navbar.css";

// function Navbar({
//   cartCount = 0,
//   isGuest = true,
//   setIsGuest = () => {},
//   setIsLoggedIn = () => {},
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
  

//   const location = useLocation();
//   const navigate = useNavigate();

//   // ---------------- FIREBASE AUTH SYNC ----------------
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setIsLoggedIn(!!currentUser);
//       if (currentUser) setIsGuest(false); // if real user logged in, remove guest
//     });

//     return unsubscribe;
//   }, []);

//   // ---------------- LOGOUT ----------------
//   const handleLogout = async () => {
//     try {
//       if (user) await signOut(auth);

//       setUser(null);
//       setIsGuest(false);       // become guest after logout
//       setIsLoggedIn(false);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const closeMenu = () => setMenuOpen(false);


//   const goToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } else {
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMenu();
//   };

//   // ---------------- LOGIN / LOGOUT / GUEST ----------------
//   const isLoggedIn = Boolean(user) || isGuest;
//   const handleLogin = () => {
//     setIsLoggedIn(false); // mark not logged in yet
//     setIsGuest(false); 
//     closeMenu();      // close mobile menu if open
//     navigate("/myapp/login"); // navigate to login page
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* Logo */}
//         <span className="nav-logo" onClick={() => goToSection("home")}>
//           NovaJewels
//         </span>

//         {/* Nav Links */}
//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <span onClick={() => goToSection("home")}>Home</span>
//           <span onClick={() => goToSection("about")}>About</span>
//           <span onClick={() => goToSection("contact")}>Contact</span>

//           <Link to="/myapp/shop" onClick={closeMenu}>
//             Shop
//           </Link>

//           <Link to="/myapp/cart" onClick={closeMenu}>
//             <FaShoppingCart />
//             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>

//           {/* Login / Logout / Guest */}
//           {isLoggedIn ? (
//   <>
//     <Link
//     to="/myapp/login"
//     className="login-logout-btn"
//     onClick={() => {
//       closeMenu();  
//       onLogin     
//       setIsLoggedIn(true); 
//     }}
//   >
//     Login
//   </Link>
//   </>
// ) : (
//   <Link
//     to="/myapp/login"
//     className="login-logout-btn"
//     onClick={closeMenu}
//   >
//     Logout
//   </Link>
// )}

//         </div>

//         <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




//current up



// src/Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar({
  cartCount = 0,
  isGuest = false,
  setIsGuest = () => {},
  setIsLoggedIn = () => {},
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ---------------- FIREBASE AUTH SYNC ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      if (currentUser) setIsGuest(false); // if real user logged in, remove guest
    });

    return unsubscribe;
  }, []);

  // ---------------- LOGOUT ----------------
  // const handleLogout = async () => {
  //   try {
  //     if (user) await signOut(auth);

  //     setUser(null);
  //     setIsGuest(true);       
  //     setIsLoggedIn(true);
  //     navigate("/myapp/login");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handlelogout = async () => {
    if (user) {
      await signOut(auth); 
    }
  
    setIsGuest(false);
    setIsLoggedIn(false);
    navigate("/myapp/login");
  };
  

const handlelogin=()=>{
  
  // setUser(true)
  // console.log(user);
  navigate('/myapp/login')
}
  const closeMenu = () => setMenuOpen(false);

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  // ---------------- LOGIN / LOGOUT / GUEST ----------------
  // const isLoggedIn = Boolean(user);
  const isLoggedIn = Boolean(user) || isGuest;


  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <span className="nav-logo" onClick={() => goToSection("home")}>
          NovaJewels
        </span>

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <span onClick={() => goToSection("home")}>Home</span>
          <span onClick={() => goToSection("about")}>About</span>
          <span onClick={() => goToSection("contact")}>Contact</span>

          <Link to="/myapp/shop" onClick={closeMenu}>
            Shop
          </Link>

          <Link to="/myapp/cart" onClick={closeMenu}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {/* Login / Logout / Guest */}
         

{!isLoggedIn ? (
  
  <Link to="/login" className="login-logout-btn" onClick={handlelogin}>
  Login
</Link>
) : (
  <Link to="/login" className="login-logout-btn" onClick={handlelogout}>
  Logout
</Link>
)}

        </div>

        {/* Hamburger Menu */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;



