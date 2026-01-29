

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { initialProductsInCode } from "./JewelryData";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState(initialProductsInCode);
//   const [currentView, setCurrentView] = useState("products");
//   const [newProduct, setNewProduct] = useState(["", 0, "", "", [], true]); // added status true
//   const [editingIndex, setEditingIndex] = useState(null);

//   /* ================= PAGINATION (4 ROWS) ================= */
//   const [currentPage, setCurrentPage] = useState(1);

//   const columns = 4;
//   const rowsPerPage = 4;
//   const productsPerPage = columns * rowsPerPage;

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   // Add or Edit product
//   const handleAddOrEditProduct = () => {
//     if (editingIndex !== null) {
//       const updatedProducts = [...products];
//       updatedProducts[editingIndex] = {
//         ...updatedProducts[editingIndex],
//         data: [...newProduct.slice(0, 5)], // first 5 items: name, price, image, desc, arr
//         status: newProduct[5], // status is 6th element
//       };
//       setProducts(updatedProducts);
//       setEditingIndex(null);
//     } else {
//       setProducts([
//         ...products,
//         {
//           category: "misc",
//           data: [...newProduct.slice(0, 5)],
//           status: newProduct[5],
//         },
//       ]);
//     }

//     setNewProduct(["", 0, "", "", [], true]);
//     setCurrentView("products");
//     setCurrentPage(1);
//   };

//   // Edit
//   const handleEditClick = (index) => {
//     const product = products[index];
//     setEditingIndex(index);
//     setNewProduct([...product.data, product.status ?? true]);
//     setCurrentView("add");
//   };

//   // Delete
//   const handleDelete = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//     if ((currentPage - 1) * productsPerPage >= updatedProducts.length && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Toggle status directly from product card
//   const toggleStatus = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].status = !updatedProducts[index].status;
//     setProducts(updatedProducts);
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("isAdminLoggedIn");
//     navigate("/myapp/login");
//   };

//   return (
//     <div
//       style={{
//         background: "linear-gradient(135deg, #FFA62B, #FF6F3C)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Navbar */}
//       <nav className="admin-navbar">
//         <h2>NovelJewellery</h2>
//         <div>
//           <button
//             className="navbar-btn"
//             onClick={() => {
//               setCurrentView("add");
//               setEditingIndex(null);
//               setNewProduct(["", 0, "", "", [], true]);
//             }}
//           >
//             Add Product
//           </button>
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Add / Edit Form */}
//       {currentView === "add" && (
//         <div className="add-edit-form">
//           <h3>{editingIndex !== null ? "Edit Product" : "Add Product"}</h3>

//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newProduct[0]}
//             onChange={(e) =>
//               setNewProduct([
//                 e.target.value,
//                 newProduct[1],
//                 newProduct[2],
//                 newProduct[3],
//                 newProduct[4],
//                 newProduct[5],
//               ])
//             }
//           />

//           <input
//             type="number"
//             placeholder="Price (₹)"
//             value={newProduct[1]}
//             onChange={(e) =>
//               setNewProduct([
//                 newProduct[0],
//                 e.target.value,
//                 newProduct[2],
//                 newProduct[3],
//                 newProduct[4],
//                 newProduct[5],
//               ])
//             }
//           />

//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newProduct[2]}
//             onChange={(e) =>
//               setNewProduct([
//                 newProduct[0],
//                 newProduct[1],
//                 e.target.value,
//                 newProduct[3],
//                 newProduct[4],
//                 newProduct[5],
//               ])
//             }
//           />

//           <input
//             type="text"
//             placeholder="Description"
//             value={newProduct[3]}
//             onChange={(e) =>
//               setNewProduct([
//                 newProduct[0],
//                 newProduct[1],
//                 newProduct[2],
//                 e.target.value,
//                 newProduct[4],
//                 newProduct[5],
//               ])
//             }
//           />

//           {/* Status toggle */}
//           <label style={{ marginTop: "10px", display: "block" }}>
//             <input
//               type="checkbox"
//               checked={newProduct[5]}
//               onChange={() =>
//                 setNewProduct([
//                   newProduct[0],
//                   newProduct[1],
//                   newProduct[2],
//                   newProduct[3],
//                   newProduct[4],
//                   !newProduct[5],
//                 ])
//               }
//             />{" "}
//             Active
//           </label>

//           <button
//             style={{
//               backgroundColor: editingIndex !== null ? "orange" : "green",
//               marginTop: "15px",
//             }}
//             onClick={() => {
//               // Validation
//               const name = newProduct[0].trim();
//               const price = parseFloat(newProduct[1]);
//               const imageUrl = newProduct[2].trim();

//               if (!name) {
//                 alert("Product name is required!");
//                 return;
//               }

//               if (isNaN(price) || price <= 0) {
//                 alert("Price must be a number greater than 0!");
//                 return;
//               }

//               try {
//                 new URL(imageUrl);
//               } catch (_) {
//                 alert("Please enter a valid image URL!");
//                 return;
//               }

//               handleAddOrEditProduct();
//             }}
//           >
//             {editingIndex !== null ? "Update Product" : "Add Product"}
//           </button>
//         </div>
//       )}

//       {/* Products Grid */}
//       {currentView === "products" && (
//         <>
//           <div className="products-grid">
//             {currentProducts.map((productItem, index) => {
//               const product = productItem.data;
//               const status = productItem.status ?? true;
//               const realIndex = indexOfFirstProduct + index;

//               return (
//                 <div
//                   key={realIndex}
//                   className="product-card"
//                   style={{
//                     opacity: status ? 1 : 0.5,
//                     position: "relative",
//                   }}
//                 >
//                   <img
//                     src={product[2]}
//                     alt={product[0]}
//                     className="product-image"
//                     style={{ filter: status ? "none" : "grayscale(80%)" }}
//                   />
//                   <h4>{product[0]}</h4>
//                   <p>Price: ₹{product[1]}</p>
//                   <p>{product[3]}</p>

//                   <div className="product-buttons">
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEditClick(realIndex)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(realIndex)}
//                     >
//                       Delete
//                     </button>

//                     {/* Status toggle button */}
//                     <button
//                       className="status-toggle-btn"
//                       onClick={() => toggleStatus(realIndex)}
//                       title={status ? "Set as Inactive" : "Set as Active"}
//                       style={{ marginLeft: "5px" }}
//                     >
//                       {status ? "Active" : "Inactive"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           <div className="pagination">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 className={currentPage === i + 1 ? "active-page" : ""}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialProductsInCode } from "./JewelryData";
import "./AdminDashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(initialProductsInCode);
  const [currentView, setCurrentView] = useState("products");
  const [newProduct, setNewProduct] = useState(["", 0, "", "", [], { stockStatus: "inStock" }]);
  const [editingIndex, setEditingIndex] = useState(null);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const columns = 4;
  const rowsPerPage = 4;
  const productsPerPage = columns * rowsPerPage;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const [searchCategory, setSearchCategory] = useState("");
  const [searchPrice, setSearchPrice] = useState("all");

  /* ================= FILTERED PRODUCTS ================= */
  const filteredProducts = products.filter((prod) => {
    const category = prod.category.toLowerCase();
    const price = prod.data[1];
    const matchesCategory = category.includes(searchCategory.toLowerCase());
    let matchesPrice = true;

    if (searchPrice === "low") matchesPrice = price < 200;
    if (searchPrice === "mid") matchesPrice = price >= 200 && price <= 400;
    if (searchPrice === "high") matchesPrice = price > 400;

    return matchesCategory && matchesPrice;
  });

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  /* ================= ADD / EDIT ================= */
  const handleAddOrEditProduct = () => {
    const [name, price, imageUrl, description, , meta] = newProduct;
  
    // ===== Validation =====
    if (!name || name.trim().length < 3) {
      toast.error("Product name must be at least 3 characters long.");
      return;
    }
  
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }
  
    try {
      new URL(imageUrl);
    } catch {
      toast.error("Please enter a valid image URL.");
      return;
    }
  
    if (description && description.length > 300) {
      toast.error("Description cannot exceed 300 characters.");
      return;
    }
  
    if (!meta.stockStatus) {
      toast.error("Please select a stock status.");
      return;
    }
  
    // ===== Add or Edit Product =====
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex].data = [...newProduct];
      setProducts(updated);
      setEditingIndex(null);
      toast.success("Product updated successfully!");
    } else {
      setProducts([...products, { category: "misc", data: [...newProduct] }]);
      toast.success("Product added successfully!");
    }
  
    setNewProduct(["", 0, "", "", [], { stockStatus: "inStock" }]);
    setCurrentView("products");
    setCurrentPage(1);
  };
  
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewProduct([...products[index].data]);
    setCurrentView("add");
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    if ((currentPage - 1) * productsPerPage >= updated.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/myapp/login");
  };

  /* ================= STOCK STATUS COLOR ================= */
  const getStockColor = (status) => {
    switch (status) {
      case "noStock":
        return "red";
      case "inStock":
        return "green";
      case "limited":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #FFA62B, #FF6F3C)", minHeight: "100vh" }}>
  <ToastContainer position="top-right" autoClose={3000} />
      {/* Navbar */}
      <nav className="admin-navbar">
        <h2>NovaJewels Admin</h2>
        <div>
          <button
            className="navbar-btn"
            onClick={() => {
              setCurrentView("add");
              setEditingIndex(null);
              setNewProduct(["", 0, "", "", [], { stockStatus: "inStock" }]);
            }}
          >
            Add Product
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Filters */}
      {currentView === "products" && (
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search Category..."
            value={searchCategory}
            onChange={(e) => {
              setSearchCategory(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={searchPrice}
            onChange={(e) => {
              setSearchPrice(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Prices</option>
            <option value="low">Below ₹200</option>
            <option value="mid">₹200–400</option>
            <option value="high">Above ₹400</option>
          </select>
        </div>
      )}

      {/* Add/Edit Form */}
      {currentView === "add" && (
        <div className="add-edit-form">
          <h3>{editingIndex !== null ? "Edit Product" : "Add Product"}</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct[0]}
            onChange={(e) => setNewProduct([e.target.value, ...newProduct.slice(1)])}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newProduct[1]}
            onChange={(e) => setNewProduct([newProduct[0], parseFloat(e.target.value), ...newProduct.slice(2)])}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct[2]}
            onChange={(e) => setNewProduct([...newProduct.slice(0, 2), e.target.value, ...newProduct.slice(3)])}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct[3]}
            onChange={(e) => setNewProduct([...newProduct.slice(0, 3), e.target.value, ...newProduct.slice(4)])}
          />
          <select
            value={newProduct[5].stockStatus}
            onChange={(e) => setNewProduct([...newProduct.slice(0, 5), { ...newProduct[5], stockStatus: e.target.value }])}
          >
            <option value="inStock">In Stock</option>
            <option value="limited">Limited</option>
            <option value="noStock">No Stock</option>
          </select>

          <button
            style={{ backgroundColor: editingIndex !== null ? "orange" : "green" }}
            onClick={handleAddOrEditProduct}
          >
            {editingIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </div>
      )}

      {/* Products Grid */}
      {currentView === "products" && (
        <>
          <div className="products-grid">
            {currentProducts.map((prod, i) => {
              const realIndex = indexOfFirstProduct + i;
              const stockStatus = prod.data[5]?.stockStatus ?? "inStock";
              return (
                <div className="product-card">
                <span className={`stock-status ${stockStatus}`}>
                  {stockStatus === "noStock"
                    ? "No Stock"
                    : stockStatus === "limited"
                    ? "Limited"
                    : "In Stock"}
                </span>
                <img src={prod.data[2]} alt={prod.data[0]} className="product-image" />
                <h4>{prod.data[0]}</h4>
                <p>Price: ₹{prod.data[1]}</p>
                <p>{prod.data[3]}</p>
              
                <div className="product-buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(realIndex)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(realIndex)}>Delete</button>
                </div>
              </div>
              
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
