const axios = require('axios');

async function fetchBTCPrice(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const apiPrice = response.data.summary.extracted_price;
      return apiPrice;
    } catch (error) {
      throw new Error('Failed to fetch the price from API');
    }
  };

async function parseUiPrice(price){
  const cleanPrice = await price.trim().replace(/[,\(\)]/g, ''); 
  return parseFloat(cleanPrice);
}

module.exports = { fetchBTCPrice, parseUiPrice };
