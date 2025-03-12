import React, { useEffect, useState } from "react";
import healthcareUser from "./image/health-care.png";
import bankingUser from "./image/banking.svg";
import insuranceUser from "./image/insurance.svg";
import lendingUser from "./image/lending.png";
import investmentUser from "./image/investment.png";
import paymentsUser from "./image/payment.png";
import manufacturingUser from "./image/manufacturing.png";
import transportationUser from "./image/transportation.png";
import retailwholesaleUser from "./image/retailwholesale.png";
import oilgasUser from "./image/oilgas.png";
import professionalServicesUser from "./image/professionals.png";
import telecommUser from "./image/telecomm.png";
import engineeringConstructionUser from "./image/engineering-construction.png";
import utilitiesUser from "./image/utilities.png";
import publicSectorUser from "./image/public-sector.png";
import realEstateUser from "./image/real-estate.png";
import entertainmentUser from "./image/entertainment.png";
import informationTechnologiesUser from "./image/it.png";
import multiIndustryUser from "./image/multiindustry.png";
import othersUser from "./image/others.png";
import "./PageOne.css";

const PageOne = ({ onButtonClick, setCompletedPages, setPage }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const industryTitles = [
    "Banking",
    "Engineering & Construction",
    "Healthcare",
    "Retail",
    "Education",
    "Manufacturing",
    "Telecommunications",
    "Transportation & Logistics",
    "Media & Entertainment",
    "Real Estate",
    "Energy",
    "Government",
    "Insurance",
    "Technology",
    "Automotive",
    "Hospitality",
    "Pharmaceutical",
    "Agriculture",
    "Food & Beverage",
    "Sports & Recreation",
  ];

  const handleSubmit = () => {
    if (selectedUser) {
      const selectedIndustryTitle = industryTitles.find((title) =>
        selectedUser.toLowerCase().includes(title.toLowerCase().split(" ")[0])
      );
  
      sessionStorage.setItem("selectedIndustry", selectedIndustryTitle || "");
      onButtonClick("pagetwo");
    }
  };

  const handleClick = (userType,industryTitles) => {
    sessionStorage.setItem('industryTitles',industryTitles);
    sessionStorage.setItem("finalCostPrice", JSON.stringify([]));
    if (selectedUser === userType) {
      setSelectedUser(null);
      sessionStorage.removeItem('industryTitles');
    } else {
      setSelectedUser(userType);
    }
  };

  useEffect(() => {
    // ✅ Reset progress when returning to Landing Page
    setCompletedPages({ pageone: true }); // Only enable pageone
    setPage("pageone"); // Start at page one
  }, []);

  const isContinueButtonEnabled = selectedUser !== null;

  return (
    <main
      className="pt5 black-80 industry-all-content"
      style={{ maxWidth: "70%", maxHeight: "25%", margin: "auto" }}
    >
      <h1>Select Your industry</h1>
      <div class="industry-type">
        <div className="industry-block-one ph4 selectionDiv">
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "bankingUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("bankingUser")}
          >
            <img
              src={bankingUser}
              className="icon-size"
              title="multi user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "bankingUser" ? "selected" : ""
              }`}
            >
              Banking
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "engineeringConstructionUser"
                  ? "#18d2e8"
                  : "#EAEEF5",
            }}
            onClick={() => handleClick("engineeringConstructionUser")}
          >
            <img
              src={engineeringConstructionUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "engineeringConstructionUser" ? "selected" : ""
              }`}
            >
              Engineering & Construction
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "entertainmentUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("entertainmentUser")}
          >
            <img
              src={entertainmentUser}
              className="icon-size"
              title="multi user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "entertainmentUser" ? "selected" : ""
              }`}
            >
              Entertainment
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "healthcareUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("healthcareUser")}
          >
            <img
              src={healthcareUser}
              className="icon-size"
              title="single user icon"
              alt="user-icon"
            />

            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "healthcareUser" ? "selected" : ""
              }`}
            >
              Healthcare
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "informationTechnologiesUser"
                  ? "#18d2e8"
                  : "#EAEEF5",
            }}
            onClick={() => handleClick("informationTechnologiesUser")}
          >
            <img
              src={informationTechnologiesUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "informationTechnologiesUser" ? "selected" : ""
              }`}
            >
              Information technologies
            </h1>
          </div>
        </div>
        <div className="industry-block-two ph4 selectionDiv">
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "insuranceUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("insuranceUser")}
          >
            <img
              src={insuranceUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "insuranceUser" ? "selected" : ""
              }`}
            >
              Insurance
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "investmentUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("investmentUser")}
          >
            <img
              src={investmentUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "investmentUser" ? "selected" : ""
              }`}
            >
              Investment
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "lendingUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("lendingUser")}
          >
            <img
              src={lendingUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "lendingUser" ? "selected" : ""
              }`}
            >
              Lending
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "manufacturingUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("manufacturingUser")}
          >
            <img
              src={manufacturingUser}
              className="icon-size"
              title="multi user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "manufacturingUser" ? "selected" : ""
              }`}
            >
              Manufacturing
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "multiIndustryUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("multiIndustryUser")}
          >
            <img
              src={multiIndustryUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "multiIndustryUser" ? "selected" : ""
              }`}
            >
              Multi-industry
            </h1>
          </div>
        </div>

        <div className="industry-block-three ph4 selectionDiv">
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "oilgasUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("oilgasUser")}
          >
            <img
              src={oilgasUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "oilgasUser" ? "selected" : ""
              }`}
            >
              Oil and gas
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "paymentsUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("paymentsUser")}
          >
            <img
              src={paymentsUser}
              className="icon-size"
              title="single user icon"
              alt="user-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "paymentsUser" ? "selected" : ""
              }`}
            >
              Payments
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "professionalServicesUser"
                  ? "#18d2e8"
                  : "#EAEEF5",
            }}
            onClick={() => handleClick("professionalServicesUser")}
          >
            <img
              src={professionalServicesUser}
              className="icon-size"
              title="single user icon"
              alt="user-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "professionalServicesUser" ? "selected" : ""
              }`}
            >
              Professional services
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "publicSectorUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("publicSectorUser")}
          >
            <img
              src={publicSectorUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "publicSectorUser" ? "selected" : ""
              }`}
            >
              Public sector
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "realEstateUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("realEstateUser")}
          >
            <img
              src={realEstateUser}
              className="icon-size"
              title="single user icon"
              alt="user-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "realEstateUser" ? "selected" : ""
              }`}
            >
              Real estate
            </h1>
          </div>
        </div>

        <div className="industry-block-four ph4 selectionDiv">
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "retailwholesaleUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("retailwholesaleUser")}
          >
            <img
              src={retailwholesaleUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "retailwholesaleUser" ? "selected" : ""
              }`}
            >
              Retail and wholesale
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "telecommUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("telecommUser")}
          >
            <img
              src={telecommUser}
              className="icon-size"
              title="multi user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "telecommUser" ? "selected" : ""
              }`}
            >
              Telecomm
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "transportationUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("transportationUser")}
          >
            <img
              src={transportationUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "transportationUser" ? "selected" : ""
              }`}
            >
              Transportation
            </h1>
          </div>
          <div
            className="industry-card br3 pa3 mv3 ba dib b--black-10 ma3"
            style={{
              borderColor:
                selectedUser === "utilitiesUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("utilitiesUser")}
          >
            <img
              src={utilitiesUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "utilitiesUser" ? "selected" : ""
              }`}
            >
              Utilities
            </h1>
          </div>
          <div
            className={`industry-card br3 pa3 mv3 ba dib b--black-10 ma3 ${
              selectedUser === "othersUser" ? "active" : ""
            }`}
            style={{
              borderColor:
                selectedUser === "othersUser" ? "#18d2e8" : "#EAEEF5",
            }}
            onClick={() => handleClick("othersUser")}
          >
            <img
              src={othersUser}
              className="icon-size"
              title="third user icon"
              alt="users-icon"
            />
            <h1
              className={`f4 pl2 pr2 card-title ${
                selectedUser === "othersUser" ? "selected" : ""
              }`}
            >
              Others
            </h1>
          </div>
        </div>
      </div>

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
          backgroundColor: isContinueButtonEnabled ? "#08354e" : "#ddd",
          cursor: isContinueButtonEnabled ? "pointer" : "not-allowed",
        }}
        type="submit"
        value="Continue"
        onClick={
          // () => onButtonClick("pagetwo")
          handleSubmit
        }
        disabled={!isContinueButtonEnabled}
      />
    </main>
  );
};

export default PageOne;
