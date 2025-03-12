import React, { useState } from "react";
import user from "./heart-rate.png";
import users from "./minus-sign.png";
import "./PageFourteen.css";

const PageFourteen = ({ onButtonClick }) => {
  // const [selectedUser, setSelectedUser] = useState(null);
  const [singleUser, setSingleUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);

  const singleUserCost = { min: 11000, max:22000 };
  const thirdUserCost = { min: 0, max: 0 };
  const [index13value, setIndex13value] = useState({ value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,index:0,title1:"",title2:"",answer:"" });
  console.log('index is :-',index13value)
  const [totalCost, setTotalCost] = useState("$0K");

  const onClickSingleUser = () => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) setThirdUser(false); // Deselect ThirdUser if selected
      updateCost(newValue);
      const pageIndex=14;
      setIndex13value((prevState) => ({
        ...prevState,
        value1: newValue ? singleUserCost.min : 0,
        value2: newValue ? singleUserCost.max : 0,
        index: newValue? pageIndex:0,
        title1: newValue?"EHR Integration ":"",
        answer:newValue?'Yes':"",
      }));
  
      return newValue;
    });
  };

  console.log('index6 update is:-',index13value);
  
  const onClickThirdUser = () => {
    setThirdUser((prev) => {
        const newValue = !prev;
        if (newValue) {
            setSingleUser(false);
        }
        updateCost(false, newValue); // Fix the function call
        const pageIndex=14;
        setIndex13value({
            value1: newValue ? thirdUserCost.min : 0,
            value2: newValue ? thirdUserCost.max : 0,
            value3: 0, value4: 0, value5: 0, value6: 0,
            index: newValue? pageIndex:0,
            title2: newValue? "EHR Integration":"",
            answer:newValue?"No":""
        });

        return newValue;
    });
};

  const updateCost = (single,third) => {
    let totalMin = 0, totalMax = 0;
    if (single) { totalMin += singleUserCost.min; totalMax += singleUserCost.max; }
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

  const finalCost = totalMin === 0 && totalMax === 0 ? "$0K" : `${formattedMin}K - ${formattedMax}K`;

  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  costData[12] = index13value; // Ensure correct index
  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));

  console.log("Updated costData:", costData);

  // Ensure state updates before page transition
  setTimeout(() => {
      onButtonClick("pagefifteen");
  }, 100);

  return finalCost;
};

const isContinueButtonEnabled = singleUser || thirdUser;

  return (
    <>
        <main
      className="pt5 black-80"
      style={{ maxWidth: "65%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Do you need EHR Integration?</h2>
      <div className="center ph4 selectionDiv">
        {/* Single User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{
            borderColor: singleUser ? "#18d2e8" : "#EAEEF5",height:"auto"
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
          <p className="lh-copy f6 black-70 pl2 pr2">
            Example: EPIC, Cerner, Athena
          </p>
          <div className="divider">
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Hours</label>
              </div>
              <div className="col-xl-6 col-7">200 - 400 Hours</div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-5">
                <label>Estimated Cost</label>
              </div>
              <div className="col-xl-6 col-7">$11,000.00 - $22,000.00</div>
            </div>
          </div>
        </div>

        {/* Multi User Option */}
        <div
          className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
          style={{
            borderColor: thirdUser ? "#18d2e8" : "#EAEEF5",height:"auto"}}
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
          marginRight:"8px",
          marginRight: "10px",
        }}
        type="submit"
        value="Back"
        onClick={() => onButtonClick("pagethirteen")}
      />

      {/* Next Button (disabled if no option is selected) */}
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
        onClick={calculateTotalCost}
        disabled={!isContinueButtonEnabled}
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

export default PageFourteen;
