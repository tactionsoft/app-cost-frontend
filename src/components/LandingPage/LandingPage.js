import React, { useEffect, useState } from 'react';
import "./css/style.css";
import "./css/bootstrap-icons.css";
import "./css/bootstrap.min.css";
import "./css/bootstrap.min.css.map";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css.map";
import "./vendor/bootstrap-icons/bootstrap-icons.css";
import logo from "./images/Taction-soft-logo.png";
import online from "./images/education-online-books.png";
import avatar1 from "./images/avatar/dummy-profile.jpg";
import avatar2 from "./images/avatar/dummy-profile1.jpg";
import avatar3 from "./images/avatar/dummy-profile2.jpg";
import avatar4 from "./images/avatar/dummy-profile3.jpg";
import calculation from "./images/calculation.jpg";
import aboutUs from "./images/contact image.jpg";
import costCalculator from "./images/cost-calculator.jpg";
import estimate from "./images/Estimate.jpg";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import about_us from './images/about-us.jpg'
import admin from '../LandingPage/images/9c7e8aea-2a33-4d54-a175-683b8ca9b375.jpg'
console.log('emailjs',emailjs);
// import axios from axios;


const LandingPage = ({setCompletedPages,setPage}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [openItem, setOpenItem] = useState(null);
  const [formData, setFormData] = useState({
    "ebook-form-name": "",
    "ebook-email": "",
    "ebook-contact": "",
    "ebook-requirement": ""
  });
console.log('formData is :-',formData)

  const togglefunc=(id)=>{
    setOpenItem(openItem===id? null :id)
}

// const handleChange=(e)=>{
//   const {name,value}=e.target;
//   setFormData((prevFormData)=>({
//   ...prevFormData,
//   [name]:value,
//   }));
//   }

const handleChange = (e) => {
  const { name, value } = e.target;
  
  setFormData((prevValue) => {
    const updatedFormData = { ...prevValue, [name]: value };
    
    // Save to sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));

    return updatedFormData;
  });

  // setErrors((prevErrors) => {
  //   let newErrors = { ...prevErrors };
  //   newErrors[name] = value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
  //   return newErrors;
  // });
};

document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-item button");
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      // Close all accordions
      accordionButtons.forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
        btn.nextElementSibling.style.maxHeight = null;
      });


      // Open the clicked accordion
      if (!isExpanded) {
        this.setAttribute("aria-expanded", "true");
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
      }
    });
  });
});



  const section=['item-1','item-2','item-3','item-4',"item-5"];
  let currentSection='';
  console.log('section is:-',section);
  const handleScroll=()=>{
    section.forEach((id)=>{
      const section=document.getElementById(id);
      if(section){
        const rect=section.getBoundingClientRect();
        if(rect.top>=0 && rect.top<window.innerHeight/2){
          currentSection=id;
        }
      }
    
    })
    setActiveSection(currentSection);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Validate Form Data
    if (!formData["ebook-form-name"] || !formData["ebook-email"] || !formData["ebook-contact"] || !formData["ebook-requirement"]) {
      alert("All fields are required!");
      return;
    }
  
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData["ebook-email"])) {
      alert("Please enter a valid email address!");
      return;
    }
  
    try {
      // ✅ Send Data to Strapi API
      const apiResponse = await fetch("https://api.app-cost.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData["ebook-form-name"],
          email: formData["ebook-email"],
          phone: formData["ebook-contact"],
          requirement: formData["ebook-requirement"],
        }),
      });
  
      const apiData = await apiResponse.json();
  
      if (!apiResponse.ok) {
        throw new Error(apiData.message || "Failed to submit data");
      }
  
      console.log("User data stored successfully:", apiData);
  
      // ✅ Function to Send Email using EmailJS
      const sendEmail = (recipientEmail, subject, message, ccEmail = "",senderName = "Taction Software LLC") => {
        const serviceID = "service_r4mrnbp";
        const templateID = "template_kuwkoet"; // Using a single template
        const publicKey = "kCTmCH5S7cwmPxSVR";
  
        const templateParams = {
          name:senderName,
          to_email: recipientEmail, // Different for user and admin
          cc_email: ccEmail, // Optional CC email for admin
          contact: formData["ebook-contact"],
          requirement: formData["ebook-requirement"],
          email_subject: subject, // Dynamic subject
          email_message: message, // Custom message for client/admin
        };
  
        return emailjs.send(serviceID, templateID, templateParams, publicKey)
          .then((response) => console.log(`Email sent to ${recipientEmail}:`, response.status))
          .catch((error) => console.error(`Failed to send email to ${recipientEmail}:`, error));
      };
  
      // ✅ Custom Subjects and Messages
      const clientSubject = "Thank You for Your Inquiry!";
      const adminSubject = "New Inquiry Received! - Follow Up Required";
  
      const clientMessage = `Dear ${formData["ebook-form-name"]},\n\nThank you for reaching out to us! We have received your inquiry regarding mobile app development, and our team is already reviewing your requirements.

                            With 11+ years of expertise in building innovative and scalable mobile applications, we’re excited to help bring your idea to life. One of our experts will get in touch with you shortly to discuss your project in more detail.In the meantime, feel free to explore our services and past projects here: www.tactionsoft.com. If you have any urgent queries.

                           Looking forward to collaborating with you!\n\nBest Regards,\nTaction Software LLC `;
      const adminMessage = `New Inquiry Received!\n\nName: ${formData["ebook-form-name"]}\nEmail: ${formData["ebook-email"]}\nContact: ${formData["ebook-contact"]}\nRequirement: ${formData["ebook-requirement"]}\n\nPlease follow up.`;
  
      // ✅ Send Different Emails with Different Subjects
      await sendEmail(formData["ebook-email"], clientSubject, clientMessage,"Taction Software LLC"); // Client Email
      await sendEmail("gurvinder@felicitastechnologies.com", adminSubject, adminMessage, "coolkohligaurav1826.gk@gmail.com", formData["ebook-form-name"]); // Admin Email with CC
      alert("Emails Sent Successfully!");
      navigate("/app-cost-calculator");
  
    } catch (error) {
      console.error("Error submitting user data:", error);
      alert(error.message);
    }
  };
  
  
  

  useEffect(() => {
    // ✅ Reset progress when returning to Landing Page
    setCompletedPages({ pageone: true }); // Only enable pageone
    setPage("pageone"); // Start at page one
  }, []);


 useEffect(() => {
  handleScroll();

  }, [])

  return (
    <>
      {/* Header Section */}
      <header id="header" className="header container-fluid">
        <div className="topbar row d-flex ">
          <div className="container  d-flex flex-row align-items-center  justify-content-md-between">
            <div className=" contact-info  d-flex align-items-center">
              <i className="bi bi-envelope  d-flex align-items-center">
                <a href="mailto:info@tactionsoft.com">info@tactionsoft.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>
                  <a href="tel:+1 3074590850" className="contact-link">
                    +1 307 459 0850
                  </a>
                </span>
              </i>
            </div>
            <div style={{marginRight:"110px"}} className=" social-links d-none d-md-flex align-items-center">
              <a href="https://twitter.com/TactionSoft" className="twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.facebook.com/tactionsoftware/" className="facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://in.linkedin.com/company/taction-software-llc" className="linkedin">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/tactionsoftwarellc/" className="instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* End Header Section */}
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-wrapper" id="sticky-wrapper" style={{top:'0',position:"sticky"}}  >
        <div className="container">
          <a className="navbar-brand" href="index.html">
            {/* <i className="navbar-brand-icon bi-book me-2"></i> */}
            <img src={logo} />
            <span></span>
          </a>

          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-lg-auto me-lg-4">
              <li className="nav-item">
                <a className="nav-link click-scroll" href="#section_1">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="hero-section" id="section_1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 col-md-5 banner-content">
            <h1 className="text-white mb-4 banner-title">
              {/* App Development Cost Calculator – Estimate Your <span>App Budget Instantly</span> */}
               <strong>App Cost Calculator | Estimate Your Mobile - <span><strong>App  Development Cost Instantly</strong></span> </strong>
            </h1>

            <p>
            Use our <strong> App Cost Calculator</strong> to get an instant estimate for your mobile <strong>App development cost</strong>. Customize features, platforms, and design to get a real-time price estimate. Start planning your <strong>App budget today!</strong>
            </p>

          </div>
          <div className="hero-image-wrap col-lg-6 col-12 col-md-7 mt-3 mt-lg-0">
            <div className='' id='calculator-form'> <img src={online} /> </div>
            <form onSubmit={handleSubmit} className="custom-form ebook-download-form shadow banner-form" action="#" method="post" role="form" >
              <div className="text-center mb-5">
                <h3 className="mb-1">Estimate Your App Budget – Just One Step Away!</h3>
              </div>
              <div className="banner-tab-form">
                {[
                  { name: "ebook-form-name", placeholder: "Your Name*", icon: "bi-person" },
                  { name: "ebook-email", placeholder: "Email Address*", icon: "bi-envelope", type: "email" },
                  { name: "ebook-contact", placeholder: "Contact Number", icon: "bi-telephone", type: "number" },
                  { name: "ebook-requirement", placeholder: "Your Requirement*", icon: "bi-pencil" },
                ].map((field, index) => (
                  <div className="input-group mb-4" key={index}>
                    <input type={field.type || "text"}name={field.name}id={field.name} className="form-control"placeholder={field.placeholder}required   value={formData[field.name] || ""}
                    onChange={handleChange}/>
                    <span className="input-group-text">
                      <i className={`custom-form-icon ${field.icon}`}></i>
                    </span>
                  </div>
                ))}
                <div className="col-lg-8 col-md-10 col-8 mx-auto">
                  <button type="submit" className="form-control btn btn-success">Estimate your App costs</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section className="featured-section">
        <div className="container avat-group">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="avatar-group d-flex flex-wrap align-items-center">
                <img src={avatar1} className="img-fluid avatar-image" alt="Profile 1" />
                <img src={avatar2} className="img-fluid avatar-image avatar-image-left" alt="Profile 2" />
                <img src={avatar3} className="img-fluid avatar-image avatar-image-left" alt="Profile 3" />
                <img src={avatar4} className="img-fluid avatar-image avatar-image-left" alt="Profile 4" />
                <div className="reviews-group mt-3 mt-lg-0">
                  <strong>4.5</strong>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star"></i>
                  <small className="ms-3">2,564 reviews</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="item-1"></div>
      </section>
   
      <section class="py-lg-5" ></section>

      <section class="review-section">
      <div class="container" >
        <div class="row">
          <div class="col-lg-4 col-12 right-review-section">
            <nav id="navbar-example3" class="h-100 flex-column align-items-stretch">
              <nav class="nav nav-pills flex-column">
                <a className={`nav-link ${activeSection === "item-1" ? "active" : ""}`} href="#item-1" ><strong>Why Use Our App Cost Calculator?</strong></a>
                <a className={`nav-link ${activeSection === "item-2" ? "active" : ""}`} href="#item-2"><strong>How the App Cost Calculator Works?</strong></a>
                <a className={`nav-link ${activeSection === "item-3" ? "active" : ""}`} href="#item-3"><strong> What Factors Influence App Development Costs?</strong></a>
                <a className={`nav-link ${activeSection === "item-4" ? "active" : ""}`} href="#item-4"><strong>FAQs</strong></a>
              </nav>
            </nav>
          </div>

          <div class="col-lg-8 col-12">
      
            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
              class="scrollspy-example-2" tabindex="0">
      

              <div class="scrollspy-example-item right-side-content"  >
             
                <h2>Why Use Our App Cost Calculator?</h2>
      

                <p>Developing a mobile app involves multiple cost factors, including UI/UX design, backend development, integrations, security, and compliance. With our mobile app cost estimator, you can:
                </p>
              
                <div class="app-calculator">
            
                <div class="col-lg-6 col-12">
             <img src={calculation} className="img-fluid" alt="" />
                {/* <div  id="item-2"></div> */}
         
                </div>
                <div class="col-lg-6 col-12">
                  <div class="app_cost-calculator-right">
                   <p><strong>Get a quick estimate</strong> for your app development budget.</p>
                   <p><strong>Compare costs</strong> for different platforms like iOS, Android, or hybrid apps.</p>
                   <p><strong>Understand pricing</strong> for essential features such as user authentication, payment gateways, push notifications, and real-time chat.</p>
                  
                   <p >  <strong>Plan your budget</strong> based on the scope, complexity, and technology stack of your application.
                 <div id='item-2'></div>
                   </p>
                 
                  </div>
                </div>
                </div>
              
              </div>

              <div class="scrollspy-example-item right-side-content">
              <h2>How the App Cost Calculator Works</h2>
                <p>Our calculator simplifies the process by breaking down the app development cost into key components:</p>
                  <div class="card-container">
                    <div class="app-cost-card">
                        <div class="card-icon">🔍</div>
                        <div class="card-content">
                            <p><strong>Choose Your Platform</strong> – Select between <strong>iOS, Android, or cross-platform</strong> development.</p>
                        </div>
                    </div>
                    <div class="app-cost-card">
                        <div class="card-icon">📈</div>
                        <div class="card-content">
                            <p><strong>Select Core Features</strong> – Pick features like <strong>social login, eCommerce, GPS tracking, AI-based recommendations, or API integrations.</strong>
                            </p>
                        </div>
                    </div>
                    <div class="app-cost-card">
                        <div class="card-icon">⚙️</div>
                        <div class="card-content">
                            <p><strong>Define App Complexity</strong> – Choose whether you need a <strong>basic, mid-level, or enterprise-grade</strong> app.</p>
                        </div>
                    </div>
                    <div class="app-cost-card">
                        <div class="card-icon">💡</div>
                        <div class="card-content">   
                            <p>
                              <strong>Estimate Development Timeline</strong> – Get insights on how long it takes to build your app and how it impacts the cost.</p>
                        </div>
                      
                    </div>

                </div>
                <div id="item-3"></div>

              </div>

              <div class="scrollspy-example-item right-side-content" >
                <h2>What Factors Influence App Development Costs?</h2>

                <p>Several factors determine how much it costs to build an app. Our app cost estimator considers:</p>
                <div class="row cost-calculator">
                  <div class="col-lg-6 col-12">
                    <img src={costCalculator} className="img-fluid" alt="" />
                  </div>

                  <div class="col-lg-6 col-12">
                    <p><strong>App Type & Functionality</strong> – Basic apps cost less, while AI-driven or enterprise applications require more investment.</p>
                    <p><strong>Technology Stack</strong> – Using <strong>native, hybrid, or progressive web app (PWA) technologies</strong> impacts pricing.</p>
                    <p><strong>Backend Development</strong> – Integrating APIs, cloud storage, and databases can influence costs.</p>
                    <p><strong>UI/UX Design</strong> – Custom graphics and animations require more resources than standard templates.</p>
                    <p><strong>Security & Compliance</strong> – If your app deals with sensitive data, it may require <strong>HIPAA, GDPR, or PCI-DSS compliance.</strong></p>
                  </div>
                  <div id="item-4"></div>
                </div>
            
              </div>
            

              <div class="scrollspy-example-item right-side-content" >
                <h2>Frequently Asked Questions (FAQs) About App Cost Calculator</h2>

                <p>We hope the information below provides you with a clear understanding of how our App Cost Calculator works, helping you estimate your app development budget with transparency and ease.</p>

                <div class="container-faq">
                  <div class="accordion">
                    <div class="accordion-item">
                      <button onClick={()=>{togglefunc(1)}} 
                      id="accordion-button-1"
                      //  aria-expanded="false"
                       aria-expanded={openItem === 1}
                       className={openItem === 1 ? "active" : ""}
                       >
                        <span class="accordion-title">How does the App Cost Calculator work?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>
                          Our <strong>App Cost Calculator</strong> provides a quick and transparent estimate of your <strong>mobile app development cost</strong> based on factors like platform (iOS, Android, or cross-platform), 
                          app complexity, features, integrations, and design requirements. Simply select your preferences, and the tool will generate an approximate cost breakdown instantly.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button onClick={()=>{togglefunc(2)}} 
                       id="accordion-button-2"
                       aria-expanded={openItem===2}
                       className={openItem===2?'active':''}
                       >
                        <span class="accordion-title">What factors influence the cost of app development?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>• <strong>Platform choice</strong> (iOS, Android, or both)</p>
                        <p>• <strong>complexity</strong>  (e.g., user authentication, AI, payment gateways)</p>
                        <p>• <strong>UI/UX design requirements</strong></p>
                        <p>• <strong>Backend infrastructure and database integration</strong></p>
                        <p>• <strong>Third-party API integrations</strong></p>
                        <p>• <strong>Security and compliance needs (HIPAA, GDPR, etc.)</strong></p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button onClick={()=>togglefunc(3)} id="accordion-button-3" 
                      aria-expanded={openItem===3}
                      className={openItem===3?'active':""}
                      >
                        <span class="accordion-title">Is the cost estimate provided by the calculator accurate?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>Yes, our <strong>app cost estimator </strong>uses industry-standard pricing models and real-time market data to generate accurate estimates. 
                          However, the final cost may vary depending on project scope, custom requirements, and additional features. For a more precise quote, you can schedule a free consultation with our experts.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button 
                      onClick={()=>togglefunc(4)} 
                      id="accordion-button-4" 
                      aria-expanded={openItem===4}
                      className={openItem===4?'active':''}
                      >
                        <span class="accordion-title">How much does it cost to develop a mobile app?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>The cost of app development varies widely based on complexity:</p>
                        <p>• <strong>Basic apps</strong> (e.g., simple utility apps) – $10,000 to $30,000</p>
                        <p>• <strong>Mid-level apps</strong> (e.g., eCommerce, on-demand services) – $30,000 to $100,000</p>
                        <p>• <strong>Enterprise or AI-powered apps</strong> – $100,000+</p>
                        <p>The cost of app development varies widely based on complexity:</p>
                        
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button onClick={()=>togglefunc(5)} 
                      id="accordion-button-5" 
                      aria-expanded={openItem===5}
                      className={openItem===5?'active':''}
                      >
                        <span class="accordion-title">Can I use the calculator for both iOS and Android apps?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>Yes! Our tool provides estimates for <strong>iOS app development, Android app development, and cross-platform solutions.</strong> You can compare costs and decide the best approach for your project.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button
                      onClick={()=>togglefunc(6)}
                       id="accordion-button-5" 
                       aria-expanded={openItem===6}
                       className={openItem===6?'active':""}
                       >
                        <span class="accordion-title">What if my app has unique requirements not covered in the calculator?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>If you need <strong>custom app development</strong> with unique features, integrations, or compliance requirements, reach out to us for a <strong>personalized consultation</strong>.
                          Our team will analyze your needs and provide a detailed cost breakdown beyond the calculator’s estimate.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button 
                      onClick={()=>togglefunc(7)}
                      id="accordion-button-5" 
                      aria-expanded={openItem===7}
                      className={openItem===7?'active':""}
                      >
                        <span class="accordion-title">Does the app cost estimate include maintenance and updates?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>No, the initial estimate covers only the <strong>app development cost</strong>. However, we offer <strong>app maintenance and post-launch 
                          support</strong> plans to help you scale, optimize, and secure your application after deployment.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button 
                      onClick={()=>togglefunc(8)}
                      className={openItem===8?'active':""}
                      id="accordion-button-4" aria-expanded={openItem===8}>
                        <span class="accordion-title">How long does it take to develop a mobile app?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>App development timelines depend on complexity:</p>
                        <p>• <strong>Simple apps</strong> – 1 to 3 months</p>
                        <p>• <strong>Mid-level apps</strong> – 3 to 6 months</p>
                        <p>• <strong>Enterprise apps</strong> – 6+ months</p>
                        <p>Our <strong>App Cost Calculator</strong> also provides a rough estimate of the development timeline based on your selected features.</p>
                        
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button
                      onClick={()=>togglefunc(9)}
                      id="accordion-button-5" 
                       aria-expanded={openItem===9}
                       className={openItem===9?'active':""}
                       >
                        <span class="accordion-title">Do you offer custom pricing for startups and enterprises?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>Yes! We provide <strong>flexible app development pricing models</strong> for startups, SMBs, and enterprises. Whether you need an <strong>MVP for fundraising 
                          or a full-scale enterprise</strong> solution, we tailor the pricing to your budget and goals.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <button
                      onClick={()=>togglefunc(10)} 
                      id="accordion-button-5" 
                      aria-expanded={openItem===10}
                      className={openItem===10?'active':""}
                      >
                        <span class="accordion-title">How do I get started with app development after using the calculator?</span>
                        <span class="icon" aria-hidden="true"></span>
                      </button>
                      <div class="accordion-content">
                        <p>Once you get your <strong>app cost estimate</strong>, the next step is to <strong>schedule a free consultation</strong> with our experts. We’ll discuss your project in detail, refine the requirements, and create a custom development roadmap for your app.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="scrollspy-example-item right-side-content" id="item-5">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-12 col-12 book-sectionInfo">
                        <div class="book-section-info">
                          <h2 class="mb-4">Why Choose Taction Software for App Development?</h2>
            
                          <p><strong>Proven Expertis</strong>e – 10+ years of experience in <strong>custom app development</strong> across industries like <strong>healthcare, fintech, eCommerce, and logistics.</strong>
                          </p>
                          <div class="row choose-us">
                            <div class="col-lg-6 col-12">
                              <p><strong>End-to-End Services</strong> – From ideation to <strong>UI/UX design, development, testing, deployment, and post-launch support.</strong>
                              </p>
                              <p><strong>Agile Methodology</strong> – We follow a <strong>transparent and flexible</strong> development approach to optimize costs and reduce time-to-market.</p>
                              <p><strong>Scalability & Innovation</strong> – We build <strong>future-ready</strong> apps that scale with your business needs.</p>
                            </div>
                            <div class="col-lg-6 col-12">
                              <img src={about_us} className="img-fluid choose-us-image" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="reviews-section section-padding" id="section_4">
      <div class="container">
        <div class="row">

          <div class="col-lg-12 col-12 text-center mb-5">
            <h3>What Our Clients Say About Us</h3>
          </div>

          <div class="col-lg-4 col-12">
            <div class="custom-block d-flex flex-wrap">
              <div class="custom-block-image-wrap d-flex flex-column">
                <div class="text-center">
                  <span class="text-white">John M. <strong>CEO</strong></span>
                  <strong class="d-block text-white">HealthTech Solutions</strong>
                </div>
              </div>

              <div class="custom-block-info review-card">
                <div class="reviews-group mb-3">
                  <strong>4.5</strong>

                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star"></i>
                </div>

                <p class="mb-0 client-review">"Taction Software delivered our healthcare app within budget and ahead of schedule. The cost estimation from their App Cost Calculator was incredibly accurate. Highly recommend their team!"
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-12 my-5 my-lg-0">
            <div class="custom-block d-flex flex-wrap">
              <div class="custom-block-image-wrap d-flex flex-column">
                <div class="text-center">
                  <span class="text-white">Sarah P. <strong>Founder</strong></span>
                  <strong class="d-block text-white">eCommerce Startup</strong>
                </div>
              </div>

              <div class="custom-block-info review-card">
                <div class="reviews-group mb-3">
                  <strong>4.0</strong>

                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star"></i>
                </div>

                <p class="mb-0 client-review">"Their cost estimator helped us budget properly before development. The final product exceeded our expectations – intuitive design, seamless performance, and great post-launch support."
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-12">
            <div class="custom-block d-flex flex-wrap">
              <div class="custom-block-image-wrap d-flex flex-column">
                <div class="text-center">
                  <span class="text-white">Mark R.<strong>CTO</strong></span>
                  <strong class="d-block text-white">Logistics Company</strong>
                </div>
              </div>

              <div class="custom-block-info review-card">
                <div class="reviews-group mb-3">
                  <strong>5.0</strong>

                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                  <i class="bi-star-fill"></i>
                </div>

                <p class="mb-0 client-review">"We needed a logistics tracking app with real-time updates. Taction Software’s team provided a transparent pricing estimate, and the final result was outstanding. The cost calculator was spot on!"
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="cost-estimate section-padding" id="section_3">
      <div class="container">
        <div class="row cost-estimate-cta">

          <div class="col-lg-6 col-12">
            <img src={estimate} className="img-fluid esitmate-image" alt="" />
          </div>

          <div class="col-lg-6 col-12 mt-5 mt-lg-0">
            <h2 class="mb-4">Get Your Custom App Cost Estimate Now!</h2>
            <p>Ready to turn your app idea into reality? <strong>Use our App Cost Calculator</strong> to get a detailed estimate tailored to your requirements.</p>
              <p>Whether you need a <strong>startup app, enterprise solution, or an innovative MVP</strong>, we provide a precise cost breakdown to help you make informed decisions</p>
              <div class="col-lg-8 col-md-10 col-8 cta-btn">
                <a href="#calculator-form"  className="custom-btn smoothscroll me-3"> 👉  Try Our App Cost Calculator Now!</a>
              </div>
          </div>
        </div>
      </div>
    </section>

    <section className="contact-section section-padding" id="section_5">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 col-md-5 mx-auto">
              {/* <form className="custom-form ebook-download-form shadow ebook-contact-form" action="#" method="post" role="form">
                <div className="text-center mb-4">
                  <h2 className="mb-1">Add your details</h2>
                </div>

                <div className="ebook-download-form-body">
                  <div className="input-group mb-4">
                    <input type="text" name="ebook-form-name" id="ebook-form-name" className="form-control"
                      aria-label="ebook-form-name" aria-describedby="basic-addon1" placeholder="Your Name" required />

                    <span className="input-group-text" id="basic-addon1">
                      <i className="custom-form-icon bi-person"></i>
                    </span>
                  </div>

                  <div className="input-group mb-4">
                    <input type="email" name="ebook-email" id="ebook-email" pattern="[^ @]*@[^ @]*" className="form-control"
                      placeholder="Email Address" aria-label="ebook-form-email" aria-describedby="basic-addon2"
                      required />

                    <span className="input-group-text" id="basic-addon2">
                      <i className="custom-form-icon bi-envelope"></i>
                    </span>
                  </div>

                  <div className="col-lg-8 col-md-10 col-8 mx-auto">
                    <button type="submit" className="form-control footer-submit">Submit</button>
                  </div>
                </div>
              </form> */}

             <img style={{width:"400px",height:"auto",boxShadow:"5px 10px 18px #888888",borderRadius:"8px"}} src={aboutUs}/>
            
            </div>

            <div className="col-lg-6 col-12 col-md-7 contact-section-footer">
              <h2 className="mb-4">Contact</h2>

              <p className="mb-3">
              1603 Capitol Ave<br/>
              Suite 310 A124<br/>
              Cheyenne, WY 82001
                {/* <i className="bi-geo-alt me-2"></i>
                London, United Kingdom */}
              </p>

              <p className="mb-2">
                <a href="tel: +1 3074590850" className="contact-link">
                  +1 307 459 0850
                </a>
              </p>

              <p>
                <a href="mailto:info@tactionsoft.com" className="contact-link mail-info">
                  info@tactionsoft.com
                </a>
              </p>

              <ul className="social-icon mb-4">
                <li className="social-icon-item">
                  <a href="https://www.instagram.com/tactionsoftwarellc" className="social-icon-link bi-instagram" target="_blank" rel="noopener noreferrer"></a>
                </li>

                <li className="social-icon-item">
                  <a href="https://x.com/TactionSoft" className="social-icon-link bi-twitter" target="_blank" rel="noopener noreferrer"></a>
                </li>

                <li className="social-icon-item">
                  <a href="https://www.facebook.com/tactionsoftware" className="social-icon-link bi-facebook" target="_blank" rel="noopener noreferrer"></a>
                </li>

                <li className="social-icon-item">
                  <a href="https://www.linkedin.com/company/taction-software-llc/" className="social-icon-link bi-linkedin" target="_blank" rel="noopener noreferrer"></a>
                </li>
              </ul>

              <p className="copyright-text">Copyright © 2012~2025 <a rel="nofollow" href="https://www.tactionsoft.com/" target="_blank"> Taction Software LLC</a></p>
            </div>
          </div>
        </div>
    </section>  

    </>
  );
};

export default LandingPage;
