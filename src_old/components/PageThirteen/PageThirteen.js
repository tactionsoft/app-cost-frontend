import React, { useState } from "react";
import user from "./Small.png";
import users from "./Medium.png";
import usersthree from "./minus-sign.png";
import "./PageThirteen.css";

const UserOption = ({ imgSrc, label, isSelected, onClick }) => (
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

  const handleSelectUser = (userType) => {
    setSelectedUser((prevUser) => (prevUser === userType ? null : userType));
  };



  // Check if the "Next" button should be enabled
  const isNextButtonEnabled = selectedUser !== null;

  return (
    <main
      className="pt5 black-80"
      style={{ maxWidth: "90%", maxHeight: "25%", margin: "auto" }}
    >
      <h2>Need ongoing maintenance and support?</h2>
      <div className="center ph4 selectionDiv">
        <UserOption
          imgSrc={user}
          label="40 hours per month"
          isSelected={selectedUser === 1}
          onClick={() => handleSelectUser(1)}
        />
        <UserOption
          imgSrc={users}
          label="80 hours per month"
          isSelected={selectedUser === 2}
          onClick={() => handleSelectUser(2)}
        />
        <UserOption
          imgSrc={usersthree}
          label="No"
          isSelected={selectedUser === 3}
          onClick={() => handleSelectUser(3)}
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
        onClick={() => onButtonClick("pagefourteen")}
        disabled={!isNextButtonEnabled}
      />
    </main>
  );
};

export default PageThirteen;
