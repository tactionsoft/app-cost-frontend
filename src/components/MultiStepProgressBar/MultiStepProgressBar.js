


import React, { useEffect, useState } from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick, completedPages }) => {
  const steps = [
    "pageone", "pagetwo", "pagethree", "pagefour", "pagefive",
    "pagesix", "pageseven", "pageeight", "pagenine", "pageten",
    "pageeleven", "pagetwelve", "pagethirteen", "pagefourteen", "pagefifteen", "pagesixteen"
  ];

  const currentStep = steps.includes(page) ? steps.indexOf(page) : 0;

  return (
    <ProgressBar percent={((currentStep + 1) / steps.length) * 100}>
      {steps.map((stepKey, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = completedPages[stepKey] || stepKey === "pageone"; // Ensure pageone is always accessible
        const canNavigate = isCompleted; // Only completed pages are clickable

        return (
          <Step key={stepKey}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${isCurrent ? "current-step" : isCompleted ? "past-step" : "disabled"}`}
                onClick={() => canNavigate && onPageNumberClick(stepKey)}
              >
                {index + 1}
              </div>
            )}
          </Step>
        );
      })}
    </ProgressBar>
  );
};


export default MultiStepProgressBar;



