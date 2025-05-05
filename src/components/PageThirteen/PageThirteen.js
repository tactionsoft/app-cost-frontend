import React, { useEffect, useState } from "react";
import user from "./Small.png";
import users from "./Medium.png";
import usersthree from "./minus-sign.png";
import "./PageThirteen.css";

const UserOption = ({ imgSrc, label, isSelected, onClick,onClickUser }) => (
  <div
    className="mw5 bg-white-thirteen br3 pa3 mv3 ba dib b--black-10 ma3 clicked page-four"
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
  const [index12value, setIndex12value] = useState({ title1:"",title2:"",title3:"",answer:"",index:0 });
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);
  const [thirdUser, setThirdUser] = useState(false);

  const onClickSingleUser = (label) => {
    setSingleUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setMultiUser(false);
        setThirdUser(false);
      }
      const updatedState = {
        singleUser:newValue,
        multiUser:false,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageThirteen', JSON.stringify(updatedState));
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
  const onClickMultiUser = (label) => {
    setMultiUser((prev) => {
      const newValue = !prev;
      if (newValue) {
        setSingleUser(false);
        setThirdUser(false);
      }
      const updatedState = {
        singleUser:false,
        multiUser:newValue,
        thirdUser:false
      };
      sessionStorage.setItem('userSelection_pageThirteen', JSON.stringify(updatedState));
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
      sessionStorage.setItem('userSelection_pageThirteen', JSON.stringify(updatedState));
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

  // Navigate to the next page
  onButtonClick("pagefourteen");
};


useEffect(() => {
  const selection = JSON.parse(sessionStorage.getItem('userSelection_pageThirteen'));
  if (!selection) return;

  const { singleUser: saveSingle, multiUser: saveMulti, thirdUser: saveThird } = selection;

  setSingleUser(saveSingle);
  setMultiUser(saveMulti);
  setThirdUser(saveThird);

  setIndex12value({
    value1: saveSingle ? singleUser.min : 0,
    value2: saveSingle ? singleUser.max : 0,
    value3: saveMulti ? multiUser.min : 0,
    value4: saveMulti ? multiUser.max : 0,
    value5: saveThird ? thirdUser.min : 0,
    value6: saveThird ? thirdUser.max : 0,
    title1: saveSingle ? "Maintainance and Support" : "",
    title2: saveMulti ? "Maintainance and Support" : "",
    title3: saveThird ? "Maintainance and Support" : "",
    answer:saveSingle?"40 hours per month":saveMulti?"80 hours per month":saveThird?"No":"",
  });
}, []);



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
