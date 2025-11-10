import React from "react";
import "./ThankYouPage.css";
import { useNavigate } from "react-router-dom";

const ThankYouPage = ({ onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <div className="thank-you-page">
      <h1 className="thankyou-page-title">Build the Next Big Thing</h1>
      {/* Your new section goes here */}
      <section data-qa="layout-placement-wrapper" className="layout-wrapper">
        <div className="content-wrapper">
          <div className="distribute-wrapper">
            <h2 className="text-wrapper thank-contact">
              Thank you for contacting us.
            </h2>
            {/* <p> To know your estimate cost, please go to the home page and click on <strong style={{color:"#fff"}}>Estimate your App costs</strong> button.
						</p> */}
          </div>
          <div className="submit-button">
            <button
              onClick={
                () => navigate("/healthcare-app-development-cost.com/")
                // ()=>onButtonClick('pageone')
              }
              data-qa="thank-you-button"
              tabindex="0"
              className="thank-you-button"
            >
              <span className="button-text-wrapper">
                <span className="text-wrapper">Home Page</span>
              </span>
            </button>
            {/* <div class="press">press <strong>Enter ↵</strong></div> */}
          </div>
        </div>
      </section>
      {/* Footer Component */}
      <Footer />
    </div>
  );
};
const Footer = () => {
  return (
    <div className="container-footer">
      <div className="footer-copy">
        <div className="copy-text">
          <p>© 2025 TactionSoft LLC. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
export default ThankYouPage;
