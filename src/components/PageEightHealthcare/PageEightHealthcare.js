import React, { useEffect, useState } from "react";
import user from "./Email-pass.png";
import users from "./google.png";
import usersthree from "./facebook.png";
import "./PageEight.css";
import { calculateOverallTotalCost } from "utils/OveralCost";

const PageEightHealthCare = ({ onButtonClick,totalCost,setTotalCost }) => {

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
      const updatedState = {
        singleUser: newValue,
        multiUser,
        thirdUser
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(newValue, multiUser, thirdUser);
      const pageIndex = 9;
      setIndex8value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCostRange.min : 0,
        value2: newValue ? singleUserCostRange.max : 0,
        index: newValue || multiUser || thirdUser ? pageIndex : 0,
        title1: newValue ? "How will users be signing up(Email/Password)" : ""
      }));
      return newValue;
    });
  };
  


  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      const updatedState = {
        singleUser,
        multiUser: newValue,
        thirdUser
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(singleUser, newValue, thirdUser);
      const pageIndex = 9;
      setIndex8value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCostRange.min : 0,
        value4: newValue ? multiUserCostRange.max : 0,
        index: singleUser || newValue || thirdUser ? pageIndex : 0,
        title2: newValue ? "How will users be signing up(Google Auth)" : ""
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
        thirdUser: newValue
      };
      sessionStorage.setItem('userSelection_pageNine', JSON.stringify(updatedState));
      updateCost(singleUser, multiUser, newValue);
      const pageIndex = 9;
      setIndex8value((prevState) => ({
        ...prevState,
        value5: newValue ? thirdUserCostRange.min : 0,
        value6: newValue ? thirdUserCostRange.max : 0,
        index: singleUser || multiUser || newValue ? pageIndex : 0,
        title3: newValue ? "How will users be signing up(Facebook)" : ""
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
      index: single || multi || third ? 8: 0,  // ✅ FIXED INDEX (PageNine)
      title1: single ? "How will users be signing up(Email/Password)" : "",
      title2: multi ? "How will users be signing up(Google Auth)" : "",
      title3: third ? "How will users be signing up(Facebook)" : ""
    };
    costData[7] = value; // ✅ store at index 8 (PageNine)
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

  const finalCost =
    totalMin === 0 && totalMax === 0
      ? "$0K"
      : `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`;

  setTotalCost(finalCost);

  // Save to session
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[7] = {
    ...index8value,
    value1: singleUser ? singleUserCostRange.min : 0,
    value2: singleUser ? singleUserCostRange.max : 0,
    value3: multiUser ? multiUserCostRange.min : 0,
    value4: multiUser ? multiUserCostRange.max : 0,
    value5: thirdUser ? thirdUserCostRange.min : 0,
    value6: thirdUser ? thirdUserCostRange.max : 0,
    index: singleUser || multiUser || thirdUser ? 9 : 0,
    title1: singleUser ? "How will users be signing up(Email/Password)" : "",
    title2: multiUser ? "How will users be signing up(Google Auth)" : "",
    title3: thirdUser ? "How will users be signing up(Facebook)" : ""
  };
  
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  onButtonClick("pagenine");
};


useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageNine'));
  
  if (!selection) return;
  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;
  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);
  updateCost(saveSingle, saveMulti, saveThird);
  setIndex8value({
    value1: saveSingle ? singleUserCostRange.min : 0,
    value2: saveSingle ? singleUserCostRange.max : 0,
    value3: saveMulti ? multiUserCostRange.min : 0,
    value4: saveMulti ? multiUserCostRange.max : 0,
    value5: saveThird ? thirdUserCostRange.min : 0,
    value6: saveThird ? thirdUserCostRange.max : 0,
    index: saveSingle || saveMulti || saveThird ? 9 : 0,
    title1: saveSingle ? "How will users be signing up(Email/Password)" : "",
    title2: saveMulti ? "How will users be signing up(Google Auth)" : "",
    title3: saveThird ? "How will users be signing up(Facebook)" : ""
  });

}, []);
   console.log('index8value is:-----',index8value);
  // Determine if the "Next" button should be enabled
  const isNextButtonEnabled = singleUser || multiUser || thirdUser;
  return (
    <>
      <main
      className="pt5 black-80 body-background"
      style={{ margin: "auto" }}
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
        onClick={() => onButtonClick("pageseven")}
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
      <div className="totals well container p-4">
        <h2 className="total-cost">
        <span className="footer-total-cost_title">Total Estimated Cost</span>:{" "}
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

export default PageEightHealthCare;
