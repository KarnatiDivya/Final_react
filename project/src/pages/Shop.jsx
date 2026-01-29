
// // src/pages/Shop.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { initialProductsInCode } from "./JewelryData";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Shop.css";

// function Shop({ cart, setCart, isGuest, setIsGuest }) {
//   const navigate = useNavigate();

//   // ---------------- STATE ----------------
//   const [products, setProducts] = useState(
//     initialProductsInCode.map((p) => ({ ...p, data: [...p.data, []] }))
//   );
//   const [hoverRatings, setHoverRatings] = useState({});
//   const [searchCategory, setSearchCategory] = useState("");
//   const [filters, setFilters] = useState({
//     price: "all",
//     rating: "all",
//     brand: "all",
//     discount: "all",
//     stockStatus: "all",
//     shipping: "all",
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [viewMore, setViewMore] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);

//   // ---------------- HELPERS ----------------
//   const calculateAverage = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   const handleRating = (category, productIndex, star) => {
//     setProducts((prev) =>
//       prev.map((prod) => {
//         if (prod.category === category) {
//           const categoryProducts = prev.filter((p) => p.category === category);
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

//   const addToCart = (item) => {
//     if (!item || !item.name || !item.price || !item.image) return;
//     const itemToAdd = {
//       name: item.name,
//       price: item.price,
//       image: item.image,
//     };
//     setCart((prev) => [...prev, itemToAdd]);
//     toast.success(`${itemToAdd.name} added to cart!`);
//   };

//   // ---------------- PRODUCTS BY CATEGORY ----------------
//   const productsByCategory = products.reduce((acc, product) => {
//     const [name, price, image, description, ratings, details] = product.data;
//     if (!acc[product.category]) acc[product.category] = [];
//     acc[product.category].push({ name, price, image, description, ratings, details, full: product });
//     return acc;
//   }, {});

//   const filteredCategories = Object.keys(productsByCategory).filter((cat) =>
//     cat.toLowerCase().includes(searchCategory.toLowerCase())
//   );

//   // ---------------- APPLY FILTERS ----------------
//   const applyFilters = (items) =>
//     items.filter((item) => {
//       let passPrice = true,
//         passRating = true,
//         passBrand = true,
//         passDiscount = true,
//         passStock = true,
//         passShipping = true;

//       // Price filter
//       if (filters.price !== "all") {
//         if (filters.price === "low") passPrice = item.price < 100;
//         if (filters.price === "mid") passPrice = item.price >= 100 && item.price <= 250;
//         if (filters.price === "high") passPrice = item.price > 250;
//       }

//       // Rating filter
//       if (filters.rating !== "all") {
//         const avg = parseFloat(calculateAverage(item.ratings));
//         if (filters.rating === "low") passRating = avg < 3;
//         if (filters.rating === "mid") passRating = avg >= 3 && avg <= 4;
//         if (filters.rating === "high") passRating = avg > 4;
//       }

//       // Brand filter
//       if (filters.brand !== "all") passBrand = item.details?.brand === filters.brand;

//       // Discount filter
//       if (filters.discount !== "all")
//         passDiscount = item.details?.discount >= Number(filters.discount);

//       // Stock filter
//       if (filters.stockStatus !== "all") {
//         if (filters.stockStatus === "in") passStock = item.details?.stockStatus === "in";
//         if (filters.stockStatus === "out") passStock = item.details?.stockStatus === "out";
//         if (filters.stockStatus === "limited") passStock = item.details?.stockStatus === "limited";
//       }

//       // Shipping filter
//       if (filters.shipping !== "all") {
//         if (filters.shipping === "free") passShipping = item.details?.shipping.free;
//         if (filters.shipping === "paid") passShipping = !item.details?.shipping.free;
//       }

//       return passPrice && passRating && passBrand && passDiscount && passStock && passShipping;
//     });

//   const categoriesPerPage = (page) =>
//     page === 1
//       ? filteredCategories.slice(0, 2)
//       : filteredCategories.slice(2 + (page - 2), 2 + (page - 1));

//   const displayedCategories = searchCategory ? filteredCategories : categoriesPerPage(currentPage);

//   return (
//     <>
//       <Navbar cartCount={cart.length} isGuest={isGuest} setIsGuest={setIsGuest} />

//       <div style={{ marginTop: "70px" }}></div>

//       <div className="shop-container">
//         <div className="shop-main-content">
//           {/* ---------------- FILTERS ---------------- */}
//           <aside className="filters-sidebar">
//             <div className="filters-top">
//               <input
//                 type="text"
//                 placeholder="Search category..."
//                 value={searchCategory}
//                 onChange={(e) => {
//                   setSearchCategory(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//               <select
//                 onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//                 value={filters.price}
//               >
//                 <option value="all">All Prices</option>
//                 <option value="low">Below ₹100</option>
//                 <option value="mid">₹100–250</option>
//                 <option value="high">Above ₹250</option>
//               </select>
//               <select
//                 onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//                 value={filters.rating}
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="low">Below 3</option>
//                 <option value="mid">3–4</option>
//                 <option value="high">Above 4</option>
//               </select>
//               <select
//                 value={filters.brand}
//                 onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
//               >
//                 <option value="all">All Brands</option>
//                 <option value="AntiqueCharm">AntiqueCharm</option>
//                 <option value="Nike">Nike</option>
//                 <option value="Adidas">Adidas</option>
//               </select>
//               <select
//                 value={filters.discount}
//                 onChange={(e) => setFilters({ ...filters, discount: e.target.value })}
//               >
//                 <option value="all">All Discounts</option>
//                 <option value="10">10% or more</option>
//                 <option value="20">20% or more</option>
//                 <option value="30">30% or more</option>
//               </select>
//               <select
//                 value={filters.stockStatus}
//                 onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
//               >
//                 <option value="all">Stock status</option>
//                 <option value="in">In Stock</option>
//                 <option value="out">Out of Stock</option>
//                 <option value="limited">Limited</option>
//               </select>
//               <select
//                 value={filters.shipping}
//                 onChange={(e) => setFilters({ ...filters, shipping: e.target.value })}
//               >
//                 <option value="all">All Shipping</option>
//                 <option value="free">Free Shipping</option>
//                 <option value="paid">Paid Shipping</option>
//               </select>
//               <button
//   className="clear-filters-btn"
//   onClick={() => {
//     setFilters(defaultFilters);
//     setSearchCategory("");
//     setCurrentPage(1);
//   }}
// >
//   Clear Filters
// </button>

//             </div>
//           </aside>

//           {/* ---------------- PRODUCTS ---------------- */}
//           <section className="products-content">
//             {displayedCategories.map((category) => {
//               const items = applyFilters(productsByCategory[category]);
//               const visibleCount = viewMore[category] ? items.length : 3;

//               return (
//                 <div key={category} className="category-section">
//                   <div className="category-header">
//                     <h2>{category}</h2>
//                     <button
//                       className="view-more"
//                       onClick={() => navigate(`/myapp/category/${category}`)}
//                     >
//                       View More
//                     </button>
//                   </div>

//                   <div className="product-grid">
//                     {items.slice(0, visibleCount).map((item, index) => {
//                       const currentRating = Math.round(calculateAverage(item.ratings));
//                       const hoverRating = hoverRatings[item.name] || 0;

//                       return (
//                         <div key={index} className="product-card">
//                           <img src={item.image} alt={item.name} />
//                           <h3>{item.name}</h3>
//                           <p>₹{item.price}</p>
//                           <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <span
//                               key={star}
//                               style={{
//                                 cursor: "pointer",
//                                 color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
//                                 fontSize: "20px",
//                               }}
//                               onClick={() => handleRating(category, index, star)}
//                               onMouseEnter={() =>
//                                 setHoverRatings({ ...hoverRatings, [item.name]: star })
//                               }
//                               onMouseLeave={() =>
//                                 setHoverRatings({ ...hoverRatings, [item.name]: 0 })
//                               }
//                             >
//                               ★
//                             </span>
//                           ))}

//                           <button
//                             style={{
//                               background: "linear-gradient(135deg, #e6c86f, #caa657)",
//                             }}
//                             onClick={() => addToCart(item)}
//                           >
//                             Add to Cart
//                           </button>

//                           <button
//                             style={{ marginTop: "5px" }}
//                             onClick={() => setSelectedProduct(item)}
//                           >
//                             View Details
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </section>
//         </div>

//         {/* ---------------- PRODUCT MODAL ---------------- */}
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
//                 {selectedProduct.details?.discount > 0 && (
//                   <span className="modal-discount">({selectedProduct.details.discount}% off)</span>
//                 )}
//               </p>
//               <p className="modal-description">{selectedProduct.description}</p>
//               <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>

//               {selectedProduct.details && (
//                 <div className="modal-extra">
//                   <p><strong>Brand:</strong> {selectedProduct.details.brand}</p>
//                   <p><strong>Stock Status:</strong> {selectedProduct.details.stockStatus}</p>
//                   <p>
//                     <strong>Shipping:</strong>{" "}
//                     {selectedProduct.details.shipping.free && "Free Delivery, "}
//                     {selectedProduct.details.shipping.fastDelivery && "Fast Delivery, "}
//                     Estimated {selectedProduct.details.shipping.estimatedDeliveryDays} days
//                   </p>
//                 </div>
//               )}

//               <button className="modal-add-cart" onClick={() => addToCart(selectedProduct)}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         )}

//         <ToastContainer position="top-center" autoClose={3000} theme="colored" />
//         <div className="pagination">
//   {Array.from({ length: Math.ceil(filteredCategories.length / 2) }).map((_, idx) => (
//     <button
//       key={idx}
//       onClick={() => setCurrentPage(idx + 1)}
//       className={currentPage === idx + 1 ? "active-page" : ""}
//     >
//       {idx + 1}
//     </button>
//   ))}
// </div>
//       </div>
      

//     </>
//   );
// }

// export default Shop;



// src/pages/Shop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { initialProductsInCode } from "./JewelryData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Shop.css";

// ✅ Default filters for Clear Filters button
const defaultFilters = {
  price: "all",
  rating: "all",
  brand: "all",
  discount: "all",
  stockStatus: "all",
  shipping: "all",
};

function Shop({ cart, setCart, isGuest, setIsGuest }) {
  const navigate = useNavigate();

  // ---------------- STATE ----------------
  const [products, setProducts] = useState(
    initialProductsInCode.map((p) => ({ ...p, data: [...p.data, []] }))
  );
  const [hoverRatings, setHoverRatings] = useState({});
  const [searchCategory, setSearchCategory] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMore, setViewMore] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------- HELPERS ----------------
  const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const handleRating = (category, productIndex, star) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.category === category) {
          const categoryProducts = prev.filter((p) => p.category === category);
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

  const addToCart = (item) => {
    if (!item || !item.name || !item.price || !item.image) return;
    const itemToAdd = {
      name: item.name,
      price: item.price,
      image: item.image,
    };
    setCart((prev) => [...prev, itemToAdd]);
    toast.success(`${itemToAdd.name} added to cart!`);
  };

  // ---------------- PRODUCTS BY CATEGORY ----------------
  const productsByCategory = products.reduce((acc, product) => {
    const [name, price, image, description, ratings, details] = product.data;
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push({ name, price, image, description, ratings, details, full: product });
    return acc;
  }, {});

  const filteredCategories = Object.keys(productsByCategory).filter((cat) =>
    cat.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // ---------------- APPLY FILTERS ----------------
  const applyFilters = (items) =>
    items.filter((item) => {
      let passPrice = true,
        passRating = true,
        passBrand = true,
        passDiscount = true,
        passStock = true,
        passShipping = true;

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

      // Brand filter
      if (filters.brand !== "all") passBrand = item.details?.brand === filters.brand;

      // Discount filter
      if (filters.discount !== "all")
        passDiscount = item.details?.discount >= Number(filters.discount);

      // Stock filter
      if (filters.stockStatus !== "all") {
        if (filters.stockStatus === "in") passStock = item.details?.stockStatus === "in";
        if (filters.stockStatus === "out") passStock = item.details?.stockStatus === "out";
        if (filters.stockStatus === "limited") passStock = item.details?.stockStatus === "limited";
      }

      // Shipping filter
      if (filters.shipping !== "all") {
        if (filters.shipping === "free") passShipping = item.details?.shipping.free;
        if (filters.shipping === "paid") passShipping = !item.details?.shipping.free;
      }

      return passPrice && passRating && passBrand && passDiscount && passStock && passShipping;
    });

  const categoriesPerPage = (page) =>
    page === 1
      ? filteredCategories.slice(0, 2)
      : filteredCategories.slice(2 + (page - 2), 2 + (page - 1));

  const displayedCategories = searchCategory ? filteredCategories : categoriesPerPage(currentPage);

  return (
    <>
      <Navbar cartCount={cart.length} isGuest={isGuest} setIsGuest={setIsGuest} />

      <div style={{ marginTop: "70px" }}></div>

      <div className="shop-container">
        <div className="shop-main-content">
          {/* ---------------- FILTERS ---------------- */}
          <aside className="filters-sidebar">
            <div className="filters-top">
              <input
                type="text"
                placeholder="Search category..."
                value={searchCategory}
                onChange={(e) => {
                  setSearchCategory(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <select
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                value={filters.price}
              >
                <option value="all">All Prices</option>
                <option value="low">Below ₹100</option>
                <option value="mid">₹100–250</option>
                <option value="high">Above ₹250</option>
              </select>
              <select
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                value={filters.rating}
              >
                <option value="all">All Ratings</option>
                <option value="low">Below 3</option>
                <option value="mid">3–4</option>
                <option value="high">Above 4</option>
              </select>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              >
                <option value="all">All Brands</option>
                <option value="AntiqueCharm">AntiqueCharm</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
              </select>
              <select
                value={filters.discount}
                onChange={(e) => setFilters({ ...filters, discount: e.target.value })}
              >
                <option value="all">All Discounts</option>
                <option value="10">10% or more</option>
                <option value="20">20% or more</option>
                <option value="30">30% or more</option>
              </select>
              <select
                value={filters.stockStatus}
                onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
              >
                <option value="all">Stock status</option>
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
                <option value="limited">Limited</option>
              </select>
              <select
                value={filters.shipping}
                onChange={(e) => setFilters({ ...filters, shipping: e.target.value })}
              >
                <option value="all">All Shipping</option>
                <option value="free">Free Shipping</option>
                <option value="paid">Paid Shipping</option>
              </select>

              {/* ✅ Clear Filters button */}
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setFilters(defaultFilters);
                  setSearchCategory("");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* ---------------- PRODUCTS ---------------- */}
          <section className="products-content">
            {displayedCategories.map((category) => {
              const items = applyFilters(productsByCategory[category]);
              const visibleCount = viewMore[category] ? items.length : 3;

              return (
                <div key={category} className="category-section">
                  <div className="category-header">
                    <h2>{category}</h2>
                    <button
                      className="view-more"
                      onClick={() => navigate(`/myapp/category/${category}`)}
                    >
                      View More
                    </button>
                  </div>

                  <div className="product-grid">
                    {items.slice(0, visibleCount).map((item, index) => {
                      const currentRating = Math.round(calculateAverage(item.ratings));
                      const hoverRating = hoverRatings[item.name] || 0;

                      return (
                        <div key={index} className="product-card">
                          <img src={item.image} alt={item.name} />
                          <h3>{item.name}</h3>
                          <p>₹{item.price}</p>
                          <p>Avg Rating: {calculateAverage(item.ratings)} ⭐</p>

                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                cursor: "pointer",
                                color: star <= (hoverRating || currentRating) ? "gold" : "#ccc",
                                fontSize: "20px",
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

                          <button
                            style={{
                              background: "linear-gradient(135deg, #e6c86f, #caa657)",
                            }}
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </button>

                          <button
                            style={{ marginTop: "5px" }}
                            onClick={() => setSelectedProduct(item)}
                          >
                            View Details
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        {/* ---------------- PRODUCT MODAL ---------------- */}
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
                {selectedProduct.details?.discount > 0 && (
                  <span className="modal-discount">({selectedProduct.details.discount}% off)</span>
                )}
              </p>
              <p className="modal-description">{selectedProduct.description}</p>
              <p>Avg Rating: {calculateAverage(selectedProduct.ratings)} ⭐</p>

              {selectedProduct.details && (
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
              )}

              <button className="modal-add-cart" onClick={() => addToCart(selectedProduct)}>
                Add to Cart
              </button>
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredCategories.length / 2) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? "active-page" : ""}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
