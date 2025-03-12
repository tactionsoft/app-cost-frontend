


import React, { useEffect, useState } from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick, completedPages }) => {
  const steps = [
    "pageone", "pagetwo", "pagethree", "pagefour", "pagefive",
    "pagesix", "pageseven", "pageeight", "pagenine", "pageten",
    "pageeleven", "pagetwelve", "pagethirteen", "pagefourteen", "pagefifteen","pagesixteen"
  ];

  // Find the current step index
  const currentStep = steps.includes(page) ? steps.indexOf(page) : 0;

  // Track the highest step the user has reached
  const [maxStep, setMaxStep] = useState(currentStep);

  // Update maxStep only if the user progresses forward
  useEffect(() => {
    if (currentStep > maxStep) {
      setMaxStep(currentStep);
    }
  }, [currentStep]);

  // Keep progress bar at the max step reached
  const stepPercentage = ((maxStep + 1) / steps.length) * 100;

  return (
    <ProgressBar percent={stepPercentage}>
      {steps.map((stepKey, index) => {
        const isCurrent = index === currentStep; // Only the selected step
        const isPast = index <= maxStep; // All steps up to maxStep should be colored
        const canNavigate = isPast || completedPages[stepKey]; // Allow navigation to past and completed steps

        return (
          <Step key={stepKey}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${isCurrent ? "current-step" : isPast ? "past-step" : ""} ${canNavigate ? "clickable" : "disabled"}`}
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



