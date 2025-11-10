import React, { useState, useEffect } from "react";
import user from "./plan.png";
import users from "./minus-sign.png";
import "./PageThree.css";
import {calculateOverallTotalCost} from '../../utils/OveralCost'

const PageTwoHealthcare = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  // const [totalCost, setTotalCost] = useState("$0K");
  const singleUserCost = { min: 1375, max: 2200 };
  // const multiUserCost = { min: 6600, max: 8800 };
  const multiUserCost = { min: 0, max: 0 };
  const isNextButtonEnabled = singleUser || multiUser ;

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
      }
      sessionStorage.setItem('userSelection_pageThree',JSON.stringify({singleUser:newValue,multiUser:false}))
      updateCost(newValue, false); // Ensure multiUser is false if selecting single
  
      return newValue;
    });
  };

const onClickMultiUser = () => {
  setMultiUser((prev) => {
    const newValue = !prev;
    if (newValue) {
      setSingleUser(false);
    }
    sessionStorage.setItem("userSelection_pageThree",JSON.stringify({singleUser:false,multiUser:newValue}))
    updateCost(false, newValue); // Ensure singleUser is false if selecting multi

    return newValue;
  });
};



const updateCost = (single, multi) => {
  let pageThreeMin = 0, pageThreeMax = 0;
  if (single) {
    pageThreeMin += singleUserCost.min;
    pageThreeMax += singleUserCost.max;
  }
  if (multi) {
    pageThreeMin += multiUserCost.min;
    pageThreeMax += multiUserCost.max;
  }

  // --- Get PageTwo cost from sessionStorage ---
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  let pageTwo = costData[0] || {}; // Assuming index 0 is Page Two
  let pageTwoMin = (pageTwo.value1 || 0) + (pageTwo.value3 || 0);
  let pageTwoMax = (pageTwo.value2 || 0) + (pageTwo.value4 || 0);

  // --- Total of Page Two + Page Three ---
  let totalMin = pageTwoMin + pageThreeMin;
  let totalMax = pageTwoMax + pageThreeMax;

  const formattedTotal = totalMin === 0 && totalMax === 0
    ? "$0K"
    : `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`;

  setTotalCost(formattedTotal);
};


const calculateTotalCost = () => {
  let totalMin = 0;
  let totalMax = 0;

  if (singleUser) {
    totalMin += singleUserCost.min;
    totalMax += singleUserCost.max;
  }
  if (multiUser) {
    totalMin += multiUserCost.min;
    totalMax += multiUserCost.max;
  }

  const formattedMin = totalMin / 1000;
  const formattedMax = totalMax / 1000;

  const finalCost = (totalMin === 0 && totalMax === 0)
  
    ? "$0K"
    : `$${(formattedMin)}K - $${(formattedMax)}K`;

  // --- Save Page Three data to sessionStorage ---
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[1] = {
    value1: 0,
    value2: 0,
    value3: totalMin,
    value4: totalMax,
    index: 3,
    title2: singleUser?"Do you have a finished UX/UI design(Yes)":multiUser?"Do you have a finished UX/UI design(No)":"",
    // answer: singleUser ? "Yes" : multiUser ? "No" : ""
  };
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  // --- Call combined cost updater ---
  const updatedCost = calculateOverallTotalCost(); // Or call updateCost(singleUser, multiUser)
  setTotalCost(updatedCost);
  onButtonClick("pagethree");
  return finalCost;
};


useEffect(()=>{
const selection=JSON.parse(sessionStorage.getItem("userSelection_pageThree"))
if(!selection) return
if(selection){
  const { singleUser: savedSingle, multiUser: savedMulti } = selection;
  if(savedSingle){
    setSingleUser(true)
    setMultiUser(false)
    updateCost(true,false)
  }
  if(savedMulti){
    setSingleUser(false)
    setMultiUser(true)
    updateCost(false,true)

  }
}
},[]);



return (
    <>
        <main
      className="pt5 black-80 body-background"
      style={{ margin: "auto" }}
    >
      <h2 className="title-header">Do you have a finished UX/UI design?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white-three br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one page_one"
          style={{
            borderColor: singleUser ? "#18d2e8" : "#fafafa",height:"330px"
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">25 - 40 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$1,375.00 - $2,200.00</div>
            </div>
          </div>
        </div>
        {/* Multi User Option */}
        <div
          className="mw5 bg-white-three br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one page_one"
          style={{
            borderColor: multiUser ? "#18d2e8" : "#fafafa",height:"330px"
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
          {/* <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">120 - 160 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$6,600.00 - $8,800.00</div>
            </div>
          </div> */}
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
        onClick={() => onButtonClick("pageone")}
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
<div className="totals well col container p-4">
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

export default PageTwoHealthcare;
