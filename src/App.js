import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {calculateOverallTotalCost} from '../src/utils/OveralCost'
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

function AppCostCalculatorPage({ page, setPage, nextPage, totalCost, setTotalCost, resetProgress, setCompletedPages }) {
  const sharedProps = { onButtonClick: nextPage, totalCost, setTotalCost, setPage, setCompletedPages };
  
  const pages = {
    pageone: <PageOne {...sharedProps} />,
    pagetwo: <PageTwo {...sharedProps} />,
    pagethree: <PageThree {...sharedProps} />,
    pagefour: <PageFour {...sharedProps} />,
    pagefive: <PageFive {...sharedProps} />,
    pagesix: <PageSix {...sharedProps} />,
    pageseven: <PageSeven {...sharedProps} />,
    pageeight: <PageEight {...sharedProps} />,
    pagenine: <PageNine {...sharedProps} />,
    pageten: <PageTen {...sharedProps} />,
    pageeleven: <PageEleven {...sharedProps} />,
    pagetwelve: <PageTwelve {...sharedProps} />,
    pagethirteen: <PageThirteen {...sharedProps} />,
    pagefourteen: <PageFourteen {...sharedProps} />,
    pagefifteen: <PageFifteen {...sharedProps} />,
    pagesixteen: <PageSixteen onButtonClick={nextPage} resetProgress={resetProgress} />,
  };

  return pages[page] || <PageOne {...sharedProps} />;
}


function App(){
 return(
  <Router>
    <MainApp/>
  </Router>
 ); 
}


function MainApp() {
  const [page, setPage] = useState("pageone");
  const [totalCost,setTotalCost]=useState("$0K");
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
    const cost = calculateOverallTotalCost();
    setTotalCost(cost);
  };

  // useEffect(() => {
  //   const cost = calculateOverallTotalCost();
  //   setTotalCost(cost);
  // }, []);
  useEffect(() => {
    // Clear sessionStorage when the user reloads the page
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });
  
    // Set totalCost on first mount
    const cost = calculateOverallTotalCost();
    setTotalCost(cost);
  
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.clear();
      });
    };
  }, []);
  

  return (
      <div className="App">
       {showProgressBar && <Logo/>} 
        {showProgressBar && hideProgressBar && <MultiStepProgressBar completedPages={completedPages} page={page} onPageNumberClick={nextPage} />}
        <Routes>
          {/* Multi-step form routes */}
          <Route path="/consultation-form" element={<ConsultationForm/>} />
          <Route onButtonClick={nextPage} path="/thank-you" element={<ThankYouPage/>} />
          <Route path="/" element={<LandingPage setCompletedPages={setCompletedPages} setPage={setPage}/>}/>
          <Route
    path="/app-cost-calculator"
    element={
      <AppCostCalculatorPage
        page={page}
        setPage={setPage}
        nextPage={nextPage}
        totalCost={totalCost}
        setTotalCost={setTotalCost}
        resetProgress={resetProgress}
        setCompletedPages={setCompletedPages}
      />
    }
  /> 
          {/* Pages 1 to 15 */}
          {/* <Route path="/app-cost-calculator" element={
              { 
                pageone: <PageOne onButtonClick={nextPage} setPage={setPage} setCompletedPages={setCompletedPages}/>,
                pagetwo: <PageTwo onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost}/> ,
                pagethree: <PageThree onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost}/>,
                pagefour: <PageFour onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagefive: <PageFive onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagesix: <PageSix onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pageseven: <PageSeven onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pageeight: <PageEight onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagenine: <PageNine onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pageten: <PageTen onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pageeleven: <PageEleven onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagetwelve: <PageTwelve onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagethirteen: <PageThirteen onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagefourteen: <PageFourteen  onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagefifteen: <PageFifteen onButtonClick={nextPage} totalCost={totalCost} setTotalCost={setTotalCost} />,
                pagesixteen: <PageSixteen onButtonClick={nextPage} resetProgress={resetProgress}/>,
              }[page]
            }
          />x`` */}
          
        </Routes>
      </div>
 
  );
}
export default App;
