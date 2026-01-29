// // src/pages/CategoryPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { initialProductsInCode } from "./JewelryData";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryPage.css"

// function CategoryPage({ cart, setCart, isGuest, setIsGuest }) {
//   const { category } = useParams(); // get category from URL
//   const navigate = useNavigate();

//   // State
//   const [products, setProducts] = useState(
//     initialProductsInCode.map((p) => ({
//       ...p,
//       data: [...p.data, []], // ratings at index 4
//     }))
//   );
//   const [hoverRatings, setHoverRatings] = useState({});
//   const [filters, setFilters] = useState({ price: "all", rating: "all" });
//   const [searchProduct, setSearchProduct] = useState(""); // search by product name
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   /* ---------------- CART ---------------- */
//   const addToCart = (product) => {
//     const itemToAdd = {
//       name: product.data[0],
//       price: product.data[1],
//       image: product.data[2],
//     };
//     setCart((prev) => [...prev, itemToAdd]);
//     toast.success(`${itemToAdd.name} added to cart!`);
//   };

//   /* ---------------- RATINGS ---------------- */
//   const handleRating = (categoryName, productIndex, star) => {
//     setProducts((prev) =>
//       prev.map((prod) => {
//         if (prod.category === categoryName) {
//           const categoryProducts = prev.filter((p) => p.category === categoryName);
//           const indexInCategory = categoryProducts.indexOf(prod);
//           if (indexInCategory === productIndex) {
//             const newData = [...prod.data];
//             newData[4] = [star];
//             return { ...prod, data: newData };
//           }
//         }
//         return prod;
//       })
//     );
//   };

//   const calculateAverage = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   /* ---------------- FILTERS ---------------- */
//   const categoryProducts = products
//     .filter((p) => p.category === category)
//     .map((p) => {
//       const [name, price, image, description, ratings] = p.data;
//       return { name, price, image, description, ratings, full: p };
//     });

//   const filteredProducts = categoryProducts.filter((item) => {
//     let passPrice = true;
//     let passRating = true;
//     let passName = true;

//     // Price filter
//     if (filters.price !== "all") {
//       if (filters.price === "low") passPrice = item.price < 100;
//       if (filters.price === "mid") passPrice = item.price >= 100 && item.price <= 250;
//       if (filters.price === "high") passPrice = item.price > 250;
//     }

//     // Rating filter
//     if (filters.rating !== "all") {
//       const avg = parseFloat(calculateAverage(item.ratings));
//       if (filters.rating === "low") passRating = avg < 3;
//       if (filters.rating === "mid") passRating = avg >= 3 && avg <= 4;
//       if (filters.rating === "high") passRating = avg > 4;
//     }

//     // Product name search filter
//     if (searchProduct) passName = item.name.toLowerCase().includes(searchProduct.toLowerCase());

//     return passPrice && passRating && passName;
//   });

//   return (
//     <>
//       <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />
//       <div className="shop-container">
//         <div style={{ marginTop: "50px" }} />

//         <ToastContainer position="top-center" autoClose={3000} theme="colored" />

//         {/* Back button */}
//         <button onClick={() => navigate(-1)} className="back-btn">
//           ← Back
//         </button>

//         <h1 style={{ marginBottom: "20px" }}>{category} Collection</h1>

//         {/* Filters */}
//         <div className="filters-top">
//           <input
//             type="text"
//             placeholder="Search by product name…"
//             value={searchProduct}
//             onChange={(e) => setSearchProduct(e.target.value)}
//           />

//           <select
//             value={filters.price}
//             onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//           >
//             <option value="all">All Prices</option>
//             <option value="low">Below ₹100</option>
//             <option value="mid">₹100–250</option>
//             <option value="high">Above ₹250</option>
//           </select>

//           <select
//             value={filters.rating}
//             onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//           >
//             <option value="all">All Ratings</option>
//             <option value="low">Below 3</option>
//             <option value="mid">3–4</option>
//             <option value="high">Above 4</option>
//           </select>
//         </div>

//         {/* Product Grid */}
//         <div className="product-grid">
//           {filteredProducts.map((item, index) => {
//             const currentRating = Math.round(calculateAverage(item.ratings));
//             const hoverRating = hoverRatings[item.name] || 0;

//             return (
//               <div key={index} className="product-card">
//                 <img src={item.image} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>₹{item.price}</p>
//                 <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     style={{
//                       cursor: "pointer",
//                       color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
//                       fontSize: "22px",
//                     }}
//                     onClick={() => handleRating(category, index, star)}
//                     onMouseEnter={() => setHoverRatings({ ...hoverRatings, [item.name]: star })}
//                     onMouseLeave={() => setHoverRatings({ ...hoverRatings, [item.name]: 0 })}
//                   >
//                     ★
//                   </span>
//                 ))}

//                 <button onClick={() => addToCart(item.full)}>Add to Cart</button>
//                 <button onClick={() => setSelectedProduct(item)}>View Details</button>
//               </div>
//             );
//           })}

//           {filteredProducts.length === 0 && <p>No products found matching the filters.</p>}
//         </div>

//         {/* Modal */}
//         {selectedProduct && (
//           <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//             <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//               <span className="modal-close" onClick={() => setSelectedProduct(null)}>✕</span>
//               <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
//               <h3>{selectedProduct.name}</h3>
//               <p className="modal-price">₹{selectedProduct.price}</p>
//               <p className="modal-description">{selectedProduct.description}</p>
//               <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>
//               <button className="modal-add-cart" onClick={() => addToCart(selectedProduct.full)}>Add to Cart</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default CategoryPage;



// // src/pages/CategoryPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { initialProductsInCode } from "./JewelryData";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryPage.css";

// function CategoryPage({ cart, setCart, isGuest, setIsGuest }) {
//   const { category } = useParams();
//   const navigate = useNavigate();

//   // ------------------- STATE -------------------
//   const [products, setProducts] = useState(
//     initialProductsInCode.map((p) => ({
//       ...p,
//       data: [...p.data, []], // ratings at index 4
//     }))
//   );

//   const [hoverRatings, setHoverRatings] = useState({});
//   const [filters, setFilters] = useState({ price: "all", rating: "all" });
//   const [searchProduct, setSearchProduct] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ------------------- CART -------------------
//   const addToCart = (product) => {
//     const itemToAdd = {
//       name: product.data[0],
//       price: product.data[1],
//       image: product.data[2],
//     };
//     setCart((prev) => [...prev, itemToAdd]);
//     toast.success(`${itemToAdd.name} added to cart!`);
//   };

//   // ------------------- RATINGS -------------------
//   const handleRating = (categoryName, productIndex, star) => {
//     setProducts((prev) =>
//       prev.map((prod) => {
//         if (prod.category === categoryName) {
//           const categoryProducts = prev.filter((p) => p.category === categoryName);
//           const indexInCategory = categoryProducts.indexOf(prod);
//           if (indexInCategory === productIndex) {
//             const newData = [...prod.data];
//             newData[4] = [star];
//             return { ...prod, data: newData };
//           }
//         }
//         return prod;
//       })
//     );
//   };

//   const calculateAverage = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   // ------------------- FILTERS -------------------
//   const categoryProducts = products
//     .filter((p) => p.category === category)
//     .map((p) => {
//       const [name, price, image, description, ratings, details] = p.data;
//       return { name, price, image, description, ratings, details, full: p };
//     });

//   const filteredProducts = categoryProducts.filter((item) => {
//     let passPrice = true;
//     let passRating = true;
//     let passName = true;

//     // Price filter
//     if (filters.price !== "all") {
//       if (filters.price === "low") passPrice = item.price < 100;
//       if (filters.price === "mid") passPrice = item.price >= 100 && item.price <= 250;
//       if (filters.price === "high") passPrice = item.price > 250;
//     }

//     // Rating filter
//     if (filters.rating !== "all") {
//       const avg = parseFloat(calculateAverage(item.ratings));
//       if (filters.rating === "low") passRating = avg < 3;
//       if (filters.rating === "mid") passRating = avg >= 3 && avg <= 4;
//       if (filters.rating === "high") passRating = avg > 4;
//     }

//     // Search filter
//     if (searchProduct) {
//       passName = item.name.toLowerCase().includes(searchProduct.toLowerCase());
//     }

//     return passPrice && passRating && passName;
//   });

//   return (
//     <>
//       <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />

//       <div className="shop-container">
//         <div className="shop-main-content" style={{ marginTop: "50px" }}>
//           {/* LEFT FILTERS */}
//           <aside className="filters-sidebar">
//             {/* Back button */}
//             <button onClick={() => navigate(-1)} className="back-btn">
//               ← Back to Shop
//             </button>

//             {/* Search */}
//             <div className="filters-top" style={{ marginTop: "20px" }}>
//               <input
//                 type="text"
//                 placeholder="Search by product name…"
//                 value={searchProduct}
//                 onChange={(e) => setSearchProduct(e.target.value)}
//               />

//               <select
//                 value={filters.price}
//                 onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//               >
//                 <option value="all">All Prices</option>
//                 <option value="low">Below ₹100</option>
//                 <option value="mid">₹100–250</option>
//                 <option value="high">Above ₹250</option>
//               </select>

//               <select
//                 value={filters.rating}
//                 onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="low">Below 3</option>
//                 <option value="mid">3–4</option>
//                 <option value="high">Above 4</option>
//               </select>
//             </div>
//           </aside>

//           {/* RIGHT PRODUCTS */}
//           <section className="products-content">
//             <h1 style={{ marginBottom: "20px" }}>{category} Collection</h1>

//             <div className="product-grid">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((item, index) => {
//                   const currentRating = Math.round(calculateAverage(item.ratings));
//                   const hoverRating = hoverRatings[item.name] || 0;

//                   return (
//                     <div key={index} className="product-card">
//                       <img src={item.image} alt={item.name} />
//                       <h3>{item.name}</h3>
//                       <p>₹{item.price}</p>
//                       <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

//                       {/* Rating Stars */}
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <span
//                           key={star}
//                           style={{
//                             cursor: "pointer",
//                             color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
//                             fontSize: "22px",
//                           }}
//                           onClick={() => handleRating(category, index, star)}
//                           onMouseEnter={() =>
//                             setHoverRatings({ ...hoverRatings, [item.name]: star })
//                           }
//                           onMouseLeave={() =>
//                             setHoverRatings({ ...hoverRatings, [item.name]: 0 })
//                           }
//                         >
//                           ★
//                         </span>
//                       ))}

//                       <button onClick={() => addToCart(item.full)}>Add to Cart</button>

//                       {/* View Details */}
//                       <button onClick={() => setSelectedProduct(item)}>View Details</button>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No products found matching the filters.</p>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* ------------------- MODAL ------------------- */}
//         {selectedProduct && (
//           <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//             <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//               <span className="modal-close" onClick={() => setSelectedProduct(null)}>
//                 ✕
//               </span>

//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 className="modal-image"
//               />

//               <h3>{selectedProduct.name}</h3>
//               <p className="modal-price">
//                 ₹{selectedProduct.price}{" "}
//                 {selectedProduct.details.discount > 0 && (
//                   <span className="modal-discount">
//                     ({selectedProduct.details.discount}% off)
//                   </span>
//                 )}
//               </p>
//               <p className="modal-description">{selectedProduct.description}</p>
//               <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>

//               {/* Additional Details */}
//               <div className="modal-extra">
//                 <p>
//                   <strong>Brand:</strong> {selectedProduct.details.brand}
//                 </p>
//                 <p>
//                   <strong>Stock Status:</strong> {selectedProduct.details.stockStatus}
//                 </p>
//                 <p>
//                   <strong>Shipping:</strong>{" "}
//                   {selectedProduct.details.shipping.free && "Free Delivery, "}
//                   {selectedProduct.details.shipping.fastDelivery && "Fast Delivery, "}
//                   Estimated {selectedProduct.details.shipping.estimatedDeliveryDays} days
//                 </p>
//               </div>

//               <button
//                 className="modal-add-cart"
//                 onClick={() => addToCart(selectedProduct.full)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         )}

//         <ToastContainer position="top-center" autoClose={3000} theme="colored" />
//       </div>
//     </>
//   );
// }

// export default CategoryPage;





// // src/pages/CategoryPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { initialProductsInCode } from "./JewelryData";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryPage.css";

// function CategoryPage({ cart, setCart, isGuest, setIsGuest }) {
//   const { category } = useParams();
//   const navigate = useNavigate();

//   // ------------------- STATE -------------------
//   const [products, setProducts] = useState(
//     initialProductsInCode.map((p) => ({
//       ...p,
//       data: [...p.data, []], // ratings at index 4
//     }))
//   );

//   const [hoverRatings, setHoverRatings] = useState({});
//   const [filters, setFilters] = useState({
//     price: "all",
//     rating: "all",
//     brand: "all",
//     discount: "all",
//     stockStatus: "all",
//     shipping: "all",
//   });
//   const [searchProduct, setSearchProduct] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ------------------- CART -------------------
//   const addToCart = (product) => {
//     const itemToAdd = {
//       name: product.data[0],
//       price: product.data[1],
//       image: product.data[2],
//     };
//     setCart((prev) => [...prev, itemToAdd]);
//     toast.success(`${itemToAdd.name} added to cart!`);
//   };

//   // ------------------- RATINGS -------------------
//   const handleRating = (categoryName, productIndex, star) => {
//     setProducts((prev) =>
//       prev.map((prod) => {
//         if (prod.category === categoryName) {
//           const categoryProducts = prev.filter((p) => p.category === categoryName);
//           const indexInCategory = categoryProducts.indexOf(prod);
//           if (indexInCategory === productIndex) {
//             const newData = [...prod.data];
//             newData[4] = [star];
//             return { ...prod, data: newData };
//           }
//         }
//         return prod;
//       })
//     );
//   };

//   const calculateAverage = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   // ------------------- FILTERS -------------------
//   const categoryProducts = products
//     .filter((p) => p.category === category)
//     .map((p) => {
//       const [name, price, image, description, ratings, details] = p.data;
//       return { name, price, image, description, ratings, details, full: p };
//     });

//   const filteredProducts = categoryProducts.filter((item) => {
//     let passPrice = true;
//     let passRating = true;
//     let passName = true;
//     let passBrand = true;
//     let passDiscount = true;
//     let passStock = true;
//     let passShipping = true;

//     // Price filter
//     if (filters.price !== "all") {
//       if (filters.price === "low") passPrice = item.price < 100;
//       if (filters.price === "mid") passPrice = item.price >= 100 && item.price <= 250;
//       if (filters.price === "high") passPrice = item.price > 250;
//     }

//     // Rating filter
//     if (filters.rating !== "all") {
//       const avg = parseFloat(calculateAverage(item.ratings));
//       if (filters.rating === "low") passRating = avg < 3;
//       if (filters.rating === "mid") passRating = avg >= 3 && avg <= 4;
//       if (filters.rating === "high") passRating = avg > 4;
//     }

//     // Search filter
//     if (searchProduct) {
//       passName = item.name.toLowerCase().includes(searchProduct.toLowerCase());
//     }

//     // Brand filter
//     if (filters.brand !== "all") {
//       passBrand = item.details?.brand?.toLowerCase() === filters.brand;
//     }

//     // Discount filter
//     if (filters.discount !== "all") {
//       passDiscount = item.details?.discount >= parseInt(filters.discount);
//     }

//     // Stock filter
//     if (filters.stockStatus !== "all") {
//       if (filters.stockStatus === "in") passStock = item.details?.stockStatus.toLowerCase() === "in stock";
//       if (filters.stockStatus === "out") passStock = item.details?.stockStatus.toLowerCase() === "out of stock";
//     }

//     // Shipping filter
//     if (filters.shipping !== "all") {
//       if (filters.shipping === "free") passShipping = item.details?.shipping?.free;
//       if (filters.shipping === "paid") passShipping = !item.details?.shipping?.free;
//     }

//     return passPrice && passRating && passName && passBrand && passDiscount && passStock && passShipping;
//   });

//   return (
//     <>
//       <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />

//       <div className="shop-container">
//         <div className="shop-main-content" style={{ marginTop: "50px" }}>
//           {/* LEFT FILTERS */}
//           <aside className="filters-sidebar">
//             <button onClick={() => navigate(-1)} className="back-btn">
//               ← Back to Shop
//             </button>

//             <div className="filters-top" style={{ marginTop: "20px" }}>
//               {/* Search */}
//               <input
//                 type="text"
//                 placeholder="Search by product name…"
//                 value={searchProduct}
//                 onChange={(e) => setSearchProduct(e.target.value)}
//               />

//               {/* Price */}
//               <select
//                 value={filters.price}
//                 onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//               >
//                 <option value="all">All Prices</option>
//                 <option value="low">Below ₹100</option>
//                 <option value="mid">₹100–250</option>
//                 <option value="high">Above ₹250</option>
//               </select>

//               {/* Rating */}
//               <select
//                 value={filters.rating}
//                 onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="low">Below 3</option>
//                 <option value="mid">3–4</option>
//                 <option value="high">Above 4</option>
//               </select>

//               {/* Brand */}
//               <select
//                 value={filters.brand}
//                 onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
//               >
//                 <option value="all">All Brands</option>
//                 <option value="nike">Nike</option>
//                 <option value="adidas">Adidas</option>
//                 <option value="puma">Puma</option>
//               </select>

//               {/* Discount */}
//               <select
//                 value={filters.discount}
//                 onChange={(e) => setFilters({ ...filters, discount: e.target.value })}
//               >
//                 <option value="all">All Discounts</option>
//                 <option value="10">10% or more</option>
//                 <option value="20">20% or more</option>
//                 <option value="30">30% or more</option>
//               </select>

//               {/* Stock */}
//               <select
//                 value={filters.stockStatus}
//                 onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
//               >
//                 <option value="all">All Stock Status</option>
//                 <option value="in">In Stock</option>
//                 <option value="out">Out of Stock</option>
//               </select>

//               {/* Shipping */}
//               <select
//                 value={filters.shipping}
//                 onChange={(e) => setFilters({ ...filters, shipping: e.target.value })}
//               >
//                 <option value="all">All Shipping</option>
//                 <option value="free">Free Shipping</option>
//                 <option value="paid">Paid Shipping</option>
//               </select>
//             </div>
//           </aside>

//           {/* RIGHT PRODUCTS */}
//           <section className="products-content">
//             <h1 style={{ marginBottom: "20px" }}>{category} Collection</h1>

//             <div className="product-grid">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((item, index) => {
//                   const currentRating = Math.round(calculateAverage(item.ratings));
//                   const hoverRating = hoverRatings[item.name] || 0;

//                   return (
//                     <div key={index} className="product-card">
//                       <img src={item.image} alt={item.name} />
//                       <h3>{item.name}</h3>
//                       <p>₹{item.price}</p>
//                       <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

//                       {/* Rating Stars */}
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <span
//                           key={star}
//                           style={{
//                             cursor: "pointer",
//                             color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
//                             fontSize: "22px",
//                           }}
//                           onClick={() => handleRating(category, index, star)}
//                           onMouseEnter={() =>
//                             setHoverRatings({ ...hoverRatings, [item.name]: star })
//                           }
//                           onMouseLeave={() =>
//                             setHoverRatings({ ...hoverRatings, [item.name]: 0 })
//                           }
//                         >
//                           ★
//                         </span>
//                       ))}

//                       <button onClick={() => addToCart(item.full)}>Add to Cart</button>
//                       <button onClick={() => setSelectedProduct(item)}>View Details</button>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No products found matching the filters.</p>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* MODAL */}
//         {selectedProduct && (
//           <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//             <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//               <span className="modal-close" onClick={() => setSelectedProduct(null)}>
//                 ✕
//               </span>

//               <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
//               <h3>{selectedProduct.name}</h3>
//               <p className="modal-price">
//                 ₹{selectedProduct.price}{" "}
//                 {selectedProduct.details.discount > 0 && (
//                   <span className="modal-discount">({selectedProduct.details.discount}% off)</span>
//                 )}
//               </p>
//               <p className="modal-description">{selectedProduct.description}</p>
//               <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>

//               <div className="modal-extra">
//                 <p><strong>Brand:</strong> {selectedProduct.details.brand}</p>
//                 <p><strong>Stock Status:</strong> {selectedProduct.details.stockStatus}</p>
//                 <p>
//                   <strong>Shipping:</strong>{" "}
//                   {selectedProduct.details.shipping.free && "Free Delivery, "}
//                   {selectedProduct.details.shipping.fastDelivery && "Fast Delivery, "}
//                   Estimated {selectedProduct.details.shipping.estimatedDeliveryDays} days
//                 </p>
//               </div>

//               <button className="modal-add-cart" onClick={() => addToCart(selectedProduct.full)}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         )}

//         <ToastContainer position="top-center" autoClose={3000} theme="colored" />
//       </div>
//     </>
//   );
// }

// export default CategoryPage;


// src/pages/CategoryPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { initialProductsInCode } from "./JewelryData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CategoryPage.css";

// ✅ Default filters for Clear Filters
const defaultFilters = {
  price: "all",
  rating: "all",
  brand: "all",
  discount: "all",
  stockStatus: "all",
  shipping: "all",
};

function CategoryPage({ cart, setCart, isGuest, setIsGuest }) {
  const { category } = useParams();
  const navigate = useNavigate();

  // ------------------- STATE -------------------
  const [products, setProducts] = useState(
    initialProductsInCode.map((p) => ({
      ...p,
      data: [...p.data, []], // ratings at index 4
    }))
  );

  const [hoverRatings, setHoverRatings] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ------------------- CART -------------------
  const addToCart = (product) => {
    const itemToAdd = {
      name: product.data[0],
      price: product.data[1],
      image: product.data[2],
    };
    setCart((prev) => [...prev, itemToAdd]);
    toast.success(`${itemToAdd.name} added to cart!`);
  };

  // ------------------- RATINGS -------------------
  const handleRating = (categoryName, productIndex, star) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.category === categoryName) {
          const categoryProducts = prev.filter((p) => p.category === categoryName);
          const indexInCategory = categoryProducts.indexOf(prod);
          if (indexInCategory === productIndex) {
            const newData = [...prod.data];
            newData[4] = [star];
            return { ...prod, data: newData };
          }
        }
        return prod;
      })
    );
  };

  const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // ------------------- FILTERS -------------------
  const categoryProducts = products
    .filter((p) => p.category === category)
    .map((p) => {
      const [name, price, image, description, ratings, details] = p.data;
      return { name, price, image, description, ratings, details, full: p };
    });

  const filteredProducts = categoryProducts.filter((item) => {
    let passPrice = true;
    let passRating = true;
    let passName = true;
    let passBrand = true;
    let passDiscount = true;
    let passStock = true;
    let passShipping = true;

    // Price filter
    if (filters.price !== "all") {
      if (filters.price === "low") passPrice = item.price < 100;
      if (filters.price === "mid") passPrice = item.price >= 100 && item.price <= 250;
      if (filters.price === "high") passPrice = item.price > 250;
    }

    // Rating filter
    if (filters.rating !== "all") {
      const avg = parseFloat(calculateAverage(item.ratings));
      if (filters.rating === "low") passRating = avg < 3;
      if (filters.rating === "mid") passRating = avg >= 3 && avg <= 4;
      if (filters.rating === "high") passRating = avg > 4;
    }

    // Search filter
    if (searchProduct) {
      passName = item.name.toLowerCase().includes(searchProduct.toLowerCase());
    }

    // Brand filter
    if (filters.brand !== "all") {
      passBrand = item.details?.brand?.toLowerCase() === filters.brand;
    }

    // Discount filter
    if (filters.discount !== "all") {
      passDiscount = item.details?.discount >= parseInt(filters.discount);
    }

    // Stock filter
    if (filters.stockStatus !== "all") {
      if (filters.stockStatus === "in") passStock = item.details?.stockStatus.toLowerCase() === "in stock";
      if (filters.stockStatus === "out") passStock = item.details?.stockStatus.toLowerCase() === "out of stock";
    }

    // Shipping filter
    if (filters.shipping !== "all") {
      if (filters.shipping === "free") passShipping = item.details?.shipping?.free;
      if (filters.shipping === "paid") passShipping = !item.details?.shipping?.free;
    }

    return passPrice && passRating && passName && passBrand && passDiscount && passStock && passShipping;
  });

  return (
    <>
      <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />

      <div className="shop-container">
        <div className="shop-main-content" style={{ marginTop: "50px" }}>
          {/* LEFT FILTERS */}
          <aside className="filters-sidebar">
            <button onClick={() => navigate(-1)} className="back-btn">
              ← Back to Shop
            </button>

            <div className="filters-top" style={{ marginTop: "20px" }}>
              {/* Search */}
              <input
                type="text"
                placeholder="Search by product name…"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
              />

              {/* Price */}
              <select
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              >
                <option value="all">All Prices</option>
                <option value="low">Below ₹100</option>
                <option value="mid">₹100–250</option>
                <option value="high">Above ₹250</option>
              </select>

              {/* Rating */}
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              >
                <option value="all">All Ratings</option>
                <option value="low">Below 3</option>
                <option value="mid">3–4</option>
                <option value="high">Above 4</option>
              </select>

              {/* Brand */}
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              >
                <option value="all">All Brands</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
              </select>

              {/* Discount */}
              <select
                value={filters.discount}
                onChange={(e) => setFilters({ ...filters, discount: e.target.value })}
              >
                <option value="all">All Discounts</option>
                <option value="10">10% or more</option>
                <option value="20">20% or more</option>
                <option value="30">30% or more</option>
              </select>

              {/* Stock */}
              <select
                value={filters.stockStatus}
                onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
              >
                <option value="all">All Stock Status</option>
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
              </select>

              {/* Shipping */}
              <select
                value={filters.shipping}
                onChange={(e) => setFilters({ ...filters, shipping: e.target.value })}
              >
                <option value="all">All Shipping</option>
                <option value="free">Free Shipping</option>
                <option value="paid">Paid Shipping</option>
              </select>

              {/* ✅ Clear Filters Button */}
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setFilters(defaultFilters);
                  setSearchProduct("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* RIGHT PRODUCTS */}
          <section className="products-content">
            <h1 style={{ marginBottom: "20px" }}>{category} Collection</h1>

            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => {
                  const currentRating = Math.round(calculateAverage(item.ratings));
                  const hoverRating = hoverRatings[item.name] || 0;

                  return (
                    <div key={index} className="product-card">
                      <img src={item.image} alt={item.name} />
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                      <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

                      {/* Rating Stars */}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            cursor: "pointer",
                            color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
                            fontSize: "22px",
                          }}
                          onClick={() => handleRating(category, index, star)}
                          onMouseEnter={() =>
                            setHoverRatings({ ...hoverRatings, [item.name]: star })
                          }
                          onMouseLeave={() =>
                            setHoverRatings({ ...hoverRatings, [item.name]: 0 })
                          }
                        >
                          ★
                        </span>
                      ))}

                      <button onClick={() => addToCart(item.full)}>Add to Cart</button>
                      <button onClick={() => setSelectedProduct(item)}>View Details</button>
                    </div>
                  );
                })
              ) : (
                <p>No products found matching the filters.</p>
              )}
            </div>
          </section>
        </div>

        {/* MODAL */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <span className="modal-close" onClick={() => setSelectedProduct(null)}>
                ✕
              </span>

              <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
              <h3>{selectedProduct.name}</h3>
              <p className="modal-price">
                ₹{selectedProduct.price}{" "}
                {selectedProduct.details.discount > 0 && (
                  <span className="modal-discount">({selectedProduct.details.discount}% off)</span>
                )}
              </p>
              <p className="modal-description">{selectedProduct.description}</p>
              <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>

              <div className="modal-extra">
                <p><strong>Brand:</strong> {selectedProduct.details.brand}</p>
                <p><strong>Stock Status:</strong> {selectedProduct.details.stockStatus}</p>
                <p>
                  <strong>Shipping:</strong>{" "}
                  {selectedProduct.details.shipping.free && "Free Delivery, "}
                  {selectedProduct.details.shipping.fastDelivery && "Fast Delivery, "}
                  Estimated {selectedProduct.details.shipping.estimatedDeliveryDays} days
                </p>
              </div>

              <button className="modal-add-cart" onClick={() => addToCart(selectedProduct.full)}>
                Add to Cart
              </button>
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </div>
    </>
  );
}

export default CategoryPage;
