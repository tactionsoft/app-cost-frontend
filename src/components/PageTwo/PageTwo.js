import React, { useState, useEffect } from "react";
import user from "./mail.png";
import users from "./rocket.png";
import "./PageTwo.css";

const PageTwo = ({ onButtonClick}) => {

  // const [selectedUserType, setSelectedUserType] = useState(null);
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");
  const singleUserCost = { min: 13750, max: 33000 };
  const multiUserCost = { min: 27500, max: 55000 };
  const [index1value, setIndex1value] = useState({
    value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,title1:"",title2:"",index:2
  });
  const isNextButtonEnabled = singleUser || multiUser ;

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
      }
      updateCost(newValue, false); // Ensure multiUser is false if selecting single
      const pageIndex = 2; 
      setIndex1value(() => ({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        value3: 0, // Reset multi-user values
        value4: 0,
        index:newValue?pageIndex:0,
        title1:newValue?"MVP":"",
      }));
  
      return newValue;
    });
  };

console.log('index4Value',index1value)

const onClickMultiUser = () => {
  setMultiUser((prev) => {
    const newValue = !prev;
    if (newValue) {
      setSingleUser(false);
    }
    updateCost(false, newValue); // Ensure singleUser is false if selecting multi
     const pageIndex=2;
    setIndex1value(() => ({
      value1: 0, // Reset single-user values
      value2: 0,
      value3: newValue ? multiUserCost.min : 0,
      value4: newValue ? multiUserCost.max : 0,
      index:newValue?pageIndex:0,
      title2:newValue?"Feature Rich":""
    }));

    return newValue;
  });
};


console.log('index4 update is:-',index1value)

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
      : `$${Math.round(totalMin / 1000)}K - $${Math.round(totalMax / 1000)}K`
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
    const formattedMin = (totalMin / 1000).toFixed(2);
    const formattedMax = (totalMax / 1000).toFixed(2);

    const finalCost = `$${formattedMin}K - $${formattedMax}K`;

    // Store final cost in session storage under a unique index
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    costData[0] = index1value; // Store at index 3 (4th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('costData is:-',costData);
     onButtonClick("pagethree");
    return finalCost;
};
  return (
    <main
      className="pt5 black-80"
      style={{ minWidth: "65%", minHeight: "25%", margin: "auto" }}
    >
      <h2>How big is your app?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Selection */}
        <div
          className="mw5 bg-white-two br3 pa3 mv3 ba dib b--black-10 ma3 page_two clicked page-two"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"400px" }}
          onClick={onClickSingleUser}>
            <div style={{display:"flex",justifyContent:"center"}}>
            <img
            src={user}
            className="h2 w2"
            title="single user icon"
            alt="user-icon" />
            </div>
          <h1 className="f4 pl2 pr2">MVP</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            This is a proof of concept for your app idea, meant to get you out
            the door as quickly as possible with a focus on establishing
            product-market fit with as few features as possible.
          </p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="label-two">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">250 - 600 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="label-two">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$13,750.00 - $33,000.00</div>
            </div>
          </div>
        </div>

        {/* Multi User Selection */}
        <div
          className="mw5 bg-white-two br3 pa3 mv3 ba dib b--black-10 ma3 clicked page_two page-two"
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"400px"}}
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
   
          <h1 className="f4 pl2 pr2">Feature Rich</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            This is an upgrade of an MVP, meant to get the app to the next
            level. Here, the focus is entirely on optimizing the user
            experience. The end product will be engaging, beautiful, and
            scalable.
          </p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="label-two">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">500 - 1000 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="label-two">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$27,500.00 - $55,000.00</div>
            </div>
          </div>
        </div>
      </div>
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
        onClick={() => onButtonClick("pageone")}
      />
      {/* Navigation Buttons */}
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
          textDecoration: "none",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#a1a1a1",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />

      <div className="totals well">
        <h2 className="total-cost">
          Total Estimated Cost: <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
          Please note, all cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>
    </main>
  );
};

export default PageTwo;
