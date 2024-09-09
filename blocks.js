const getIssueByID = require("./get-issue-by-id");

const domain = process.env.DOMAIN
const baseUrl = 'https://' + domain + '.atlassian.net';
 const getJiraCardById = async (issueId) => {
  try {
    if (!issueId) {
      throw new Error("Issue ID is required");
    }

    const issue = await getIssueByID(issueId);

    if (!issue || !issue.fields) {
      throw new Error("Failed to retrieve issue details");
    }

    const card = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🎟️ Created Jira Ticket",
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Ticket ID:*\n🆔 ${issueId}`,
              },
              {
                type: "mrkdwn",
                text: `*Summary:*\n📋 ${issue.fields.summary || ""}`,
              },
              {
                type: "mrkdwn",
                text: `*Status:*\n🔄 ${issue.fields.status?.name || ""}`,
              },
              {
                type: "mrkdwn",
                text: `*Priority:*\n⚠️ ${issue.fields.priority?.name || ""}`,
              },
              {
                type: "mrkdwn",
                text: `*Assigned to:*\n👤 ${issue.fields.assignee?.displayName || ""}`,
              },
              {
                type: "mrkdwn",
                text: `*Reporter:*\n📝 ${issue.fields.reporter?.displayName || ""}`,
              },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "For more details, visit the ticket in Jira:",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "View Ticket",
              },
              url: `${baseUrl}/browse/${issueId}`,
              action_id: "button-action",
            },
          },
        ],
      };

    return card;
  } catch (error) {
    throw new Error("Failed to fetch Jira Issue");
  }
};

module.exports = getJiraCardById;


