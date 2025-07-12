const axios = require('axios');
const cheerio = require('cheerio');
const builtwith = require('builtwith');

exports.scrapeCompanyData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
      },
      timeout: 15000
    });
    
    const $ = cheerio.load(response.data);
    const html = response.data;
    
  
    const companyName = $('h1').first().text().trim() || 
                       $('title').text().split('|')[0].trim() || 
                       'N/A';
    
    
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = html.match(emailRegex) || [];
    const email = [...new Set(emails)][0] || 'N/A';
    
    const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
    const phones = html.match(phoneRegex) || [];
    const phone = [...new Set(phones)][0] || 'N/A';
    
    
    const description = $('meta[name="description"]').attr('content') || 
                        $('p').text().substring(0, 200) + '...' || 
                        'N/A';
    
    
    const socialProfiles = {
      linkedin: $('a[href*="linkedin.com"]').attr('href') || '',
      twitter: $('a[href*="twitter.com"]').attr('href') || '',
      facebook: $('a[href*="facebook.com"]').attr('href') || '',
      instagram: $('a[href*="instagram.com"]').attr('href') || ''
    };
    
    
    const techStack = await detectTechStack(url);
    
    
    const projects = extractProjects($);
    
    return {
      name: companyName,
      website: url,
      description,
      email,
      phone,
      socialProfiles,
      techStack,
      projects,
      status: 'success'
    };
    
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error.message
    };
  }
};


async function detectTechStack(url) {
  try {
    const result = await builtwith(url);
    const tech = [];
    
    if (result.frameworks) {
      result.frameworks.forEach(f => tech.push(f.name));
    }
    
    if (result.javascript) {
      result.javascript.forEach(js => tech.push(js.name));
    }
    
    if (result.cms) {
      tech.push(...result.cms.map(c => c.name));
    }
    
    if (result.analytics) {
      tech.push(...result.analytics.map(a => a.name));
    }
    
    return [...new Set(tech)];
  } catch (e) {
    console.error(`Tech detection failed: ${e.message}`);
    return [];
  }
}


function extractProjects($) {
  const projects = [];
  
  $('section, div').each((i, section) => {
    const text = $(section).text().toLowerCase();
    if (text.includes('portfolio') || text.includes('projects') || text.includes('case studies')) {
      $(section).find('a, div, article').each((j, item) => {
        const title = $(item).find('h2, h3').first().text().trim();
        const description = $(item).text().substring(0, 150) + '...';
        if (title && description) {
          projects.push({ title, description });
        }
      });
    }
  });
  
  return projects.slice(0, 3);
}