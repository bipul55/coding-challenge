const fs = require("fs");
const { formatCurrency, formatPercentage } = require("./utils");

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
  let workingCapitalRatio;
  let sales = 0;
  let assets = 0;
  let liabilities = 0;

  // Single iteration through the data array
  for (const entry of data) {
    const { account_category, account_type, value_type, total_value } = entry;

    // Calculate revenue and expenses
    if (account_category === "revenue") {
      revenue += total_value;
    } else if (account_category === "expense") {
      expenses += total_value;
    }

    // Calculate sales for 'grossProfitMargin'
    if (account_type === "sales" && value_type === "debit") {
      sales += total_value;
    }
    // Calculate assets for 'workingCapitalRatio'
    if (account_category === "assets") {
      if (
        value_type === "debit" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          account_type
        )
      ) {
        assets += total_value;
      } else if (
        value_type === "credit" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          account_type
        )
      ) {
        assets -= total_value;
      }
    }

    // Calculate liability for 'workingCapitalRatio'
    if (account_category === "liability") {
      if (
        value_type === "credit" &&
        ["current", "current_accounts_payable"].includes(account_type)
      ) {
        liabilities += total_value;
      } else if (
        value_type === "debit" &&
        ["current", "current_accounts_payable"].includes(account_type)
      ) {
        liabilities -= total_value;
      }
    }
  }

  // Calculate final metrics
  grossProfitMargin = revenue ? (sales / revenue) * 100 : 0;
  netProfitMargin = revenue ? ((revenue - expenses) / revenue) * 100 : 0;

  workingCapitalRatio = liabilities ? (assets / liabilities) * 100 : 0;

  // Print results
  console.log(`Revenue: ${formatCurrency(revenue)}`);
  console.log(`Expenses: ${formatCurrency(expenses)}`);
  console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);
  console.log(`Net Profit Margin: ${formatPercentage(netProfitMargin)}`);
  console.log(
    `Working Capital Ratio: ${formatPercentage(workingCapitalRatio)}`
  );
} catch (error) {
  console.error(`Error: ${error.message}`);
}
