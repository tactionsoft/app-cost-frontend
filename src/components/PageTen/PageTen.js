import React, { useEffect, useState } from "react";
import user from "./multiTenantAccount.png";
import users from "./rocket.png";
import usersthree from "./minus-sign.png";
import "./PageTen.css";

const PageTen = ({ onButtonClick,totalCost,setTotalCost }) => {
  console.log('total cost is:----------',totalCost);
  console.log('totalCost pageTen is :-',totalCost);
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const singleUserCost = { min: 5500, max: 8250 };
  const multiUserCost = { min: 16500, max: 27500 };
  const thirdUserCost = { min: 0, max: 0 };
  const [index9value, setIndex9value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",title3:"",answer:"" });
  
  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if(newValue){
        setMultiUser(false);
        setThirdUser(false);
      }; // Deselect ThirdUser if selected
      const updatedState = {
        singleUser:newValue,
        multiUser:false,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageTen', JSON.stringify(updatedState));
      updateCost(newValue);
      const pageIndex=10;
      setIndex9value({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue?pageIndex:0,
        title1: newValue?"Is artificial intelligence (AI) part of your roadmap(Yes, to some extent)":""
      });
      return newValue;
    });
  };


  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if(newValue){
        setThirdUser(false);
        setSingleUser(false);
      } // Deselect ThirdUser if selected
      const updatedState = {
        singleUser:false,
        multiUser:newValue,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageTen', JSON.stringify(updatedState));
      const pageIndex=10;
      updateCost( false, newValue, false);
      setIndex9value( {
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue?pageIndex:0,
        title2: newValue?"Is artificial intelligence (AI) part of your roadmap(Yes to quite an extent)":""
        
      });
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
      sessionStorage.setItem('userSelection_pageTen', JSON.stringify(updatedState));
      updateCost(false, false, newValue);
      const pageIndex=10;
      setIndex9value({
        value1: 0, // Ensure previous selections are reset
        value2: 0,
        value3: 0,
        value4: 0,
        value5: newValue ? thirdUserCost.min : 0,
        value6: newValue ? thirdUserCost.max : 0,
        index : newValue?  pageIndex:0,
        title3 : newValue?"Is artificial intelligence (AI) part of your roadmap(No)":"",
        // answer:newValue?"No":"",
      });
  
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
      index: single || multi || third ? 8 : 0,  // ✅ FIXED INDEX (PageNine)
      title1: single ? "Is artificial intelligence (AI) part of your roadmap(Yes, to some extent)" : "",
      title2: multi ? "Is artificial intelligence (AI) part of your roadmap(Yes to quite an extent)" : "",
      title3: third ? "Is artificial intelligence (AI) part of your roadmap(No)" : "",
      // answer:third?"No":""
    };
  
    costData[8] = value; // ✅ store at index 8 (PageNine)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
    // Recalculate total cost
    let totalMin = 0;
    let totalMax = 0;
    for (let item of costData) {
      console.log('item is :-',item);
      if (item) {
        totalMin += (item.value1 || 0) + (item.value3 || 0) + (item.value5 || 0);
        totalMax += (item.value2 || 0) + (item.value4 || 0) + (item.value6 || 0);
      }
    }
  console.log('total cost is:----------',totalCost);
    setTotalCost(
      totalMin === 0 && totalMax === 0
        ? "$0K"
        : `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`
    );
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
  if (multiUser) {
    totalMin += multiUserCost.min;
    totalMax += multiUserCost.max;
  }

  const formattedMin = (totalMin / 1000);
  const formattedMax = (totalMax / 1000);
  const finalCost = totalMin === 0 && totalMax === 0 ? "$0K" : `$${formattedMin}K - $${formattedMax}K`;
  setTotalCost(finalCost);

  // Retrieve existing data
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

  // Ensure costData has at least 6 indices without affecting existing values
  costData = [...costData];

  // Only update index 5 if it hasn't been set already
  if (!costData[8]) {
    costData[8] = {}; // Initialize index 5 if it's undefined
  }

  // Preserve existing values in costData[5] and update only necessary fields
  costData[8] = { ...costData[8], ...index9value };

  // Save updated data
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  onButtonClick("pageeleven");
};
// useEffect(() => {
//   const selection = JSON.parse(sessionStorage.getItem('userSelection_pageTen'));
//   if (!selection) return;
//   const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

//   setSingleUser(saveSingle);
//   setMultiUser(saveMulti);
//   setThirdUser(saveThird);
//   updateCost(saveSingle, saveMulti, saveThird);

//   setIndex9value({
//     value1: saveSingle ? singleUserCost.min : 0,
//     value2: saveSingle ? singleUserCost.max : 0,
//     value3: saveMulti ? multiUserCost.min : 0,
//     value4: saveMulti ? multiUserCost.max : 0,
//     value5: saveThird ? thirdUserCost.min : 0,
//     value6: saveThird ? thirdUserCost.max : 0,
//     title1: saveSingle ? "Yes, to some extent" : "",
//     title2: saveMulti ? "Yes to quite an extent" : "",
//     title3: saveThird ? "Artificial Intelligence-Roadmap" : "",
//     answer:saveThird?"No":"",
//   });
// }, []);

useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageTen'));
  if (!selection) return;

  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

  // Set visual states
  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);

  // Use values directly instead of relying on (possibly stale) state
  updateCost(saveSingle, saveMulti, saveThird);

  const pageIndex = 10;
  setIndex9value({
    value1: saveSingle ? singleUserCost.min : 0,
    value2: saveSingle ? singleUserCost.max : 0,
    value3: saveMulti ? multiUserCost.min : 0,
    value4: saveMulti ? multiUserCost.max : 0,
    value5: saveThird ? thirdUserCost.min : 0,
    value6: saveThird ? thirdUserCost.max : 0,
    index: saveSingle || saveMulti || saveThird ? pageIndex : 0,
    title1: saveSingle ? "Yes, to some extent" : "",
    title2: saveMulti ? "Yes to quite an extent" : "",
    title3: saveThird ? "Artificial Intelligence-Roadmap(No)" : "",
    // answer: saveThird ? "No" : "",
  });
}, []);



const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
        <main className="pt5 black-80 body-background" style={{ margin: "auto" }}>
      <h2>Is artificial intelligence (AI) part of your roadmap?</h2>

      <div className="center ph4 selectionDiv">
        <div className="mw5 bg-white-ten br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#fafafa",height:"350px" }}
          // onClick={() => handleClick("singleUser")}
          onClick={onClickSingleUser}
          >
              <div style={{display:"flex",justifyContent:"center"}}>
              <img src={user} className="h2 w2" title="single user icon" alt="user-icon" />

              </div>
   
          <h1 className="f4 pl2 pr2">Yes, to some extent</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Machine learning research and prototyping</p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">100 - 150 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$5,500.00 - $8,250.00</div>
            </div>
          </div>
        </div>

        <div
          className="mw5 bg-white-ten br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: multiUser ? "#18d2e8" : "#fafafa",height:"350px" }}
          onClick={onClickMultiUser}
        >
              <div style={{display:"flex",justifyContent:"center"}}>
              <img src={users} className="h2 w2" title="multi user icon" alt="users-icon" />
              </div>
    
          <h1 className="f4 pl2 pr2">Yes, to quite an extent</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">.</p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">300 - 500 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$16,500.00 - $27,500.00</div>
            </div>
          </div>
        </div>

        <div
          className="mw5 bg-white-ten br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#fafafa",height:"350px" }}
          onClick={onClickThirdUser}
        >
            <div style={{display:"flex",justifyContent:"center"}}>
            <img src={usersthree} className="h2 w2" title="third user icon" alt="users-icon" />
            </div>
          
          <h1 className="f4 pl2 pr2">No</h1>
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
        onClick={() => onButtonClick("pagenine")}
      />

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
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />

<div className="totals well container p-4">
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

export default PageTen;
