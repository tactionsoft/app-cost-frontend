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
import { useLocation,useNavigate,useParams } from "react-router-dom";



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
  const showProgressBar = location.pathname !== "/";
  const hideProgressBar=location.pathname!=='/thank-you'

  const resetProgress = () => {
    setCompletedPages({ pageone: true }); // Reset progress, allowing only Page 1
  };

  const nextPage = (nextPageKey) => {
    setCompletedPages((prev) => ({
      ...prev,
      [nextPageKey]: true, // Mark the page as completed
    }));
    setPage(nextPageKey);
  };
  return (
      <div className="App">

       {showProgressBar && <Logo/>} 
       
        {showProgressBar && hideProgressBar && <MultiStepProgressBar completedPages={completedPages} page={page} onPageNumberClick={nextPage} />}
        <Routes>
          {/* Multi-step form routes */}
          <Route path="/consultation-form" element={<ConsultationForm/>} />
          <Route onButtonClick={nextPage} path="/thank-you" element={<ThankYouPage/>} />
          <Route path="/" element={<LandingPage setCompletedPages={setCompletedPages} setPage={setPage}/>}/>
          {/* Pages 1 to 15 */}
          <Route path="/app-cost-calculator" element={
              { 
                pageone: <PageOne onButtonClick={nextPage} setPage={setPage} setCompletedPages={setCompletedPages}/>,
                pagetwo: <PageTwo onButtonClick={nextPage}/>,
                pagethree: <PageThree onButtonClick={nextPage}/>,
                pagefour: <PageFour onButtonClick={nextPage} />,
                pagefive: <PageFive onButtonClick={nextPage} />,
                pagesix: <PageSix onButtonClick={nextPage} />,
                pageseven: <PageSeven onButtonClick={nextPage} />,
                pageeight: <PageEight onButtonClick={nextPage} />,
                pagenine: <PageNine onButtonClick={nextPage} />,
                pageten: <PageTen onButtonClick={nextPage} />,
                pageeleven: <PageEleven onButtonClick={nextPage} />,
                pagetwelve: <PageTwelve onButtonClick={nextPage} />,
                pagethirteen: <PageThirteen onButtonClick={nextPage} />,
                pagefourteen: <PageFourteen  onButtonClick={nextPage} />,
                pagefifteen: <PageFifteen onButtonClick={nextPage} />,
                pagesixteen: <PageSixteen onButtonClick={nextPage} resetProgress={resetProgress}/>,
              }[page]
            }
          />x``
        </Routes>
      </div>
 
  );
}
export default App;
