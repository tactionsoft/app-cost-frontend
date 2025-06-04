import React, { useEffect, useState } from "react";
import user from "./heart-rate.png";
import users from "./minus-sign.png";
import "./PageFour.css";

const PageFour = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  // const [totalCost, setTotalCost] = useState("$0K");
  const singleUserCost = { min: 5500, max: 6875 };
  const multiUserCost = { min: 0, max: 0 };
  const [index3value, setIndex3value] = useState({
    value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",answer:""  });
  const isNextButtonEnabled = singleUser || multiUser ;

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
      }
      sessionStorage.setItem('userSelection_pageFour',JSON.stringify({
        singleUser:newValue,
        multiUser:false
      }))
      updateCost(newValue, false); // Ensure multiUser is false if selecting single
  const pageIndex=4;
      setIndex3value(() => ({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        value3: 0, // Reset multi-user values
        value4: 0,
        index:newValue?pageIndex:0,
        title1:newValue?"Do you need HIPAA Compliance or Bank-Level Encryption(Yes)":"",
        // answer:newValue?"Yes":""
      }));
  
      return newValue;
    });
  };

const onClickMultiUser = () => {
  setMultiUser((prev) => {
    const newValue = !prev;
    if (newValue) {
      setSingleUser(false);
    }
    sessionStorage.setItem('userSelection_pageFour',JSON.stringify({
      singleUser:false,
      multiUser:newValue
    }))
    updateCost(false, newValue); // Ensure singleUser is false if selecting multi
   const pagIndex=4;
    setIndex3value(() => ({
      value1: 0, // Reset single-user values
      value2: 0,
      value3: newValue ? multiUserCost.min : 0,
      value4: newValue ? multiUserCost.max : 0,
      index:  newValue?pagIndex:0,
      title2:newValue?"Do you need HIPAA Compliance or Bank-Level Encryption(No)":"",
      // answer:newValue?"No":""
    }));

    return newValue;
  });
};

// const updateCost = (single, multi) => {
//   let totalMin = 0, totalMax = 0;
//   if (single) {
//     totalMin += singleUserCost.min;
//     totalMax += singleUserCost.max;
//   }
//   if (multi) {
//     totalMin += multiUserCost.min;
//     totalMax += multiUserCost.max;
//   }
  
//   setTotalCost(
//     totalMin === 0 && totalMax === 0
//       ? "$0K"
//       : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`
//   );
// };

const updateCost = (single, multi) => {
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  const value = {
    value1: single ? singleUserCost.min : 0,
    value2: single ? singleUserCost.max : 0,
    value3: multi ? multiUserCost.min : 0,
    value4: multi ? multiUserCost.max : 0,
    index: single || multi ? 4 : 0,
    title1: single ? "Do you need HIPAA Compliance or Bank-Level Encryption(Yes)" : "",
    title2: multi ? "Do you need HIPAA Compliance or Bank-Level Encryption(No)" : "",
    // answer: single ? "Yes" : multi ? "No" : "",
  };

  // Always update index 3 for Page Four
  costData[2] = value;

  const costDatas=sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  

  // Recalculate total from all pages
  let totalMin = 0;
  let totalMax = 0;
  for (let item of costData) {
    if (item) {
      totalMin += (item.value1 || 0) + (item.value3 || 0);
      totalMax += (item.value2 || 0) + (item.value4 || 0);
    }
  }

  setTotalCost(
    totalMin === 0 && totalMax === 0
      ? "$0K"
      : `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`
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
  const roundedMin = (totalMin / 1000) * 1000;
  const roundedMax = (totalMax / 1000) * 1000;
  const finalCost = `$${roundedMin / 1000}K - $${roundedMax / 1000}K`;
   setTotalCost(finalCost)
  // Store final cost in session storage under a unique index
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[2] = index3value; // Store at index 3 (4th position)
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));

  // Always navigate to page five, even if cost is $0K
  onButtonClick("pagefive");
  return totalMin === 0 && totalMax === 0 ? "$0K" : `$${(totalMin / 1000).toFixed(2)}K - $${(totalMax / 1000).toFixed(2)}K`;
};

useEffect(()=>{
const selection=JSON.parse(sessionStorage.getItem("userSelection_pageFour"));
if(!selection) return;
const{singleUser:savedSingle,multiUser:savedMulti}=selection;
if(savedSingle){
  setSingleUser(true)
  setMultiUser(false)
  updateCost(true,false)
  setIndex3value({
    value1:singleUserCost.min,
    value2:singleUserCost.max,
    value3:0,
    value4:0,
    value5:0,
    value6:0,
    title1:"Do you need HIPAA Compliance or Bank-Level Encryption(Yes)",
    title2:"",
    // answer:"Yes"
  })
}else if(savedMulti){
  setMultiUser(true)
  setSingleUser(false)
  updateCost(false,true)
  setIndex3value({
    value1:0,
    value2:0,
    value3:multiUserCost.min,
    value4:multiUserCost.max,
    value5:0,
    value6:0,
    title1:"",
    title2:"Do you need HIPAA Compliance or Bank-Level Encryption(No)",
    // answer:"No"
  })
}
},[])


  return (
    <>
        <main
      className="pt5 black-80 body-background"
      style={{ margin: "auto" }}
    >
      <h2>Do you need HIPAA Compliance or Bank-Level Encryption?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white-four br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one page_one"
          style={{
            borderColor: singleUser ? "#18d2e8" : "#fafafa",height:"350px"
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">100 - 125 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$5,500.00 - $6,875.00</div>
            </div>
          </div>
        </div>
        {/* Multi User Option */}
        <div
          className="mw5 bg-white-four br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{
            borderColor: multiUser ? "#18d2e8" : "#fafafa",height:"350px"}}
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
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
          opacity: isNextButtonEnabled ? 1 : 0.6,
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />
<div className="totals well container p-5">
        <h2 className="total-cost">
          Total Estimated Cost: <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
          Please note : All cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>

    </main>
    
    </>

  );
};

export default PageFour;
