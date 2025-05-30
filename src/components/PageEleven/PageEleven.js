import React, { useState, useEffect } from "react";
import user from "./heart-rate.png";
import users from "./deviceSensors.png";
import usersthree from "./minus-sign.png";
import "./PageEleven.css";

const PageEleven = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [index10value, setIndex10value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",title3:"",answer:"" });
  // const [totalCost, setTotalCost] = useState("$0K");

  // Define the cost ranges for each user type
  const singleUserCost = { min: 2200, max: 3300 };
  const multiUserCost = { min: 1650, max: 2750 };
  const thirdUserCost = { min: 0, max: 0 }; // No cost for third user

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      const updatedState = {
        singleUser:newValue,
        multiUser,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageEleven', JSON.stringify(updatedState));
      updateCost(newValue, multiUser, thirdUser);
      const pageIndex=11;
      setIndex10value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index:  newValue? pageIndex:0,
        title1: newValue?"Which of the following integrations do you need(Health Data)":""
      }));
  
      return newValue;
    });
  };


  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      const updatedState = {
        singleUser,
        multiUser:newValue,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageEleven', JSON.stringify(updatedState));
      updateCost(singleUser, newValue, thirdUser);
      const pageIndex=11;
      setIndex10value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue? pageIndex:0,
        title2: newValue?"Which of the following integrations do you need":"",
      }));
  
      return newValue;
    });
  };


  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      if(newValue){
        setSingleUser(false);
        setMultiUser(false);
      }
      const updatedState = {
        singleUser:false,
        multiUser:false,
        thirdUser:newValue
      };
      sessionStorage.setItem('userSelection_pageEleven', JSON.stringify(updatedState));
      const pageIndex=11;
      updateCost(false, false, newValue);
      setIndex10value({
         value1: 0, // Ensure previous selections are reset
        value2: 0,
        value3: 0,
        value4: 0,
        value5: newValue ? thirdUserCost.min : 0,
        value6: newValue ? thirdUserCost.max : 0,
        index: newValue?pageIndex:0,
        title3: newValue?"Which of the following integrations do you need":"",
        answer:newValue?"No":""
      });
      return newValue;
    });
  };


  // const updateCost = (single, multi, third) => {
  //   let totalMin = 0, totalMax = 0;
  //   if (single) { totalMin += singleUserCost.min; totalMax += singleUserCost.max; }
  //   if (multi) { totalMin += multiUserCost.min; totalMax += multiUserCost.max; }
  //   if (third) { totalMin += thirdUserCost.min; totalMax += thirdUserCost.max; }
  //   setTotalCost(totalMin === 0 && totalMax === 0 ? "$0K" : `$${Math.round((totalMin / 1000).toFixed(2))}K - $${Math.round((totalMax / 1000).toFixed(2))}K`);
  // };


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
      title1: single ? "Which of the following integrations do you need(Health Data)" : "",
      title2: multi ? "Which of the following integrations do you need(Device Data)" : "",
      title3: third ? "Which of the following integrations do you need" : "",
      answer:third?"No":""
    };
  
    costData[9] = value; // ✅ store at index 8 (PageNine)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  
    // Recalculate total cost
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


const calculateTotalCostRange = () => {
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

  const formattedMin = (totalMin / 1000);
  const formattedMax = (totalMax / 1000);
  const finalCost = totalMin === 0 && totalMax === 0 ? "$0K" : `$${formattedMin}K - $${formattedMax}K`;

  setTotalCost(finalCost);

  // Retrieve existing data
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

  // Ensure costData has at least 6 indices without affecting existing values
  costData = [...costData];

  // Only update index 5 if it hasn't been set already
  if (!costData[9]) {
    costData[9] = {}; // Initialize index 5 if it's undefined
  }

  // Preserve existing values in costData[5] and update only necessary fields
  costData[9] = { ...costData[9], ...index10value };

  // Save updated data
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));

  onButtonClick("pagetwelve");
};
useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageEleven'));
  if (!selection) return;

  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);

  updateCost(saveSingle, saveMulti, saveThird);

  setIndex10value({
    value1: saveSingle ? singleUserCost.min : 0,
    value2: saveSingle ? singleUserCost.max : 0,
    value3: saveMulti ? multiUserCost.min : 0,
    value4: saveMulti ? multiUserCost.max : 0,
    value5: saveThird ? thirdUserCost.min : 0,
    value6: saveThird ? thirdUserCost.max : 0,
    title1: saveSingle ? "Health Data" : "",
    title2: saveMulti ? "Device Data" : "",
    title3: saveThird ? "Integration Needed" : "",
    answer:saveThird?"No":"",
  });
}, []);
  const isContinueButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
     <main className="pt5 black-80" style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}>
      <h2>Which of the following integrations do you need?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white-eleven br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
          onClick={onClickSingleUser}
        >
           <div style={{display:"flex",justifyContent:"center"}}>
           <img src={user} className="h2 w2" title="single user icon" alt="user-icon" />
           </div>
         
          <h1 className="f4 pl2 pr2">Health Data</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Healthkit or Google Fit integration</p>
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

        {/* Multi User Option */}
        <div
          className="mw5 bg-white-eleven br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
          onClick={onClickMultiUser}
        >
              <div style={{display:"flex",justifyContent:"center"}}>
              <img src={users} className="h2 w2" title="multi user icon" alt="users-icon" />
              </div>
        
          <h1 className="f4 pl2 pr2">Device Data</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">Syncing with firmware using Bluetooth low energy</p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">30 - 50 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$1,650.00 - $2,750.00</div>
            </div>
          </div>
        </div>

        {/* Third User Option */}
        <div
          className="mw5 bg-white-eleven br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
          onClick={onClickThirdUser}
        >
            <div style={{display:"flex",justifyContent:"center"}}>
            <img src={usersthree} className="h2 w2" title="third user icon" alt="users-icon" />
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
        onClick={() => onButtonClick("pageten")}
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
          outline: "none",
          maxWidth:"0px",
          textDecoration: "none",
          backgroundColor: isContinueButtonEnabled ? "#08354e" : "#ddd",
          cursor: isContinueButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCostRange}
        disabled={!isContinueButtonEnabled}
      />

      {/* Total Cost */}

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

export default PageEleven;
