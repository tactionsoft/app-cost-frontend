import React, { useState } from "react";
import user from "./heart-rate.png";
import users from "./minus-sign.png";
import "./PageFour.css";

const PageFour = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");
  const singleUserCost = { min: 5500, max: 6875 };
  const multiUserCost = { min: 0, max: 0 };
  const [index3value, setIndex3value] = useState({
    value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0
  });
  const isNextButtonEnabled = singleUser || multiUser ;

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
      }
      updateCost(newValue, false); // Ensure multiUser is false if selecting single
  
      setIndex3value(() => ({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        value3: 0, // Reset multi-user values
        value4: 0,
      }));
  
      return newValue;
    });
  };

console.log('index4Value',index3value)

const onClickMultiUser = () => {
  setMultiUser((prev) => {
    const newValue = !prev;
    if (newValue) {
      setSingleUser(false);
    }
    updateCost(false, newValue); // Ensure singleUser is false if selecting multi

    setIndex3value(() => ({
      value1: 0, // Reset single-user values
      value2: 0,
      value3: newValue ? multiUserCost.min : 0,
      value4: newValue ? multiUserCost.max : 0,
    }));

    return newValue;
  });
};


console.log('index4 update is:-',index3value)

const updateCost = (single, multi) => {
  let totalMin = 0, totalMax = 0;
  if (single) {
    totalMin += singleUserCost.min;
    totalMax += singleUserCost.max;
  }
  if (multi) {
    totalMin += multiUserCost.min;
    totalMax += multiUserCost.max;
  }
  
  setTotalCost(
    totalMin === 0 && totalMax === 0
      ? "$0K"
      : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`
  );
};

const calculateTotalCost = () => {
  let totalMin = 0;
  let totalMax = 0;

  // Add cost ranges for selected options
  if (singleUser) {
    totalMin += singleUserCost.min;
    totalMax += singleUserCost.max;
  }
  if (multiUser) {
    totalMin += multiUserCost.min;
    totalMax += multiUserCost.max;
  }

  // Store final cost in session storage under a unique index
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[2] = index3value; // Store at index 3 (4th position)
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));

  console.log("costData is:", costData);

  // Always navigate to page five, even if cost is $0K
  onButtonClick("pagefive");

  return totalMin === 0 && totalMax === 0 ? "$0K" : `$${(totalMin / 1000).toFixed(2)}K - $${(totalMax / 1000).toFixed(2)}K`;
};





  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "65%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Do you need HIPAA Compliance or Bank-Level Encryption?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{
            borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"auto"
          }}
          onClick={() => {onClickSingleUser(5500.00, 6875.00)}}
        >
          <div style={{display:"flex",justifyContent:"center"}}>
          <img
            src={user}
            className="h2 w2"
            title="single user icon"
            alt="user-icon"
          />
          </div>
   
          <h1 className="f4 pl2 pr2">Yes</h1>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">100 - 125 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$5,500.00 - $6,875.00</div>
            </div>
          </div>
        </div>
        {/* Multi User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{
            borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height
            :"auto"
          }}
          onClick={() => {onClickMultiUser(0,0)}}
        >
          <div style={{display:"flex",justifyContent:"center"}}>
          <img
            src={users}
            className="h2 w2"
            title="multi user icon"
            alt="users-icon"
          />
          </div>
      
          <h1 className="f4 pl2 pr2">No</h1>
        </div>
      </div>

      {/* Back Button */}
      <input
        className="f6 grow br2 ph3 pv2 mb2 dib white backButton"
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
          backgroundColor: "#ccc",
          cursor: "pointer",
          marginRight: "10px",
        }}
        type="submit"
        value="Back"
        onClick={() => onButtonClick("pagethree")}
      />

      {/* Next Button - Conditional Enabling */}
      <input
        className="f6 grow br2 ph3 pv2 mb2 dib white submitButton"
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          border: "none",
          borderRadius: "30px",
          marginRight:"8px",
          maxWidth:"0px",
          padding: "10px 20px",
          textAlign: "center",
          minWidth: "150px",
          outline: "none",
          textDecoration: "none",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#B0C4DE",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
          opacity: isNextButtonEnabled ? 1 : 0.6,
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />


    </main>
    <div className="totals well">
        <h2 className="total-cost">
          Total Estimated Cost: <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
          Please note, all cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>
    </>

  );
};

export default PageFour;
