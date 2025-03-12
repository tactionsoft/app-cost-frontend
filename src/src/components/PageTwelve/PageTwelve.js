import React, { useState } from "react";
import user from "./api-icon.png";
import users from "./booking.png";
import usersthree from "./connection.png";
import "./PageTwelve.css";

const PageTwelve = ({ onButtonClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");

  const singleUserCost = { min: 1100, max: 1650 };
  const multiUserCost = { min: 2200, max: 3300 };
  const thirdUserCost = { min: 2750, max: 4400 };
  const [index11value, setIndex11value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,title1:"",title2:"",title3:"",index:0 });
  
  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
        setThirdUser(false);
      }
      updateCost(newValue);
  const  pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title1: newValue ? "Twillio SMS " : prevState.title
      }));
  
      return newValue;
    });
  };
  
  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setThirdUser(false);
      }
      updateCost(false, newValue, false);
  const pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title2: newValue ? "Twillio SMS - Calendly" : prevState.title
      }));
      return newValue;
    });
  };

  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      console.log('prev value is:-', prev);
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setMultiUser(false);
      }
      updateCost(false, false, newValue);
    const pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value5: newValue ? thirdUserCost.min : 0,
        value6: newValue ? thirdUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title3: newValue ? "Twillio SMS - Calendly - Google Map" : prevState.title3
      }));
  
      return newValue;
    });
  };


console.log('indexValue9 is:-',index11value);
  const updateCost = (single, multi, third) => {
    let totalMin = 0, totalMax = 0;
    if (single) { totalMin += singleUserCost.min; totalMax += singleUserCost.max; }
    if (multi) { totalMin += multiUserCost.min; totalMax += multiUserCost.max; }
    if (third) { totalMin += thirdUserCost.min; totalMax += thirdUserCost.max; }
    setTotalCost(totalMin === 0 && totalMax === 0 ? "$0K" : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`);
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
    if (thirdUser) {
      totalMin += thirdUserCost.min;
      totalMax += thirdUserCost.max;
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
    costData[11] = index11value; // Store at index 3 (4th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('costData is:-',costData);
     onButtonClick("pagethirteen");
    return finalCost;
};


const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>How many other basic API integrations are you expecting?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: singleUser? "#18d2e8" : "#EAEEF5",height:"auto" }}
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
   
          <h1 className="f4 pl2 pr2">1</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Example: Twilio SMS</p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">20 - 30 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$1,100.00 - $1,650.00</div>
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
  
          <h1 className="f4 pl2 pr2">2</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Example: Twilio SMS, Calendly</p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">40 - 60 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$2,200.00 - $3,300.00</div>
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
    
          <h1 className="f4 pl2 pr2">3</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Example: Twilio SMS, Calendly, Google Map</p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">50 - 80 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$2,750.00 - $4,400.00</div>
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
        onClick={() => onButtonClick("pageeleven")}
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
          textDecoration: "none",
          maxWidth:"0px",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />

      {/* Total Cost Display */}

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

export default PageTwelve;
