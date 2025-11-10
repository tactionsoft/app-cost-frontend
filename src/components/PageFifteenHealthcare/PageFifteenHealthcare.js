import React from "react";
import "./PageFifteen.css";
import { useNavigate } from "react-router-dom";

const PageFifteenHealthCare = ({ onButtonClick, resetProgress }) => {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">
    <div className="mw5 bg-white pa2-ns mt5 dib last-page" style={{maxWidth: "43%", maxHeight: "30%", width: "850px", fontWeight: "400",}}>
      <div className="center">
        <h2 style={{ fontSize: "2rem" }}>
          Thanks for your time. <br />
          Your estimate will be emailed to you shortly.
        </h2>
      </div>
      <p
        style={{fontSize: "1rem", fontWeight: "500", lineHeight: 1.5, color: "#212529"}}>
        We look forward to hearing from you.
      </p>
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
          backgroundColor: "#08354e",
          cursor: "pointer",
          letterSpacing: "1px",
          fontWeight: "600",
        }}
        type="button"
        value="Get Free Consultation"
        onClick={() => {
          sessionStorage.clear();
            navigate("/thankyou");
          // onButtonClick("pageone");
          resetProgress();
        }}
      />
    </div>
    </div>
  );
};

export default PageFifteenHealthCare;