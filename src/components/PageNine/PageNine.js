import React, { useEffect, useState } from "react";
import user from "./Email-pass.png";
import users from "./google.png";
import usersthree from "./facebook.png";
import "./PageNine.css";
import { calculateOverallTotalCost } from "utils/OveralCost";

const PageNine = ({ onButtonClick,totalCost,setTotalCost }) => {
  console.log('total cost is:-',totalCost);
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [index8value, setIndex8value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",title3:"" });


  // Define the cost range for each user type (min and max)
  const singleUserCostRange = { min: 550, max: 1375 };
  const multiUserCostRange = { min: 550, max: 1375 };
  const thirdUserCostRange = { min: 550, max: 1375 };

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      const updatedState = {
        singleUser:newValue,
        multiUser,
        thirdUser
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(newValue, multiUser, thirdUser);
       const pageIndex=9;
      setIndex8value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCostRange.min : 0,
        value2: newValue ? singleUserCostRange.max : 0,
        index: newValue?pageIndex:0,
        title1: newValue?"Email/Password":""
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
        multiUser: newValue,
        thirdUser
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(singleUser, newValue, thirdUser);
      const pageIndex=9;
      setIndex8value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCostRange.min : 0,
        value4: newValue ? multiUserCostRange.max : 0,
        index: newValue?pageIndex:0,
        title2: newValue?"Google Auth":""
      }));
      return newValue;
    });
  };


  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;   
      const updatedState = {
        singleUser,
        multiUser,
        thirdUser:newValue
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(singleUser, multiUser, newValue);
      const pageIndex=9;
      setIndex8value((prevState)=>({
        ...prevState,
        value5: newValue ? thirdUserCostRange.min : 0,
        value6: newValue ? thirdUserCostRange.max : 0,
        index:  newValue?pageIndex:0,
        title3: newValue?"Facebook":""
      }));
      return newValue;
    });
  };


  const updateCost = (single, multi, third) => {
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    const value = {
      value1: single ? singleUserCostRange.min : 0,
      value2: single ? singleUserCostRange.max : 0,
      value3: multi ? multiUserCostRange.min : 0,
      value4: multi ? multiUserCostRange.max : 0,
      value5: third ? thirdUserCostRange.min : 0,
      value6: third ? thirdUserCostRange.max : 0,
      index: single || multi || third ? 8 : 0,  // ✅ FIXED INDEX (PageNine)
      title1: single ? "Email/Password" : "",
      title2: multi ? "Google Auth" : "",
      title3: third ? "Facebook" : ""
    };
  
    costData[7] = value; // ✅ store at index 8 (PageNine)
    console.log('value is:-',value);
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
    // Recalculate total cost
    let totalMin = 0;
    let totalMax = 0;
    for (let item of costData) {
      console.log('items are:-',item)
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

    // Add cost ranges for selected options
    if (singleUser) {
      totalMin += singleUserCostRange.min;
      totalMax += singleUserCostRange.max;
    }
    if (multiUser) {
      console.log('multiuser',multiUser);
      totalMin += multiUserCostRange.min;
      totalMax += multiUserCostRange.max;
    }
    if (thirdUser) {
      console.log('third User is:-',thirdUser);
      totalMin += thirdUserCostRange.min;
      totalMax += thirdUserCostRange.max;
    }

    // If no user is selected, show $0K
    if (totalMin === 0 && totalMax === 0) {
      return "$0K";
    }

    // Format the total cost in "K" format with two decimal places
     const formattedMin = (totalMin / 1000);
     const formattedMax = (totalMax / 1000);

     const finalCost = `$${formattedMin}K - $${formattedMax}K`;
     console.log('finalCost',finalCost);
     setTotalCost(finalCost);
     // Store final cost in session storage under a unique index
     let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
     costData[7] = index8value;
     console.log('costData is:-',costData[7]);
     const getData=sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('getData is:-',getData);
     onButtonClick("pageten");
     return finalCost;
};

useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageNine'));
  console.log('selection is:-',selection);
  if (!selection) return;
  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);
  console.log('saveThird is:-',saveThird);
  updateCost(saveSingle, saveMulti, saveThird);
  setIndex8value({
    value1: saveSingle ? singleUserCostRange.min : 0,
    value2: saveSingle ? singleUserCostRange.max : 0,
    value3: saveMulti ? multiUserCostRange.min : 0,
    value4: saveMulti ? multiUserCostRange.max : 0,
    value5: saveThird ? thirdUserCostRange.min : 0,
    value6: saveThird ? thirdUserCostRange.max : 0,
    title1: saveSingle ? "Web App" : "",
    title2: saveMulti ? "Google Auth" : "",
    title3: saveThird ? "Facebook" : ""
  });
}, []);

  // Determine if the "Next" button should be enabled
  const isNextButtonEnabled = singleUser || multiUser || thirdUser;
  return (
    <>
      <main
      className="pt5 black-80 body-background"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>How will users be signing up?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User */}
        <div
          className="mw5 bg-white-nine br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#fafafa",height:"350px" }}
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
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$550.00 - $1,375.00</div>
            </div>
          </div>
        </div>

        {/* Multi User */}
        <div
          className="mw5 bg-white-nine br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
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
   
          <h1 className="f4 pl2 pr2">Google Auth</h1>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$550.00 - $1,375.00</div>
            </div>
          </div>
        </div>

        {/* Third User */}
        <div
          className="mw5 bg-white-nine br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
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
 
          <h1 className="f4 pl2 pr2">Facebook</h1>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">10 - 25 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
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
      <div className="totals well container p-5">
        <h2 className="total-cost">
          Total Estimated Cost:{" "}
          {/* <span id="total-cost">{formatCostRange(totalMin, totalMax)}</span> */}
          <span id="total-cost">{totalCost}</span>
        </h2>
        <p className="disclaimer">
          Please note :  All cost estimates are intended to be indicative of
          development costs and timescales only and are exclusive of all hosting
          costs, paid services or purchased assets of any kind. All prices are in
          USD and inclusive of sales tax.
        </p>
      </div>
    </main>
    
    </>
  
  );
};

export default PageNine;
