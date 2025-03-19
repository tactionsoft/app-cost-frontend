import React, { useEffect, useState } from "react";
import user from "./multiTenantAccount.png";
import users from "./rocket.png";
import usersthree from "./minus-sign.png";
import "./PageTen.css";

const PageTen = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");

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
      updateCost(newValue);
      const pageIndex=10;
      setIndex9value({
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue?pageIndex:0,
        title1: newValue?"Yes, to some extent":""
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
      const pageIndex=10;
      updateCost( false, newValue, false);
      setIndex9value( {
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
        index: newValue?pageIndex:0,
        title2: newValue?"Yes to quite an extent":""
        
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
        title3 : newValue?"Artificial Intelligence-Roadmap":"",
        answer:newValue?"No":"",
      });
  
      return newValue;
    });
  };
  console.log('indexValue9 is:-',index9value);
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

  if (singleUser) {
    totalMin += singleUserCost.min;
    totalMax += singleUserCost.max;
  }
  if (thirdUser) {
    totalMin += thirdUserCost.min;
    totalMax += thirdUserCost.max;
  }

  const formattedMin = (totalMin / 1000).toFixed(2);
  const formattedMax = (totalMax / 1000).toFixed(2);
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
  console.log("Updated costData:", costData);

  onButtonClick("pageeleven");
};

const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <>
        <main className="pt5 black-80" style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}>
      <h2>Is artificial intelligence (AI) part of your roadmap?</h2>

      <div className="center ph4 selectionDiv">
        <div className="mw5 bg-white-ten br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four page_one"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
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
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
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
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"350px" }}
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
        value="Continue"
        onClick={calculateTotalCost}
        disabled={!isNextButtonEnabled}
      />

   
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

export default PageTen;
