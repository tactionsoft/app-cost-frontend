import React, { useState } from "react";
import user from "./Email-pass.png";
import users from "./google.png";
import usersthree from "./facebook.png";
import "./PageNine.css";

const PageNine = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [index8value, setIndex8value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0 });
  const [totalCost, setTotalCost] = useState("$0K");

  // Define the cost range for each user type (min and max)
  const singleUserCostRange = { min: 550, max: 1375 };
  const multiUserCostRange = { min: 550, max: 1375 };
  const thirdUserCostRange = { min: 550, max: 1375 };

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(newValue, multiUser, thirdUser);
  
      setIndex8value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCostRange.min : 0,
        value2: newValue ? singleUserCostRange.max : 0,
      }));
  
      return newValue;
    });
  };


  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(singleUser, newValue, thirdUser);
  
      setIndex8value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCostRange.min : 0,
        value4: newValue ? multiUserCostRange.max : 0,
      }));
  
      return newValue;
    });
  };


  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      updateCost(singleUser, multiUser, newValue);
      setIndex8value((prevState)=>({
        ...prevState,
        value5: newValue ? thirdUserCostRange.min : 0,
        value6: newValue ? thirdUserCostRange.max : 0,
        // value3: 0, value4: 0, value5: 0, value6: 0,
      }));
      return newValue;
    });
  };


  const updateCost = (single, multi, third) => {
    let totalMin = 0, totalMax = 0;
    if (single) { totalMin += singleUserCostRange.min; totalMax += singleUserCostRange.max; }
    if (multi) { totalMin += multiUserCostRange.min; totalMax += multiUserCostRange.max; }
    if (third) { totalMin += thirdUserCostRange.min; totalMax += thirdUserCostRange.max; }
    setTotalCost(totalMin === 0 && totalMax === 0 ? "$0K" : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`);
  };


  const calculateTotalCostRange = () => {
    
    let totalMin = 0;
    let totalMax = 0;

    // Add cost ranges for selected options
    if (singleUser) {
      totalMin += singleUserCostRange.min;
      totalMax += singleUserCostRange.max;
    }
    if (multiUser) {
      totalMin += multiUserCostRange.min;
      totalMax += multiUserCostRange.max;
    }
    if (thirdUser) {
      totalMin += thirdUserCostRange.min;
      totalMax += thirdUserCostRange.max;
    }

    // If no user is selected, show $0K
    if (totalMin === 0 && totalMax === 0) {
      return "$0K";
    }

    // Format the total cost in "K" format with two decimal places
    const formattedMin = (totalMin / 1000).toFixed(2);
    const formattedMax = (totalMax / 1000).toFixed(2);

    const finalCost = `$${formattedMin}K - $${formattedMax}K`;

    // Store final cost in session storage under a unique index
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    costData[7] = index8value; // Store at index 3 (4th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('costData is:-',costData);
     onButtonClick("pageten")
    return finalCost;
};

  // Format the total cost range in K format with decimals
  const formatCostRange = (min, max) => {
    // If no users are selected (min and max are both 0), show $0K
    if (min === 0 && max === 0) {
      return "$0K";
    }

    const formatToK = (value) => {
      // Convert the value to K format with one decimal place
      return (value / 1000).toFixed(1) + "K";
    };

    return `$${formatToK(min)} - $${formatToK(max)}`;
  };

  // Get the total cost range
  // const { totalMin, totalMax } = calculateTotalCostRange();

  // Determine if the "Next" button should be enabled
  const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
      <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>How will users be signing up?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
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
   
          <h1 className="f4 pl2 pr2">Email / Password</h1>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$550.00 - $1,375.00</div>
            </div>
          </div>
        </div>

        {/* Multi User */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
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
   
          <h1 className="f4 pl2 pr2">Google Auth</h1>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$550.00 - $1,375.00</div>
            </div>
          </div>
        </div>

        {/* Third User */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
          onClick={onClickThirdUser}
        >
             <div style={{display:"flex",justifyContent:"center"}}>
             <img
            src={usersthree}
            className="h2 w2"
            title="third user icon"
            alt="users-icon"
          />
             </div>
 
          <h1 className="f4 pl2 pr2">Facebook</h1>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$550.00 - $1,375.00</div>
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
        onClick={() => onButtonClick("pageeight")}
      />

      {/* Next Button */}
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
          maxWidth:"0px",
          textDecoration: "none",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCostRange}
        disabled={!isNextButtonEnabled}
      />

      {/* Display Total Cost */}
 
    </main>
    <div className="totals well">
        <h2 className="total-cost">
          Total Estimated Cost:{" "}
          {/* <span id="total-cost">{formatCostRange(totalMin, totalMax)}</span> */}
          <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
          Please note, all cost estimates are intended to be indicative of
          development costs and timescales only and are exclusive of all hosting
          costs, paid services or purchased assets of any kind. All prices are in
          USD and inclusive of sales tax.
        </p>
      </div>
    </>
  
  );
};

export default PageNine;
