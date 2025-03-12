import { useParams } from "react-router-dom";

function PageRenderer() {
  const { pageKey } = useParams(); // Get the current page from URL

  const pages = {
    pageone: <PageOne />,
    pagetwo: <PageTwo />,
    pagethree: <PageThree />,
    pagefour: <PageFour />,
    pagefive: <PageFive />,
    pagesix: <PageSix />,
    pageseven: <PageSeven />,
    pageeight: <PageEight />,
    pagenine: <PageNine />,
    pageten: <PageTen />,
    pageeleven: <PageEleven />,
    pagetwelve: <PageTwelve />,
    pagethirteen: <PageThirteen />,
    pagefourteen: <PageFourteen />,
    pagefifteen: <PageFifteen />,
    pagesixteen: <PageSixteen />,
  };

  return pages[pageKey] || <PageOne />; // Default to PageOne if URL is invalid
}
export default PageRenderer