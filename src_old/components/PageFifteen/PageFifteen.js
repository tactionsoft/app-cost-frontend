import React, { useEffect, useState } from "react";
import "./PageFifteen.css";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
console.log('emailjs',emailjs);

const PageFifteen = ({ onButtonClick }) => {
  const navigate =useNavigate();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
  });
  console.log('formData is :-',formData);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevValue)=>({
          ...prevValue,
          [name]:value,
    }))
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
  
      if (!value.trim()) {
        // If field is empty, show the error again
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
      } else {
        // Clear the error if user enters a value
        newErrors[name] = '';
      }
  
      return newErrors;
    });

  }
  const [totalCost, setTotalCost] = useState("$0K");
  
  const calculateTotalCost = () => {
    const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

    let totalMin = 0;
    let totalMax = 0;

    costData.forEach(item => {
      totalMin += (item?.value1 || 0) + (item?.value3 || 0) + (item?.value5 || 0);
      totalMax += (item?.value2 || 0) + (item?.value4 || 0) + (item?.value6 || 0);
    });

    if (totalMin === 0 && totalMax === 0) {
      setTotalCost("$0K");
    } else {
      setTotalCost(`$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`);
    }
  };
  
  useEffect(() => {
    calculateTotalCost();

    const handleStorageChange = () => {
      calculateTotalCost();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: '', email: '', phone: '' };
  
    const { name, email, phone } = formData;
  
    // ✅ Name validation
    if (!name.trim()) {
      valid = false;
      newErrors.name = 'Name is required.';
    }
  
    // ✅ Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      valid = false;
      newErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(email)) {
      valid = false;
      newErrors.email = 'Please enter a valid email address.';
    }
  
    // ✅ Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!phone.trim()) {
      valid = false;
      newErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(phone)) {
      valid = false;
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
  
    if (!valid) {
      setErrors(newErrors); // Show validation errors
      return;
    }
  
    // ✅ Calculate total cost
    const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    let totalMin = 0;
    let totalMax = 0;
  
    costData.forEach(item => {
      totalMin += (item?.value1 || 0) + (item?.value3 || 0) + (item?.value5 || 0);
      totalMax += (item?.value2 || 0) + (item?.value4 || 0) + (item?.value6 || 0);
    });
  
    const totalCost = `$${Math.round(totalMin / 1000)}K - $${Math.round(totalMax / 1000)}K`;
  
    try {
      // ✅ Send data to Strapi API
      const response = await fetch('http://localhost:1337/api/user-info/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, totalCost })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('✅ API Success:', result);
  
        // ✅ Send Email to Admin using EmailJS
        const serviceID = "service_hwmtg7p";
        const templateID = "template_goxhraz";
        const publicKey = "sXCZZgYF5dxHpqxO_";
        
        const adminEmail = "admin@example.com"; // ✅ Replace with actual admin email
  
        const templateParams = {
          email,
          phone,
          from_name: name, // ✅ The client's name
          name: "Admin", // ✅ Admin will receive the email
          total_cost: totalCost, // ✅ Cost estimate
          to_email: adminEmail, // ✅ Email goes to the admin ONLY
        };
  
        emailjs.send(serviceID, templateID, templateParams, publicKey)
          .then((response) => {
            console.log("📩 Email sent successfully to Admin!", response.status, response.text);
            alert("Thank you for your submission! Our team will review your estimate and get in touch with you soon.");
  
            // ✅ Clear progress & redirect to page 1
            sessionStorage.removeItem("userProgress"); // Clears any stored page progress
            sessionStorage.removeItem("finalCostPrice"); // Clears cost calculation
  
            onButtonClick('pagesixteen') // Redirects user to start fresh
          })
          .catch((error) => {
            console.error("❌ Failed to send email:", error);
            alert("Failed to notify admin. Please try again.");
          });
  
      } else {
        console.error('❌ API Error:', result);
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      alert('Network error. Please check your connection.');
    }
  };
  const isdisabled=formData?.name && formData?.email && formData?.phone;
  console.log('disables is :-',isdisabled)
  
  return (
    <main className="pt5 black-80 center form-content"
      style={{ maxWidth: "60%", maxHeight: "30%", margin: "auto" }}>

        <div className="total-est-cost well">
        <h2 className="total-cost-title">Estimated Cost based on your total selection: <span id="total-selection-cost"><br/>{totalCost}</span>
        </h2>
        <p className="disclaimer-form">
          Please note, all cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>

      <form className="measure" onSubmit={handleSubmit}>
        <h1 className="form-title" style={{ color: "#fff" }}>Please fill out this form to complete your details and receive your estimate.</h1>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          {/* Name Field */}
          <div className="mt3">
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100 input-font"
              type="text"
              name="name"
              id="workspace-name"
              value={formData?.name}
              onChange={ handleChange}
              placeholder="Enter your Name"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className="mv3">
            <input
              className="f6 ph3 pv2 dib br2 black w-100 input-font"
              type="email"
              name="email"
              id="workspace-url"
              value={formData?.email}
              onChange={ handleChange}
              placeholder="Enter your Email Address"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>

          {/* Phone Field */}
          <div className="mz3">
            <input
              className="f6 ph3 pv2 dib br2 black w-100 input-font"
              type="text"
              name="phone"
              id="workspace-phone"
              value={formData?.phone}
              onChange={ handleChange}
              placeholder="Enter your Phone Number"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="">
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white submitButton"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              border: "none",
              borderRadius: "30px",
              padding: "10px 20px",
              textAlign: "center",
              minWidth: "150px",
              outline: "none",
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
              
            }}
            type="submit"
            value="Submit"
            disabled={!isdisabled}
          />
        </div>
      </form>
    </main>
  );
};

export default PageFifteen;

