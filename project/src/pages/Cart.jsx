
// import React, { useState, useEffect } from "react";
// import Navbar from "../Components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ShopCart.css";

// function Cart({ cart = [], setCart, isGuest, setIsGuest }) {
//   const navigate = useNavigate();
//   const [receipt, setReceipt] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(0);

//   // Countdown timer effect
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleSelect = (index) => {
//     setSelectedItems((prev) =>
//       prev.includes(index)
//         ? prev.filter((i) => i !== index)
//         : [...prev, index]
//     );
//   };

//   const increaseQuantity = (index) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
//     setCart(updatedCart);
//     toast.success("Quantity increased");
//   };

//   const decreaseQuantity = (index) => {
//     const updatedCart = [...cart];
//     if ((updatedCart[index].quantity || 1) > 1) {
//       updatedCart[index].quantity -= 1;
//       setCart(updatedCart);
//       toast.info("Quantity decreased");
//     }
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//     toast.error("Item removed");
//   };

//   const handleBuy = () => {
//     if (selectedItems.length === 0) {
//       toast.warning("Select items first");
//       return;
//     }
//     const items = selectedItems.map((i) => cart[i]);
//     setReceipt({ items });
//     setTimeLeft(120); // Start 2-minute timer
//     toast.success("Order created. Complete payment within 2 minutes!");
//   };

//   const handlePayment = () => {
//     if (!receipt) return;

//     const total = receipt.items.reduce(
//       (sum, item) => sum + item.price * (item.quantity || 1),
//       0
//     );

//     const options = {
//       key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay key
//       amount: total * 100, // in paise
//       currency: "INR",
//       name: "NovaJewels",
//       description: "Order Payment",
//       handler: function () {
//         toast.success("Payment successful");
//         setCart([]);
//         setReceipt(null);
//         setTimeLeft(0);
//         navigate("/");
//       },
//       theme: { color: "#000" },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   // Format countdown timer
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" />
//       <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />

//       <div className="cart-container">
//         <h2>Shopping Cart ({cart.length})</h2>

//         {cart.length === 0 ? (
//           <div className="empty-cart-card">
//             <div className="cart-icon">🛒</div>
//             <h3>Your cart is empty</h3>
//             <p>Looks like you haven’t added anything yet.</p>
//             <button className="shop-btn" onClick={() => navigate("/myapp/shop")}>
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="cart-items-container">
//               {cart.map((item, index) => (
//                 <div className="cart-item-card" key={index}>
//                   <div className="cart-item-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(index)}
//                       onChange={() => handleSelect(index)}
//                     />
//                     {item.image && (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="cart-item-image"
//                       />
//                     )}
//                     <div className="cart-item-details">
//                       <h4>{item.name}</h4>
//                       <p>₹{item.price}</p>
//                       <div className="quantity-controls">
//                         <button onClick={() => decreaseQuantity(index)}>-</button>
//                         <span>{item.quantity || 1}</span>
//                         <button onClick={() => increaseQuantity(index)}>+</button>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="cart-item-remove"
//                     onClick={() => removeFromCart(index)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <button className="buy-btn" onClick={handleBuy}>
//               Receipt
//             </button>

//             {receipt && (
//               <div className="receipt-card">
//                 <h3>Receipt</h3>
//                 <ul>
//                   {receipt.items.map((item, idx) => (
//                     <li key={idx}>
//                       {item.name} x {item.quantity || 1} - ₹
//                       {(item.price * (item.quantity || 1)).toFixed(2)}
//                     </li>
//                   ))}
//                 </ul>
//                 <h4>
//                   Total: ₹
//                   {receipt.items
//                     .reduce(
//                       (sum, i) => sum + i.price * (i.quantity || 1),
//                       0
//                     )
//                     .toFixed(2)}
//                 </h4>

//                 {/* Countdown Timer */}
//                 {timeLeft > 0 && (
//                   <p style={{ color: "#b08d3c", fontWeight: "bold" }}>
//                     Time left to complete payment: {formatTime(timeLeft)}
//                   </p>
//                 )}

//                 <button className="pay-btn" onClick={handlePayment}>
//                   Pay Now
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Cart;




import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShopCart.css";

function Cart({ cart = [], setCart, isGuest, setIsGuest }) {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "" });

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Cart item selection
  const handleSelect = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Quantity controls
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    toast.success("Quantity increased");
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      toast.info("Quantity decreased");
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    toast.error("Item removed");
  };

  // Format countdown timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Generate receipt
  const handleGenerateReceipt = () => {
    if (selectedItems.length === 0) {
      toast.warning("Select items first");
      return;
    }
    const items = selectedItems.map((i) => cart[i]);
    setReceipt({ items });
    setTimeLeft(120); // 2-minute timer
    setShowOrderForm(false); // Hide form initially
    toast.success("Receipt generated. Click 'Confirm Order' to continue.");
  };

  // Show order form
  const handleConfirmOrder = () => {
    setShowOrderForm(true);
  };

  // Pay Now inside form
  const handlePayment = () => {
    if (!receipt) return;

    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.warning("Please fill all order details");
      return;
    }

    const total = receipt.items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay key
      amount: total * 100,
      currency: "INR",
      name: "NovaJewels",
      description: "Order Payment",
      handler: function () {
        toast.success(
          `Payment successful! Thank you ${orderForm.name}. Your order is confirmed.`
        );
        setCart([]);
        setReceipt(null);
        setShowOrderForm(false);
        setTimeLeft(0);
        setOrderForm({ name: "", phone: "", address: "" });
        setSelectedItems([]);
        navigate("/");
      },
      theme: { color: "#000" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <Navbar isGuest={isGuest} setIsGuest={setIsGuest} />

      <div className="cart-container">
        <h2>Shopping Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <div className="empty-cart-card">
            <div className="cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven’t added anything yet.</p>
            <button className="shop-btn" onClick={() => navigate("/myapp/shop")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              {cart.map((item, index) => (
                <div className="cart-item-card" key={index}>
                  <div className="cart-item-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleSelect(index)}
                    />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    )}
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(index)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => increaseQuantity(index)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Generate Receipt Button */}
            {!receipt && (
              <button className="buy-btn" onClick={handleGenerateReceipt}>
                Generate Receipt
              </button>
            )}

            {/* Receipt Card */}
            {receipt && (
              <div className="receipt-card">
                <h3>Receipt</h3>
                <ul>
                  {receipt.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity || 1} - ₹
                      {(item.price * (item.quantity || 1)).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <h4>
                  Total: ₹
                  {receipt.items
                    .reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)
                    .toFixed(2)}
                </h4>

                {timeLeft > 0 && (
                  <p style={{ color: "#b08d3c", fontWeight: "bold" }}>
                    Time left to complete payment: {formatTime(timeLeft)}
                  </p>
                )}

                {/* Conditional Buttons */}
                {!showOrderForm ? (
                  <button className="buy-btn" onClick={handleConfirmOrder}>
                    Confirm Order
                  </button>
                ) : (
                  <>
                    <h3>Enter Order Details</h3>
                    <input
                      type="text"
                      placeholder="Name"
                      value={orderForm.name}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, name: e.target.value })
                      }
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, phone: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="Address"
                      value={orderForm.address}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, address: e.target.value })
                      }
                    />
                    <button className="pay-btn" onClick={handlePayment}>
                      Pay Now
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
