import React, { useEffect, useState } from "react";
import "./PageFifteen.css";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

const PageFifteen = ({ onButtonClick }) => {
  const navigate =useNavigate();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
  
      // Map stored keys to Page 15 form keys
      setFormData({
        name: parsedData["ebook-form-name"] || "",
        email: parsedData["ebook-email"] || "",
        phone: parsedData["ebook-contact"] || "",
      });
    }
  }, []);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevValue)=>({
          ...prevValue,
          [name]:value,
    }))
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
  
      if (!value.trim()) {
        // If field is empty, show the error again
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
      } else {
        // Clear the error if user enters a value
        newErrors[name] = '';
      }
  
      return newErrors;
    });

  }
  const [totalCost, setTotalCost] = useState("$0K");
  

  const calculateTotalCost = (costData) => {
    let totalMin = 0, totalMax = 0;
  
    if (!costData || costData.length === 0) {
      return "$0K - $0K"; // ✅ Default value to avoid `null`
    }
  
    costData.forEach(item => {
      totalMin += (item?.value1 || 0) + (item?.value3 || 0) + (item?.value5 || 0);
      totalMax += (item?.value2 || 0) + (item?.value4 || 0) + (item?.value6 || 0);
    });
  
    return `$${Math.round(totalMin / 1000)}K - $${Math.round(totalMax / 1000)}K`;
  };


useEffect(() => {
  const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  setTotalCost(calculateTotalCost(costData)); // ✅ Update the state properly

  const handleStorageChange = () => {
      const updatedCostData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
      setTotalCost(calculateTotalCost(updatedCostData));
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
      window.removeEventListener("storage", handleStorageChange);
  };
}, []);

const generateTableHTML = (costData) => {
  let tableHTML = `
    <p>Here is the cost breakdown:</p>
    <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px;">Page No</th>
          <th style="border: 1px solid black; padding: 5px;">Title</th>
          <th style="border: 1px solid black; padding: 5px;">Answer</th>
          <th style="border: 1px solid black; padding: 5px;">Min Cost</th>
          <th style="border: 1px solid black; padding: 5px;">Max Cost</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Merge titles and answers for the same page
  const mergedData = {};

  costData.forEach((item) => {
    if (item) {
      const pageIndex = item.index || "N/A";

      if (!mergedData[pageIndex]) {
        mergedData[pageIndex] = {
          index: pageIndex,
          titles: [],
          answers: new Set(), // Use Set to store unique answers
          minCost: 0,
          maxCost: 0,
        };
      }

      if (item.title1) {
        mergedData[pageIndex].titles.push(item.title1);
        mergedData[pageIndex].answers.add(item.answer || ""); // Add unique answer
        mergedData[pageIndex].minCost += item.value1 || 0;
        mergedData[pageIndex].maxCost += item.value2 || 0;
      }
      if (item.title2) {
        mergedData[pageIndex].titles.push(item.title2);
        mergedData[pageIndex].answers.add(item.answer || "");
        mergedData[pageIndex].minCost += item.value3 || 0;
        mergedData[pageIndex].maxCost += item.value4 || 0;
      }
      if (item.title3) {
        mergedData[pageIndex].titles.push(item.title3);
        mergedData[pageIndex].answers.add(item.answer || "");
        mergedData[pageIndex].minCost += item.value5 || 0;
        mergedData[pageIndex].maxCost += item.value6 || 0;
      }
    }
  });

  // Populate the table rows with merged data
  Object.values(mergedData).forEach((row) => {
    tableHTML += `
      <tr>
        <td style="border: 1px solid black; padding: 5px;">${row.index}</td>
        <td style="border: 1px solid black; padding: 5px;">${row.titles.join(", ")}</td>
        <td style="border: 1px solid black; padding: 5px;">${[...row.answers].join(", ")}</td>
        <td style="border: 1px solid black; padding: 5px;">${row.minCost}</td>
        <td style="border: 1px solid black; padding: 5px;">${row.maxCost}</td>
      </tr>
    `;
  });

  // Close the table
  tableHTML += `
      </tbody>
    </table>
  `;

  return tableHTML;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
  //   alert("Please enter your Name, Email, and Phone.");
  //   return;
  // }

  const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  const selectedIndustry = sessionStorage.getItem("selectedIndustry") || "Not Provided";
  const totalCost = calculateTotalCost(costData);

  try {

    // const response = await fetch('http://localhost:1337/api/user-info/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: formData.name.trim(),
    //     email: formData.email.trim(),
    //     phone: formData.phone.trim(),
    //     totalCost,
    //     selectedIndustry,
    //   }),
    // });

  //   const response = await fetch('https://api.app-cost.com/api/user-info/submit', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       name: formData.name.trim(),
  //       email: formData.email.trim(),
  //       phone: formData.phone.trim(),
  //       totalCost,
  //       selectedIndustry,
  //     }),
  //   });
  //   await response.json();

  //   // if (!response.ok) {
  //   //   console.error("❌ API Error:", result);

  //   //   // ✅ Extract actual error message from `details.error` or fallback to `result.message`
  //   //   const errorMessage = result?.error?.details?.error || result?.error?.message || "An error occurred.";

  //   //   alert(`Error: ${errorMessage}`);
  //   //   return;
  //   // }
  //   emailjs.send("service_r4mrnbp", "template_6t7euqq", {
  //     email: formData.email.trim(),
  //     phone: formData.phone.trim(),
  //     from_name: formData.name.trim(),
  //     name: "Admin",
  //     to_email: "info@tactionsoft.com,marketing@tactionsoft.com",
  //     total_cost: generateTableHTML(costData),
  //     total_costs: totalCost,
  //     selectedIndustry: selectedIndustry,
  //   }, "kCTmCH5S7cwmPxSVR")
  //     .then((response) => {
  //       // alert("Thank you! Your estimate has been sent.");
  //       sessionStorage.removeItem("userProgress");
  //       sessionStorage.removeItem("finalCostPrice");
  //       onButtonClick('pagesixteen'); // Redirect user
  //     })
  //     .catch((error) => {
  //       console.error("❌ Email failed:", error);
  //       alert("Failed to send email. Please try again.");
  //     });

  // } catch (error) {
  //   console.error("❌ Error:", error);
  //   alert("An unexpected error occurred. Please try again.");
  // }




  const response = await fetch('http://localhost:1337/api/user-info/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      totalCost,
      selectedIndustry,
    }),
  });
  await response.json();

  // if (!response.ok) {
  //   console.error("❌ API Error:", result);
  //   // ✅ Extract actual error message from `details.error` or fallback to `result.message`
  //   const errorMessage = result?.error?.details?.error || result?.error?.message || "An error occurred.";

  //   alert(`Error: ${errorMessage}`);
  //   return;
  // }
  emailjs.send("service_hwmtg7p","template_goxhraz",{
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    from_name: formData.name.trim(),
    name: "Admin",
    to_email: "marketing@tactionsoft.com,info@tactionsoft.com",
    total_cost: generateTableHTML(costData),
    total_costs: totalCost,
    selectedIndustry: selectedIndustry,
  }, "sXCZZgYF5dxHpqxO_")
    .then((response) => {
      // alert("Thank you! Your estimate has been sent.");
      sessionStorage.removeItem("userProgress");
      sessionStorage.removeItem("finalCostPrice");
      onButtonClick('pagesixteen'); // Redirect user
    })
    .catch((error) => {
      console.error("❌ Email failed:", error);
      alert("Failed to send email. Please try again.");
    });

} catch (error) {
  console.error("❌ Error:", error);
  alert("An unexpected error occurred. Please try again.");
}
  
};



  return (

    <main className="pt5 black-80 center-fifteen form-content"
      style={{ maxWidth: "60%", maxHeight: "30%", margin: "auto" }}>
        <div className="total-est-cost well">
        <h2 className="total-cost-title">Estimated Cost based on your total selection: <span id="total-selection-cost"><br/>{totalCost}</span>
        </h2>
        <p className="disclaimer-form">
          Please note, all cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax.
        </p>
      </div>

      <form className="measure" onSubmit={handleSubmit}>
        <h1 className="form-title" style={{ color: "#fff" }}>Please fill out this form to complete your details and receive your estimate.</h1>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          {/* Name Field */}
          <div className="mt3">
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100 input-font"
              type="text"
              name="name"
              required
              id="workspace-name"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
{/* 
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>} */}
          </div>
          {/* Email Field */}
          <div className="mv3">
            <input
              className="f6 ph3 pv2 dib br2 black w-100 input-font"
              type="email"
              name="email"
              id="workspace-url"
              required
              value={formData?.email}
              onChange={ handleChange}
              placeholder="Enter your Email Address"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
            {/* {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>} */}
          </div>

          {/* Phone Field */}
          <div className="mz3">
            <input
              className="f6 ph3 pv2 dib br2 black w-100 input-font"
              type="text"
              name="phone"
              id="workspace-phone"
              value={formData?.phone}
              onChange={ handleChange}
              placeholder="Enter your Phone Number"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
                height: "40px",
              }}
            />
            {/* {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>} */}
          </div>
        </fieldset>
        {/* Submit Button */}
        <div className="">
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
              color: "black",
              cursor: "pointer",
            }}
            type="submit"
            value="Submit"
            // disabled={!isdisabled}
          />
        </div>
      </form>
    </main>
  );
};

export default PageFifteen;

