import React, { useEffect, useState } from "react";
import user from "./paymentProcessing.png";
import users from "./minus-sign.png";
import "./PageSeven.css";

const PageSeven = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);

  const singleUserCost = { min: 2750, max:4130  };
  const thirdUserCost = { min: 0, max: 0 };
  const [totalCost, setTotalCost] = useState("$0K"); // Track the total cost
  const [index6value, setIndex6value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",answer:"" });

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(newValue);
      const pageIndex=7
      setIndex6value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index:newValue?pageIndex:0,
        title1:newValue?"Payment Process ":"",
        answer:newValue?"Yes":"",
      }));
  
      return newValue;
    });
  };
  console.log('index6 update is:-',index6value);

  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
      }
      const pageIndex=7;
      updateCost(false, false, newValue);
      setIndex6value({
        value1: newValue ? thirdUserCost.min : 0,
        value2: newValue ? thirdUserCost.max : 0,
        value3: 0, value4: 0, value5: 0, value6: 0,
        index:newValue?pageIndex:0,
        title2:newValue?"Payment Process":"",
        answer:newValue?"No":""

      });
      return newValue;
    });
  };
  console.log('index6 update is:-',index6value)

  const updateCost = (single) => {
    let totalMin = 0, totalMax = 0;
    if (single) { totalMin += singleUserCost.min; totalMax += singleUserCost.max; }
    // if (multi) { totalMin += multiUserCost.min; totalMax += multiUserCost.max; }
    setTotalCost(totalMin === 0 && totalMax === 0 ? "$0K" : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`);
  };

const calculateTotalCost = () => {
  let totalMin = 0;
  let totalMax = 0;

  if (singleUser) {
    totalMin += singleUserCost.min;
    totalMax += singleUserCost.max;
  }
  if (thirdUser) {
    totalMin += thirdUserCost.min;
    totalMax += thirdUserCost.max;
  }

  const formattedMin = (totalMin / 1000).toFixed(2);
  const formattedMax = (totalMax / 1000).toFixed(2);
  const finalCost = totalMin === 0 && totalMax === 0 ? "$0K" : `$${formattedMin}K - $${formattedMax}K`;

  setTotalCost(finalCost);

  // Retrieve existing data
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

  // Ensure costData has at least 6 indices without affecting existing values
  costData = [...costData];

  // Only update index 5 if it hasn't been set already
  if (!costData[5]) {
    costData[5] = {}; // Initialize index 5 if it's undefined
  }

  // Preserve existing values in costData[5] and update only necessary fields
  costData[5] = { ...costData[5], ...index6value };

  // Save updated data
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  console.log("Updated costData:", costData);

  onButtonClick("pageeight");
};

const storeDataAndContinue = () => {
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[6] = index6value; // Store at index 6 (7th position)
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  console.log("Updated costData:", costData);
  onButtonClick("pageeight");
};
  const isContinueButtonEnabled = singleUser || thirdUser;

  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "65%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Payment processing?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white-seven br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"350px"}}
          onClick={onClickSingleUser}
        >
            <div style={{display:"flex",justifyContent:"center"}} >
            <img
            src={user}
            className="h2 w2"
            title="single user icon"
            alt="user-icon"
          />
            </div>
 
          <h1 className="f4 pl2 pr2">Yes</h1>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">50 - 75 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$2,750.00 - $4,125.00</div>
            </div>
          </div>
        </div>
        
        {/* Multi User Option */}
        <div
          className="mw5 bg-white-seven br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height :"350px" }}
          onClick={onClickThirdUser}
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
        onClick={() => onButtonClick("pagesix")}
      />
      
      {/* Continue Button */}
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
          backgroundColor: isContinueButtonEnabled ? "#08354e" : "#ddd",
          cursor: isContinueButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Continue"
        onClick={calculateTotalCost}
        // onClick={() => onButtonClick("pageeight")}
        disabled={!isContinueButtonEnabled}
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

export default PageSeven;
