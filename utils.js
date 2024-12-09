/**
 * Format a number as currency (example, $1,234,567).
 * @param {number} value - The value to format.
 * @returns {string} - Formatted currency string.
 */

const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(
      `Invalid input for formatCurrency: ${value}. Expected a number.`
    );
  }
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

/**
 * Format a number as a percentage (example, 22.5%).
 * @param {number} value - The value to format.
 * @returns {string} - Formatted percentage string.
 */

const formatPercentage = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(
      `Invalid input for formatPercentage: ${value}. Expected a number.`
    );
  }
  return `${value}%`;
};

// Export the functions
module.exports = { formatCurrency, formatPercentage };
