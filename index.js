const fs = require("fs");

try {
  // Load and parse the data file
  const rawData = fs.readFileSync("data.json");
  const jsonData = JSON.parse(rawData);

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    throw new Error(
      "Invalid data in 'data.json'. Expected an array under the 'data' key"
    );
  }

  const data = jsonData.data;

  // Initialize variables for required calculations
  let revenue = 0;
  let expenses = 0;
  let grossProfitMargin = 0;
  let netProfitMargin = 0;
  let workingCapitalRatio = 0;

  // Print results
  console.log(`Revenue: ${revenue}`);
  console.log(`Expenses: ${expenses}`);
  console.log(`Gross Profit Margin: ${grossProfitMargin}`);
  console.log(`Net Profit Margin: ${netProfitMargin}`);
  console.log(`Working Capital Ratio: ${workingCapitalRatio}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
