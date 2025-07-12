const { validateUrl } = require('../utils/validator');
const { scrapeCompanyData } = require('../utils/scraper');

exports.scrapeWebsite = async (input) => {
  const { urls } = input;
  if (!urls || urls.length === 0) {
    throw new Error('At least one URL must be provided');
  }
  
  const results = [];
  
  for (const url of urls) {
    validateUrl(url);
    const data = await scrapeCompanyData(url);
    results.push(data);
  }
  
  return results;
};