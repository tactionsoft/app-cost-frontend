import React, { useState } from "react";
import user from "./Small.png";
import users from "./Medium.png";
import usersthree from "./minus-sign.png";
import "./PageThirteen.css";

const UserOption = ({ imgSrc, label, isSelected, onClick,onClickUser }) => (
  <div
    className="mw5 bg-white br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
    style={{ borderColor: isSelected ? "#18d2e8" : "#EAEEF5" }}
    onClick={onClick}
  >
       <div style={{display:"flex",justifyContent:"center"}}>
       <img src={imgSrc} className="h2 w2" title={`${label} icon`} alt={`${label}-icon`} />
       </div>
  
    <h1 className="f4 pl2 pr2">{label}</h1>
  </div>
);

const PageThirteen = ({ onButtonClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [index12value, setIndex12value] = useState({ title1:"",title2:"",title3:"",answer:"",index:0 });
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);
  console.log('page13 is :-',index12value)

  const onClickSingleUser = (label) => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
        setThirdUser(false);
      }

      // updateCost(newValue);
  const  pageIndex=13;
      setIndex12value({
         // Keep previous values
        index: newValue ? pageIndex : 0,
        title1: newValue ? label : "",
        answer:newValue?"40 hours per month":"",
      });
  
      return newValue;
    });
  };
  console.log('index 11 is:-',index12value)
  const onClickMultiUser = (label) => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setThirdUser(false);
      }
      // updateCost(false, newValue, false);
  const pageIndex=13;
      setIndex12value( {
       
        index: newValue ? pageIndex : 0,
        title2: newValue ? label : "",
        answer:newValue?"80 hours per month":"",
      });
  
      return newValue;
    });
  };

  const onClickThirdUser = (label) => {
    setThirdUser((prev) => {
      console.log('prev value is:-', prev);
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setMultiUser(false);
      }
      // updateCost(false, false, newValue);
    const pageIndex=13;
      setIndex12value({
        index: newValue ? pageIndex : 0,
        title3: newValue ? label : "",
        answer:newValue?"No":""
      });
  
      return newValue;
    });
  };

  // const updateCost = (single, multi, third) => {
  //   setSingleUser(single);
  //   setMultiUser(multi);
  //   setThirdUser(third);
  // };

//   const calculateTotalCost = () => {
    
//     let totalMin = 0;
//     let totalMax = 0;

//     // Add cost ranges for selected options
//     if (singleUser) {
//       totalMin += singleUserCost.min;
//       totalMax += singleUserCost.max;
//     }
//     if (multiUser) {
//       totalMin += multiUserCost.min;
//       totalMax += multiUserCost.max;
//     }
//     if (thirdUser) {
//       totalMin += thirdUserCost.min;
//       totalMax += thirdUserCost.max;
//     }

//     // If no user is selected, show $0K
//     if (totalMin === 0 && totalMax === 0) {
//       return "$0K";
//     }

//     // Format the total cost in "K" format with two decimal places
//     const formattedMin = (totalMin / 1000).toFixed(2);
//     const formattedMax = (totalMax / 1000).toFixed(2);

//     const finalCost = `$${formattedMin}K - $${formattedMax}K`;

//     // Store final cost in session storage under a unique index
//     let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
//     costData[10] = index11value; // Store at index 3 (4th position)
//     sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));
//      console.log('costData is:-',costData);
//      onButtonClick("psgefourteen");
//     return finalCost;
// };

const calculateTotalCost = () => {
  let costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];

  // Ensure we update the existing index (11) instead of pushing new entries
  costData[11] = { 
    index: index12value.index || 0, 
    title1: index12value.title1 || "", 
    title2: index12value.title2 || "", 
    title3: index12value.title3 || "",
    answer:index12value.answer||"", 
  };

  sessionStorage.setItem("finalCostPrice", JSON.stringify(costData));

  console.log("Updated costData:", costData);

  // Navigate to the next page
  onButtonClick("pagefourteen");
};






  // Check if the "Next" button should be enabled
  const isNextButtonEnabled = singleUser || multiUser || thirdUser;

  return (
    <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Need ongoing maintenance and support?</h2>
      <div className="center ph4 selectionDiv">
        <UserOption
          imgSrc={user}
          onClick={()=>onClickSingleUser('Maintainance and Support')}
          label="40 hours per month"
          isSelected={singleUser}
          // onClick={() => handleSelectUser(1)}
        />
        <UserOption
          imgSrc={users}
          onClick={()=>onClickMultiUser('Maintainance and Support')}
          label="80 hours per month"
          isSelected={multiUser}
          // onClick={() => handleSelectUser(2)}
        />
        <UserOption
          imgSrc={usersthree}
          onClick={()=>onClickThirdUser('Maintainance and Support')}
          label="No"
          isSelected={thirdUser}
          // onClick={() => handleSelectUser(3)}
        />
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
        onClick={() => onButtonClick("pagetwelve")}
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
            textDecoration: "none",
            maxWidth:"0px",
            backgroundColor: isNextButtonEnabled ? "#08354e" : "#ddd",
            cursor: isNextButtonEnabled ? "pointer" : "not-allowed",
          }}
          type="submit"
          value="Next"
          onClick={calculateTotalCost}
          disabled={!isNextButtonEnabled}
        />
    </main>
  );
};

export default PageThirteen;
