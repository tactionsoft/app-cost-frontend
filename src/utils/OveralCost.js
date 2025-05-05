// export const calculateOverallTotalCost = () => {
//     const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
  
//     let totalMin = 0;
//     let totalMax = 0;
  
//     for (const page of costData) {
//       if (!page) continue;
//       totalMin += page.value1 + page.value3; // SingleUser + MultiUser min
//       totalMax += page.value2 + page.value4; // SingleUser + MultiUser max
//     }
  
//     if (totalMin === 0 && totalMax === 0) {
//       return "$0K";
//     }
  
//     return `$${Math.round(totalMin / 1000)}K - $${Math.round(totalMax / 1000)}K`;
//   };
  
export const calculateOverallTotalCost = () => {
    const costData = JSON.parse(sessionStorage.getItem("finalCostPrice")) || [];
    console.log("costData is:-", costData);
  
    let totalMin = 0;
    let totalMax = 0;
  
    for (let i = 0; i < costData.length; i++) {
      if (i === 11) continue; // skip Page 13 (index 11)
      const page = costData[i];
      if (!page) continue;
      totalMin += page.value1 + page.value3;
      totalMax += page.value2 + page.value4;
    }
  
    if (totalMin === 0 && totalMax === 0) {
      return "$0K";
    }
  
    return `$${(totalMin / 1000)}K - $${(totalMax / 1000)}K`;
  };
  