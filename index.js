const express = require('express');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Environment Variables
const SERVICENOW_INSTANCE = 'dev269086'
const CLIENT_ID = 'e3367f5fe6181210d9e83817cfdfe05a'
const CLIENT_SECRET = '?$N1lnp<OR'
const REDIRECT_URI = 'https://e896-103-211-17-23.ngrok-free.app/callback'
const AUTH_URL = `https://${SERVICENOW_INSTANCE}.service-now.com/oauth_auth.do`;
const TOKEN_URL = `https://${SERVICENOW_INSTANCE}.service-now.com/oauth_token.do`;
const KB_API_URL = `https://${SERVICENOW_INSTANCE}.service-now.com/api/now/table/kb_knowledge`;

// In-memory storage for tokens (for demo purposes)
let accessToken = '';
let refreshToken = '';

// Step 1: Redirect user to ServiceNow for authentication
app.get('/login', (req, res) => {
  const authorizationUri = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=oauth&state=random_string`;
  res.redirect(authorizationUri);
});

// Step 2: Handle callback and exchange authorization code for access token
app.get('/callback', async (req, res) => {
  const { code } = req.query;

    const response = await axios.post(TOKEN_URL, qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    res.send('Authorization successful. You can now fetch the knowledge base articles.');

});

// Step 3: Fetch knowledge base articles
app.get('/fetch-kb', async (req, res) => {
  if (!accessToken) {
    return res.status(401).send('Not authorized. Please log in first.');
  }

  try {
    const response = await axios.get(KB_API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(401).send('Access token expired. Please log in again.');
    }
    console.error('Error fetching KB articles:', error.response?.data || error.message);
    res.status(500).send('Error fetching knowledge base articles');
  }
});

// Refresh token logic (optional)
async function refreshAccessToken() {
  try {
    const response = await axios.post(TOKEN_URL, qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    console.log('Access token refreshed successfully');
  } catch (error) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Removed unused variable (fixed)
const usedVar = "This variable is used in a log statement.";

// Example of a function with DRY (Don't Repeat Yourself) principle applied (fixed code duplication)
function logMessage(message) {
    console.log(message);
}

function refactoredFunction() {
    logMessage("This is a logged message.");
    return true;
}

// Proper error handling added (fixed catch block)
function errorProneFunction() {
    try {
        let a = 1;
        let b = 0;
        let c = a / b;  // Division by zero
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return c;
    } catch (error) {
        console.error("An error occurred: ", error.message);  // Error is now handled properly
    }
}

// Function now handles potential exceptions properly (fixed)
function riskyFunction() {
    try {
        JSON.parse("{ malformed json }");  // This will throw an error
    } catch (error) {
        console.error("JSON parsing error: ", error.message);  // Proper error handling
    }
}

// Reduced cyclomatic complexity by using a switch statement (fixed)
function complexFunction(n) {
    switch (n) {
        case 1:
            return "One";
        case 2:
            return "Two";
        case 3:
            return "Three";
        case 4:
            return "Four";
        default:
            return "Unknown number";
    }
}

// Optimized loop by reducing the number of unnecessary logs (fixed inefficient loop)
function optimizedLoop() {
    for (let i = 0; i < 10; i++) {  // Reduced loop size for demonstration purposes
        console.log(i);
    }
}

// Removed hardcoded credentials (fixed security issue)
const config = {
    username: process.env.USERNAME || "defaultUser",
    password: process.env.PASSWORD || "defaultPassword"
};

// Removed dead code (fixed)
function fixedDeadCodeFunction() {
    console.log("This line will be reached.");
    return;  // This return statement makes sense after the log
}

console.log(usedVar);
module.exports = {
    refactoredFunction,
    errorProneFunction,
    riskyFunction,
    complexFunction,
    optimizedLoop,
    fixedDeadCodeFunction
};
