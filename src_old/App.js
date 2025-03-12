import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import MultiStepProgressBar from "./components/MultiStepProgressBar/MultiStepProgressBar";
import PageOne from "./components/PageOne/PageOne";
import PageTwo from "./components/PageTwo/PageTwo";
import PageThree from "./components/PageThree/PageThree";
import PageFour from "./components/PageFour/PageFour";
import PageFive from "./components/PageFive/PageFive";
import PageSix from "./components/PageSix/PageSix";
import PageSeven from "./components/PageSeven/PageSeven";
import PageEight from "./components/PageEight/PageEight";
import PageNine from "./components/PageNine/PageNine";
import PageTen from "./components/PageTen/PageTen";
import PageEleven from "./components/PageEleven/PageEleven";
import PageTwelve from "./components/PageTwelve/PageTwelve";
import PageThirteen from "./components/PageThirteen/PageThirteen";
import PageFourteen from "./components/PageFourteen/PageFourteen";
import PageFifteen from "./components/PageFifteen/PageFifteen";
import PageSixteen from "./components/PageSixteen/PageSixteen";
import ConsultationForm from "./components/ConsultationForm/ConsultationForm";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";
import LandingPage   from "./components/LandingPage/LandingPage";
import "./App.css";
import tachyons from "tachyons";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";


function App(){
 return(
  <Router>
    <MainApp/>
  </Router>
 ); 
}


function MainApp() {
  const [page, setPage] = useState("pageone");
  const [completedPages, setCompletedPages] = useState({ pageone: true });
  const location=useLocation();
  const showProgressBar = location.pathname !== "/cost-calculator";




  const nextPage = (nextPageKey) => {
    console.log('nextpage is:-',nextPageKey)
    setCompletedPages((prev) => ({
      ...prev,
      [nextPageKey]: true, // Mark the page as completed
    }));
    setPage(nextPageKey);
  };
  return (
      <div className="App">
     
       {showProgressBar && <Logo /> } 
       
        {showProgressBar && <MultiStepProgressBar completedPages={completedPages} page={page} onPageNumberClick={nextPage} />}
        <Routes>
        <Route path="/" element={<Navigate to="/cost-calculator" />} />
          {/* Multi-step form routes */}
          <Route path="/consultation-form" element={<ConsultationForm />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/cost-calculator" element={<LandingPage setCompletedPages={setCompletedPages} setPage={setPage}/>}/>
          {/* Pages 1 to 15 */}
          <Route path="/app-cost-calculator" element={
              { 
                pageone: <PageOne onButtonClick={nextPage}/>,
                pagetwo: <PageTwo onButtonClick={nextPage} />,
                pagethree: <PageThree onButtonClick={nextPage}  />,
                pagefour: <PageFour onButtonClick={nextPage}  />,
                pagefive: <PageFive onButtonClick={nextPage} />,
                pagesix: <PageSix onButtonClick={nextPage} />,
                pageseven: <PageSeven onButtonClick={nextPage} />,
                pageeight: <PageEight onButtonClick={nextPage} />,
                pagenine: <PageNine onButtonClick={nextPage} />,
                pageten: <PageTen onButtonClick={nextPage} />,
                pageeleven: <PageEleven onButtonClick={nextPage} />,
                pagetwelve: <PageTwelve onButtonClick={nextPage} />,
                pagethirteen: <PageThirteen onButtonClick={nextPage} />,
                pagefourteen: <PageFourteen onButtonClick={nextPage} />,
                pagefifteen: <PageFifteen onButtonClick={nextPage} />,
                pagesixteen: <PageSixteen />,
              }[page]
            }
          />
        </Routes>
      </div>
 
  );
}

export default App;
