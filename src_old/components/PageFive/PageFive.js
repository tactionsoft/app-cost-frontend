import React, { useState, useEffect } from "react";
import user from "./ios-icon.png";
import users from "./android-icon.png";
import usersthree from "./react-icon.png";
import "./PageFive.css";

const PageFive = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  const [totalCost, setTotalCost] = useState("$0K");

  // Define the cost ranges
  const singleUserCost = { min: 8250, max: 13750 };
  const multiUserCost = { min: 8250, max: 13750 };
  const thirdUserCost = { min: 13750, max: 22000 };

  const [index4value, setIndex4value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0 });


  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(newValue, multiUser);
  
      setIndex4value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
      }));
  
      return newValue;
    });
  };

console.log('index4Value',index4value)




  const onClickMultiUser = () => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(singleUser, newValue, false);
  
      setIndex4value((prevState) => ({
        ...prevState,
        value3: newValue ? multiUserCost.min : 0,
        value4: newValue ? multiUserCost.max : 0,
      }));
  
      return newValue;
    });
  };
console.log('index4 update is:-',index4value)
  const onClickThirdUser = () => {
    setThirdUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setMultiUser(false);
      }
      updateCost(false, false, newValue);
      setIndex4value({
        value1: newValue ? thirdUserCost.min : 0,
        value2: newValue ? thirdUserCost.max : 0,
        value3: 0, value4: 0, value5: 0, value6: 0,
      });
      return newValue;
    });
  };



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

    // Add cost ranges for selected options
    if (singleUser) {
      totalMin += singleUserCost.min;
      totalMax += singleUserCost.max;
    }
    if (multiUser) {
      totalMin += multiUserCost.min;
      totalMax += multiUserCost.max;
    }
    if (thirdUser) {
      totalMin += thirdUserCost.min;
      totalMax += thirdUserCost.max;
    }

    // If no user is selected, show $0K
    if (totalMin === 0 && totalMax === 0) {
      return "$0K";
    }

    // Format the total cost in "K" format with two decimal places
    const formattedMin = (totalMin / 1000).toFixed(2);
    const formattedMax = (totalMax / 1000).toFixed(2);

    const finalCost = `$${formattedMin}K - $${formattedMax}K`;

    // Store final cost in session storage under a unique index
    let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    costData[3] = index4value; // Store at index 3 (4th position)
    sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
     console.log('costData is:-',costData);
    return finalCost;
};

  // Enable "Next" button only if at least one option is selected
  const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  // Update the displayed cost whenever selection changes
  // useEffect(() => {

  //   document.getElementById("total-cost").textContent = calculateTotalCost();
  // }, [singleUser, multiUser, thirdUser]);  // Recalculate whenever a selection changes

  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Which of the following mobile app platforms do you need?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User (iOS) */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
          // onClick={() => {onClickSingleUser(8250.00, 13750.00)}}
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
      
          <h1 className="f4 pl2 pr2">iOS</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            An iPhone/iPad App Written in Swift
          </p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">150 - 250 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$8,250.00 - $13,750.00</div>
            </div>
          </div>
        </div>

        {/* Multi User (Android) */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: multiUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
          // onClick={() => {onClickMultiUser(8,250.00, 13,750.00)}}
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
      
          <h1 className="f4 pl2 pr2">Android</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            An Android Phone/Tablet App Written in Java
          </p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">150 - 250 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$8,250.00 - $13,750.00</div>
            </div>
          </div>
        </div>

        {/* Third User (Cross-Platform) */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{ borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"auto" }}
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
       
          <h1 className="f4 pl2 pr2">Cross-Platform iOS and Android</h1>
          <p className="lh-copy f6 black-70 pl2 pr2">
            An iOS and Android Phone/Tablet App Written in React Native
          </p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">450 - 400 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$13,750.00 - $22,000.00</div>
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
        onClick={() => onButtonClick("pagefour")}
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
          maxWidth:"0px",
          outline: "none",
          textDecoration: "none",
          backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
          cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Next"
        onClick={() => {
          const finalCost = calculateTotalCost();
        
          // Retrieve existing session storage data
          let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
        
          // Store index4value at index 3 (4th position)
          costData[3] = index4value;
        
          // Save the updated data back to session storage
          sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
        
          console.log("Updated Session Storage (index4value):", sessionStorage.getItem("finalCostPrice"));
        
          // Pass data and navigate to the next page
          onButtonClick("pagesix", {
            singleUser,
            multiUser,
            thirdUser,
            totalCost: finalCost,
            index4value
          });
        }
      }
        
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

export default PageFive;
