import React, { useState, useEffect } from "react";
import user from "./plan.png";
import users from "./minus-sign.png";
import "./PageThree.css";

const PageThree = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");
  const singleUserCost = { min: 1375, max: 2200 };
  const multiUserCost = { min: 6600, max: 8800 };
  const [index2value, setIndex2value] = useState({
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
  
      setIndex2value(() => ({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        value3: 0, // Reset multi-user values
        value4: 0,
      }));
  
      return newValue;
    });
  };

console.log('index4Value',index2value)

const onClickMultiUser = () => {
  setMultiUser((prev) => {
    const newValue = !prev;
    if (newValue) {
      setSingleUser(false);
    }
    updateCost(false, newValue); // Ensure singleUser is false if selecting multi

    setIndex2value(() => ({
      value1: 0, // Reset single-user values
      value2: 0,
      value3: newValue ? multiUserCost.min : 0,
      value4: newValue ? multiUserCost.max : 0,
    }));

    return newValue;
  });
};


console.log('index4 update is:-',index2value)

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
      : `$${Math.round(totalMin / 1000)}K - $${(Math.round(totalMax / 1000))}K`
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

    // If no user is selected, show $0K
    if (totalMin === 0 && totalMax === 0) {
      return "$0K";
    }

    // Format the total cost in "K" format with two decimal places
    const formattedMin = (totalMin / 1000);
    const formattedMax = (totalMax / 1000);

    const finalCost = `$${Math.round(formattedMin)}K - $${Math.round(formattedMax)}K`;

    // Store final cost in session storage under a unique index
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    costData[1] = index2value; // Store at index 3 (4th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('costData is:-',costData);
     onButtonClick("pagefour");
    return finalCost;
};
  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "65%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Do you have a finished UX/UI design?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{
            borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"auto"
          }}
          onClick={onClickSingleUser}
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
              <div className="col-xl-6 col-7">25 - 40 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$1,375.00 - $2,200.00</div>
            </div>
          </div>
        </div>
        {/* Multi User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{
            borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"auto"
          }}
          onClick={onClickMultiUser}
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
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">120 - 160 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$6,600.00 - $8,800.00</div>
            </div>
          </div>
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
        onClick={() => onButtonClick("pagetwo")}
      />

      {/* Next Button - Condition for Enabling */}
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
          maxWidth:"0px",
          outline: "none",
          marginRight:"8px",
          textDecoration: "none",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />

 
    </main>
    <div className="totals well col">
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

export default PageThree;
