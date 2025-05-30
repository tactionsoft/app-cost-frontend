import React, { useState, useEffect } from "react";
import user from "./desktop-icon.png";
import users from "./api-icon.png";
import usersthree from "./minus-sign.png";
import "./PageSix.css";

const PageSix = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);

  // Define cost ranges for each option
  const singleUserCost = { min: 8250, max: 13750 };
  const multiUserCost = { min: 8250, max: 13750 };
  const thirdUserCost = { min: 0, max: 0 };
  const [index5value, setIndex5value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",title3:"",answer:"" });
  // const [totalCost, setTotalCost] = useState("$0K");

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      const updatedState = {
        singleUser: newValue,
        multiUser,
        thirdUser: false
      };
      sessionStorage.setItem('userSelection_pageSix', JSON.stringify(updatedState));
      updateCost(newValue, multiUser, thirdUser);
      const pageIndex=6
      setIndex5value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue || prevState.index ? pageIndex : 0,
        title1:  newValue?"Which of the following web components do you need(Web App)":""
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
        thirdUser: false
      };
      sessionStorage.setItem('userSelection_pageSix', JSON.stringify(updatedState));
      updateCost(singleUser, newValue, thirdUser);
      const pageIndex=6
      setIndex5value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue || prevState.index ? pageIndex : 0, 
        title2:newValue?"Which of the following web components do you need(Backend API)":""
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
      sessionStorage.setItem("userSelection_pageSix",JSON.stringify({
        singleUser:false,
        multiUser:false,
        thirdUser:true
      }))
      updateCost(false, false, newValue);
      const pageIndex=6
      setIndex5value({
        value1: newValue ? thirdUserCost.min : 0,
        value2: newValue ? thirdUserCost.max : 0,
        value3: 0, value4: 0, value5: 0, value6: 0,
        title1: "", title2: "",
        index:newValue?pageIndex:0,
        title3:newValue?"Which of the following web components do you need(Web Components)":"",
        answer:newValue?"Which of the following web components do you need(None)":"",

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
      index: single || multi || third ? 6 : 0,
      title1: single ? "Which of the following web components do you need(Web App)" : "",
      title2: multi ? "Which of the following web components do you need(Backend API)" : "",
      title3: third ? "Which of the following web components do you need(None)" : ""
    };
  
    costData[4] = value; // ✅ Index 5 for PageSix
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  
    // Recalculate total
    let totalMin = 0;
    let totalMax = 0;
    for (let item of costData) {
      if (item) {
        totalMin += (item.value1 || 0) + (item.value3 || 0) + (item.value5 || 0);
        totalMax += (item.value2 || 0) + (item.value4 || 0) + (item.value6 || 0);
      }
    }
    const roundedMin = (totalMin / 1000) * 1000;
    const roundedMax = (totalMax / 1000) * 1000;
    setTotalCost(
      totalMin === 0 && totalMax === 0
        ? "$0K"
        : `$${roundedMin / 1000}K - $${roundedMax / 1000}K`
    );
    

    // setTotalCost(
    //   totalMin === 0 && totalMax === 0
    //     ? "$0K"
    //     : `$${Math.round(totalMin / 1000)}K - $${Math.round(totalMax / 1000)}K`
    // );
  };
  

  const isContinueButtonEnabled = singleUser || multiUser || thirdUser;

  const onClickContinue = () => {
    let totalMin = 0;
    let totalMax = 0;
    const roundedMin = (totalMin / 1000) * 1000;
    const roundedMax = (totalMax / 1000) * 1000;
    const finalCost = `$${roundedMin / 1000}K - $${roundedMax / 1000}K`;
  setTotalCost(finalCost)
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    costData[4] = index5value; // Store at index 4 (5th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  
    // Navigate to the next page
    onButtonClick("pageseven");
  };


  useEffect(() => {
    const selection = JSON.parse(sessionStorage.getItem('userSelection_pageSix'));
    if (!selection) return;
  
    const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;
    console.log({singleUser,multiUser,thirdUser})
    
    setSingleUser(saveSingle);
    setMultiUser(saveMulti);
    setThirdUser(saveThird);
  
    updateCost(saveSingle, saveMulti, saveThird);
  
    setIndex5value({
      value1: saveSingle ? singleUserCost.min : 0,
      value2: saveSingle ? singleUserCost.max : 0,
      value3: saveMulti ? multiUserCost.min : 0,
      value4: saveMulti ? multiUserCost.max : 0,
      value5: saveThird ? thirdUserCost.min : 0,
      value6: saveThird ? thirdUserCost.max : 0,
      title1: saveSingle ? "Which of the following web components do you need(Web App)" : "",
      title2: saveMulti ? "Which of the following web components do you need(Backend API)" : "",
      title3: saveThird ? "Which of the following web components do you need(None)" : ""
    });
  }, []);

  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Which of the following web components do you need?</h2>

      <div className="center ph4 selectionDiv">
        {/* Single User (Web App) */}
        <div
          className="mw5 bg-white-six br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5" ,height:"350px"}}
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
  
          <h1 className="f4 pl2 pr2">Web App</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            A Web App Written in ReactJS
          </p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">150 - 250 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$8,250.00 - $13,750.00</div>
            </div>
          </div>
        </div>

        {/* Multi User (Backend API) */}
        <div
          className="mw5 bg-white-six br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
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
  
          <h1 className="f4 pl2 pr2">Backend API</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            A Backend API Written in NodeJS
          </p>
          <div className="est-hrs">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">150 - 250 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label className="three-label">Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$8,250.00 - $13,750.00</div>
            </div>
          </div>
        </div>

        {/* Third User (None Option) */}
        <div
          className="mw5 bg-white-six br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
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
 
          <h1 className="f4 pl2 pr2">None</h1>
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
        onClick={() => onButtonClick("pagefive")}
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
          textDecoration: "none",
          maxWidth:"0px",
          backgroundColor: isContinueButtonEnabled ? "#08354e" : "#ddd",
          cursor: isContinueButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={onClickContinue}
        // onClick={() => onButtonClick("pageseven")}
        disabled={!isContinueButtonEnabled}
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

export default PageSix;
