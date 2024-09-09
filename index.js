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


function processOrders(orders) {
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      total += order.amount;
      // More processing logic...
  }
  // More code...
  return total;
}


function calculateDiscount(price, discount) {
  // Bug: discount is not used correctly
  return price * (discount / 100); // Should be (price * discount)
}