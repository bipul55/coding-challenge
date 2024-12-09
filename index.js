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
  let grossProfitMargin;
  let netProfitMargin;
  let workingCapitalRatio = 0;
  let sales = 0;

  // Single iteration through the data array
  for (const entry of data) {
    const { account_category, account_type, value_type, total_value } = entry;
    if (account_category === "revenue") {
      revenue += total_value;
    } else if (account_category === "expense") {
      expenses += total_value;
    }

    if (account_type === "sales" && value_type === "debit") {
      sales += total_value;
    }
  }

  // Calculate final metrics
  grossProfitMargin = revenue ? ((sales / revenue) * 100).toFixed(1) : 0;
  netProfitMargin = revenue
    ? (((revenue - expenses) / revenue) * 100).toFixed(1)
    : 0;

  // Print results
  console.log(`Revenue: ${revenue}`);
  console.log(`Expenses: ${expenses}`);
  console.log(`Gross Profit Margin: ${grossProfitMargin}`);
  console.log(`Net Profit Margin: ${netProfitMargin}`);
  console.log(`Working Capital Ratio: ${workingCapitalRatio}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
