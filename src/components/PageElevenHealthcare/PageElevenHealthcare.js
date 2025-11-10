import React, { useEffect, useState } from "react";
import user from "./api-icon.png";
import users from "./booking.png";
import usersthree from "./connection.png";
import "./PageEleven.css";

const PageElevenHealthCare = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  // const [totalCost, setTotalCost] = useState("$0K");

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
      const updatedState = {
        singleUser:newValue,
        multiUser:false,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageTwelve', JSON.stringify(updatedState));
      updateCost(newValue);
  const  pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title1: newValue ? "How many other basic API integrations are you expecting(Twillio SMS) " : prevState.title1
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
      const updatedState = {
        singleUser:false,
        multiUser:newValue,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageTwelve', JSON.stringify(updatedState));
      updateCost(false, newValue, false);
  const pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title2: newValue ? "How many other basic API integrations are you expecting(Twillio SMS - Calendly)" : prevState.title
      }));
      return newValue;
    });
  };

  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setMultiUser(false);
      }
      const updatedState = {
        singleUser:false,
        multiUser:false,
        thirdUser:newValue
      };
      sessionStorage.setItem('userSelection_pageTwelve', JSON.stringify(updatedState));
      updateCost(false, false, newValue);
    const pageIndex=12;
      setIndex11value((prevState) => ({
        ...prevState, // Keep previous values
        value5: newValue ? thirdUserCost.min : 0,
        value6: newValue ? thirdUserCost.max : 0,
        index: newValue ? pageIndex : prevState.index,
        title3: newValue ? "How many other basic API integrations are you expecting(Twillio SMS - Calendly - Google Map)" : prevState.title3
      }));
  
      return newValue;
    });
  };

  const updateCost = (single, multi, third) => {
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  
    const value = {
      value1: single ? singleUserCost.min : 0,
      value2: single ? singleUserCost.max : 0,
      value3: multi ? multiUserCost.min : 0,
      value4: multi ? multiUserCost.max : 0,
      value5: third ? thirdUserCost.min : 0,
      value6: third ? thirdUserCost.max : 0,
      index: single || multi || third ? 12 : 0,  // PageTwelve index
      title1: single ? "How many other basic API integrations are you expecting(Twillio SMS)" : "",
      title2: multi ? "How many other basic API integrations are you expecting(Twillio SMS - Calendly)" : "",
      title3: third ? "How many other basic API integrations are you expecting(Twillio SMS - Calendly - Google Map)" : "",
    };
  
    // ✅ Overwrite index 10 cleanly (not merge)
    costData[10] = value;
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  
    // ✅ Recalculate total from clean structure
    let totalMin = 0;
    let totalMax = 0;
  
    for (let item of costData) {
      if (item) {
        totalMin += (item.value1 || 0) + (item.value3 || 0) + (item.value5 || 0);
        totalMax += (item.value2 || 0) + (item.value4 || 0) + (item.value6 || 0);
      }
    }
  
    setTotalCost(
      totalMin === 0 && totalMax === 0
        ? "$0K"
        : `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`
    );
  };

const calculateTotalCost = () => {
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

  const updatedValue = {
    value1: singleUser ? singleUserCost.min : 0,
    value2: singleUser ? singleUserCost.max : 0,
    value3: multiUser ? multiUserCost.min : 0,
    value4: multiUser ? multiUserCost.max : 0,
    value5: thirdUser ? thirdUserCost.min : 0,
    value6: thirdUser ? thirdUserCost.max : 0,
    index: 12,
    title1: singleUser ? "Twillio SMS" : "",
    title2: multiUser ? "Twillio SMS - Calendly" : "",
    title3: thirdUser ? "Twillio SMS - Calendly - Google Map" : "",
  };

  costData[10] = updatedValue;
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  onButtonClick("pagetwelve");
};


useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageTwelve'));
  console.log('selection is:-',selection);
  if (!selection) return;

  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);

  updateCost(saveSingle, saveMulti, saveThird);

  
  // console.log('save is:----',saveSingle,saveMulti,saveThird);


  setIndex11value({
    value1: saveSingle ? singleUserCost.min : 0,
    value2: saveSingle ? singleUserCost.max : 0,
    value3: saveMulti ? multiUserCost.min : 0,
    value4: saveMulti ? multiUserCost.max : 0,
    value5: saveThird ? thirdUserCost.min : 0,
    value6: saveThird ? thirdUserCost.max : 0,
    title1: saveSingle ? "Twillio SMS" : "",
    title2: saveMulti ? "Twillio SMS - Calendly" : "",
    title3: saveThird ? "Twillio SMS - Calendly - Google Map" : "",
  });
}, []);

const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
        <main
      className="pt5 black-80 body-background"
      style={{ margin: "auto" }}
    >
      <h2>How many other basic API integrations are you expecting?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User */}
        <div
          className="mw5 bg-white-twelve br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser? "#18d2e8" : "#fafafa",height:"350px" }}
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">20 - 30 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$1,100.00 - $1,650.00</div>
            </div>
          </div>
        </div>

        {/* Multi User */}
        <div
          className="mw5 bg-white-twelve br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: multiUser ? "#18d2e8" : "#fafafa",height:"350px" }}
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">40 - 60 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$2,200.00 - $3,300.00</div>
            </div>
          </div>
        </div>

        {/* Third User */}
        <div
          className="mw5 bg-white-twelve br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#fafafa",height:"350px" }}
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">50 - 80 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
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
      <div className="totals well container p-4">
        <h2 className="total-cost">
        <span className="footer-total-cost_title">Total Estimated Cost</span>: <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
        <b>Please note </b>: All cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>
    </main>
    
    </>
  );
};

export default PageElevenHealthCare;
