import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsultationForm.css";
import "./facebook-logo.svg";
import "./linkedin.svg";
import "./x.svg";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    helpWith: [],
    budget: '',
    securedBudget: '',
    percentageSecured: '',
    productDescription: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        helpWith: [...prevData.helpWith, name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        helpWith: prevData.helpWith.filter((item) => item !== name),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/thank-you");
  };

  return (
    <div className="consultation-form-container">
      <h1>Build the Next Big Thing</h1>
      <p>Looking to bring your idea to life? Fill out a few details so we can determine next steps. Takes only a minute.</p>
      <form onSubmit={handleSubmit}>
        {/* Form fields here */}
        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>What Can We Help You With?*</label>
          <div className="checkbox-group">
            <label>A.  UI/UX Design
              <input
                type="checkbox"
                name="UI/UX Design"
                onChange={handleCheckboxChange}
              />
            </label>
            <label>B.  Development
              <input
                type="checkbox"
                name="Development"
                onChange={handleCheckboxChange}
              />
            </label>
            <label>
              C.  EHR Integration
              <input
                type="checkbox"
                name="EHR Integration"
                onChange={handleCheckboxChange}
              />
            </label>
            <label>D.  Computer Vision
              <input
                type="checkbox"
                name="Computer Vision"
                onChange={handleCheckboxChange}
              />
            </label>
            <label>E. Generative AI
              <input
                type="checkbox"
                name="Generative AI"
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>What is your budget?*</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select a range</option>
            <option value="5000-15000">5000 - 15000</option>
            <option value="16000-35000">16000 - 35000</option>
            <option value="36000-55000">36000 - 55000</option>
            <option value="56000-75000">56000 - 75000</option>
            <option value="76000-100000">76000 - 100000</option>
            <option value="100000-200000">100000 - 200000</option>
            <option value="200000-300000">200000 - 300000</option>
            <option value=">300000"> 300000</option>
          </select>
        </div>

        <div className="form-group">
          <label>How much budget have you secured?*</label>
          <select
            name="securedBudget"
            value={formData.securedBudget}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="fullySecured">The budget is fully secured. I'm ready to begin.</option>
            <option value="notSecured">The budget is 0% secured. I need to raise funds.</option>
            <option value="partlySecured">The budget is partly secured.</option>
          </select>
        </div>

        <div className="form-group">
          <label>Please select a percentage*</label>
          <select
            name="percentageSecured"
            value={formData.percentageSecured}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="80">80%</option>
            <option value="60">60%</option>
            <option value="40">40%</option>
            <option value="20">20%</option>
          </select>
        </div>

        <div className="form-group">
          <label>Briefly describe your product/idea*</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number (Country Code)</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="container">
      <div className="footer-copy">
        <div className="social-footer">
          <ul className="social-list">
            <li className="social-item-linkedin">
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="hc-linkedin"></i>
              </a>
            </li>
            <li className="social-item-facebook">
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="hc-facebook"></i>
              </a>
            </li>
            <li className="social-item-x">
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="hc-x"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="copy-text">
          <p>© 2025 TactionSoft LLC. All rights reserved. Tactionsoft LLC is an <a href="https://www.sba.gov/document/sba-form-722-equal-employment-opportunity-statement">equal opportunity employer</a>.</p>
          <p>© 2025 TactionSoft. TactionSoft Foundation is a 501(c)(3) and all donations are tax-deductible. EIN 82-2671514</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
