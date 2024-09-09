var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};

//creates an issue in Jira Cloud using REST API 
async function createIssue(projectKey, issueType, summary, description, status, priority) {

  try {
 

    const baseUrl = `https://${domain}.atlassian.net`;

    const data = {
      fields: {
        project: { key: projectKey },
        summary: summary || '',
        description: description || '',
        issuetype: { name: issueType || ''},
        // priority: { name: priority || ''},
        // status: { name: status || ''}
      }
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, config);
    return response.data.key;

  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      console.log(error.response.data.errors);
    } else {
      console.log('An error occurred: ', error.message);
    }
    throw error;
  }
}

module.exports = createIssue;