I've implemented a robust web scraping tool focused on extracting detailed company information from provided URLs. The solution includes all core features from the minimal requirements: URL input validation, basic data extraction (company name, website, email, phone), structured JSON/CSV output, and comprehensive error handling for network issues and missing data. For enhanced functionality, I've implemented medium-level data extraction including social media profiles, company descriptions, technology stack detection, and project/portfolio identification. The tool demonstrates capabilities at both Basic and Medium extraction tiers, with technology stack analysis approaching Advanced complexity through integration with the BuiltWith API.

To set up the tool, first clone the repository and install dependencies for both backend and frontend using npm install in the server and client directories. The backend requires Node.js v16+ and runs on port 4000 using npm start, while the frontend uses React on port 3000 started with npm start. No database setup is required for core functionality, though MongoDB can be optionally configured by adding a MONGO_URI to the server's .env file. Users can simply enter multiple company URLs (one per line) in the web interface, click "Start Scraping," and view results in an interactive table with expandable details panels. The "Export as JSON" button allows downloading comprehensive company data.

Key design decisions include using the MERN stack for full JavaScript consistency, selecting Cheerio over Puppeteer for efficient static HTML parsing, and implementing a stateless architecture that works without databases. The UI features progressive disclosure of information to prevent overload, responsive design with Tailwind CSS, and clear visual indicators for success/error states. Ethical considerations include rate limiting (sequential requests with 15-second timeouts), robots.txt compliance awareness, and transparent user-agent identification. The implementation assumes users will provide valid company homepage URLs and that contact information is typically available in page HTML, though it has limitations with JavaScript-heavy sites and CAPTCHA-protected pages that could be addressed in future enhancements.

# Company Scraper Tool

A full-stack web application for extracting company information from websites.

## Features
- URL-based scraping of company information
- Technology stack detection
- Project/portfolio identification
- Contact information extraction
- JSON export functionality

## Technologies
- React.js (Frontend)
- Node.js/Express (Backend)
- Tailwind CSS (Styling)
- Cheerio (HTML parsing)
- BuiltWith (Tech detection)

## Setup
1. Clone repository: `git clone https://github.com/your-username/your-repo-name.git`
2. Install backend dependencies: `cd server && npm install`
3. Install frontend dependencies: `cd ../client && npm install`
4. Start backend: `cd server && npm start`
5. Start frontend: `cd client && npm start`

## Usage
1. Enter company URLs (one per line)
2. Click "Start Scraping"
3. View results in the table
4. Click "Show" for detailed information
5. Export data using "Export as JSON" button
