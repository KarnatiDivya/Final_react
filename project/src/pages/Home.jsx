// // src/pages/Home.jsx
// import React, { useRef } from "react";
// import "./Home.css";
// import emailjs from "@emailjs/browser";
// import Navbar from "../Components/Navbar.jsx";

// function Home() {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm(
//       "service_1ycv4b6",     
//       "template_eb0jdj9",    
//       form.current,
//       "cqPAI4ifZuE8kt1ub"     
//     )
//     .then((result) => {
//         alert("Message sent successfully!");
//         form.current.reset(); 
//     }, (error) => {
//         alert("Failed to send message. Please try again.");
//         console.log(error.text);
//     });
//   };

//   return (
//     <div className="home-page">
// <Navbar />
//       <section id="home" className="home-section">
//         <h1 className="home-title">Welcome to YourJewels</h1>
//         <p className="home-quote">“Jewelry that tells your story.”</p>

//         <div
//           className="image"
//           style={{
//             backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/2c154b152898429.6326071530042.jpg')"
//           }}
//         >
//           <h1></h1>
//         </div>
//       </section>

//       <section id="about" className="section about-section">
//         <div className="about-container">
//           <div className="about-text">
//             <h2>About Us</h2>
//             <p>
//               At <strong>YourJewels</strong>, we craft jewelry that is as unique as the stories you carry. 
//               Each piece is meticulously designed and handcrafted by our skilled artisans, blending timeless elegance 
//               with modern trends.
//             </p>
//             <p>
//               From delicate necklaces to statement rings, we focus on creating pieces that celebrate your individuality. 
//               Our materials are ethically sourced, and we are committed to sustainability, ensuring that beauty never 
//               comes at a cost to the planet.
//             </p>
//             <ul>
//               <li>Handcrafted with care</li>
//               <li>Ethically sourced materials</li>
//               <li>Timeless and modern designs</li>
//               <li>Custom jewelry options available</li>
//             </ul>
//           </div>
//           <div className="about-image">
//             <img 
//               src="https://tse1.mm.bing.net/th/id/OIP.6-tRtR_DflCoWec0zcptrQHaEK?pid=Api&P=0&h=180" 
//               alt="Jewelry Display" 
//             />
//           </div>
//         </div>
//       </section>

//           <div className="home-page">
//       <section id="contact" className="section contact-section">
//         <h2>Contact Us</h2>
//         <form ref={form} onSubmit={sendEmail} className="contact-form">
//           <label>Name</label>
//           <input type="text" name="from_name" placeholder="Your Name" required />

//           <label>Email</label>
//           <input type="email" name="from_email" placeholder="Your Email" required />

//           <label>Message</label>
//           <textarea name="message" rows="5" placeholder="Your Message" required></textarea>

//           <button type="submit">Send Message</button>
//         </form>
//       </section>
//     </div>
//     <footer className="footer">
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

//     </div>
//   );
// }

// export default Home;



// src/pages/Home.jsx
import React, { useRef, useLocation } from "react";
import "./Homess.css";
import emailjs from "@emailjs/browser";
import Navbar from "../Components/Navbar.jsx";
import "../Footer.css";

function Home({ isGuest, setIsGuest }) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_1ycv4b6",     
      "template_eb0jdj9",    
      form.current,
      "cqPAI4ifZuE8kt1ub"     
    )
    .then(() => {
        alert("Message sent successfully!");
        form.current.reset(); 
    })
    .catch((error) => {
        alert("Failed to send message. Please try again.");
        console.log(error.text);
    });
  };

  return (
    <div className="home-page">
      {/* Navbar at the top */}
      {/* <Navbar /> */}
      <Navbar isGuest={isGuest} setIsGuest={setIsGuest} setIsLoggedIn={setIsGuest}/>

      {/* {isLoggedIn?<Navbar />:null} */}

      {/* Home Section */}
      <section id="home" className="home-section" style={{ paddingTop: "70px" }}>
        <h1 className="home-title">Welcome to NovaJewels</h1>
        <p className="home-quote">“Jewelry that tells your story.”</p>

        <div
          className="image"
          style={{
            backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/4276fe171225559.646b8933ea575.jpg')"
          }}
        />
      </section>
      


      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              At <strong>YourJewels</strong>, we craft jewelry that is as unique as the stories you carry. 
              Each piece is meticulously designed and handcrafted by our skilled artisans, blending timeless elegance 
              with modern trends.
            </p>
            <p>
              From delicate necklaces to statement rings, we focus on creating pieces that celebrate your individuality. 
              Our materials are ethically sourced, and we are committed to sustainability, ensuring that beauty never 
              comes at a cost to the planet.
            </p>
            <ul>
              <li>Handcrafted with care</li>
              <li>Ethically sourced materials</li>
              <li>Timeless and modern designs</li>
              <li>Custom jewelry options available</li>
            </ul>
          </div>
          <div className="about-image">
            <img 
              src="https://tse1.mm.bing.net/th/id/OIP.6-tRtR_DflCoWec0zcptrQHaEK?pid=Api&P=0&h=180" 
              alt="Jewelry Display" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2>Contact Us</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label>Name</label>
          <input type="text" name="from_name" placeholder="Your Name" required />

          <label>Email</label>
          <input type="email" name="from_email" placeholder="Your Email" required />

          <label>Message</label>
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
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
      </footer>    </div>
  );
}

export default Home;
