import React, { useEffect, useState } from "react";
import user from "./subscription.png";
import users from "./minus-sign.png";
import "./PageEight.css";

const PageEight = ({ onButtonClick,totalCost,setTotalCost }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);

  const singleUserCost = { min: 1650, max:2750  };
  const thirdUserCost = { min: 0, max: 0 };
  // const [totalCost, setTotalCost] = useState("$0K");
  const [index7value, setIndex7value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",answer:"" });
  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      sessionStorage.setItem("userSelection_pageEight", JSON.stringify({singleUser: newValue,thirdUser: false}));
      updateCost(newValue);
      const pageIndex=8;
      setIndex7value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue?pageIndex:0,
        title1: newValue?"Will there be recurring subscriptions(Yes) ":"",
        title2:"",
        // answer:newValue?"Yes":""  
      }));
  
      return newValue;
    });
  };

 
  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
      }
     const costData= sessionStorage.setItem("userSelection_pageEight", JSON.stringify({singleUser: false,thirdUser: true}));
    
      updateCost(false, newValue);
      const pageIndex=8;
      setIndex7value({
        value1: newValue ? thirdUserCost.min : 0,
        value2: newValue ? thirdUserCost.max : 0,
        value3: 0, value4: 0, value5: 0, value6: 0,
        index: newValue?pageIndex:0,
        title2: newValue?"Will there be recurring subscriptions(No)":"",
        title1:"",
        // answer:newValue?"No":""
      });
  
      return newValue;
    });
  };

  const updateCost = (single, multi, third) => {
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    const value = {
      value1: single ? singleUserCost.min : 0,
      value2: single ? singleUserCost.max : 0,
      value3:0,
      value4:0,
      value5: third ? thirdUserCost.min : 0,
      value6: third ? thirdUserCost.max : 0,
      index: single || multi || third ? 8 : 0, // ✅ PageSeven
      title1: single ? "Will there be recurring subscriptions(Yes)" : "",
      title2: multi ? "Will there be recurring subscriptions(No)" : "",
      // answer: single ? "Yes" : multi ? "No" : "", // ✅ Answer
    };
  
    costData[6] = value; // ✅ PageSeven = index 6
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

  const formattedMin = (totalMin / 1000);
  const formattedMax = (totalMax / 1000);
  const finalCost = totalMin === 0 && totalMax === 0 ? "$0K" : `$${formattedMin}K - $${formattedMax}K`;
  setTotalCost(finalCost);
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData=[...costData]
  // costData[6] = index7value; // Store in session storage
  costData[6]={
    ...costData[6],
    ...index7value,
    value1:costData[6]?.value1||0,
    value2:costData[6]?.value2||0,
    value3:costData[6]?.value3||0,
    value4:costData[6]?.value4||0,
    value5:costData[6]?.value5||0,
    value6:costData[6]?.value6||0
  }
  costData[6]={...index7value,...costData[6]}
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
  // **Navigate to next page regardless of selection**
  onButtonClick("pagenine");  
};

useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem("userSelection_pageEight"));
  if(!selection) return;
  if (selection) {
    const { singleUser: savedSingle, thirdUser: savedThird } = selection;
    if (savedSingle) {
      setSingleUser(true);
      setThirdUser(false);
      updateCost(true, false);
      setIndex7value({
        value1: singleUserCost.min,
        value2: singleUserCost.max,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
        index: 8,
        title1: "",
        title2: "Will there be recurring subscriptions(No)",
        // answer: "No"
      });
    } else if (savedThird) {
      setThirdUser(true);
      setSingleUser(false);
      updateCost(false, true);
      setIndex7value({
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: thirdUserCost.min,
        value6: thirdUserCost.max,
        index: 8,
        title1: "",
        title2: "Will there be recurring subscriptions(No)",
        // answer: "No"
      });
    }
  }
}, []);
const isContinueButtonEnabled = singleUser || thirdUser;

  return (
 <>
    <main
      className="pt5 black-80 body-background"
      style={{ margin: "auto" }}
    >
      <h2>Will there be recurring subscriptions?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white-eight br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one page_one"
          style={{ borderColor:  singleUser ? "#18d2e8" : "#fafafa",height:"350px" }}
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
        {/* Multi User Option */}
        <div
          className="mw5 bg-white-eight br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-one"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#fafafa",height:"350px" }}
          onClick={onClickThirdUser}
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
          maxWidth:"0px",
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
          marginRight:"8px",
          maxWidth:"0px",
          outline: "none",
          textDecoration: "none",
          backgroundColor: isContinueButtonEnabled ? "#08354e" : "#ddd",
          cursor: isContinueButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={calculateTotalCost}
        disabled={!isContinueButtonEnabled}
      />

      {/* Display Total Cost */}
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

export default PageEight;
