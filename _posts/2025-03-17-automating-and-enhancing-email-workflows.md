---
layout: post
title: "Enhancing Productivity: My Google Sheets Integration with Perplexity AI"
date: 2025-03-17
permalink: /blog/2025/03/17/automating-and-enhancing-email-workflows/
categories: [productivity, artificial-intelligence]
excerpt: "Developing a comprehensive Google Apps Script that integrates Perplexity AI's directly into Google Sheets..."
---

# Enhancing Productivity: My Google Sheets Integration with Perplexity AI

## The Challenge I Identified

As a recent graduate stepping into the professional world, I quickly noticed how fragmented many workflows are. During my job search and internship experiences, I found myself constantly switching between different tools: researching companies in Perplexity AI, drafting personalized outreach in email clients, managing contact information in spreadsheets, and handling document attachments from cloud storage.

This inefficiency inspired me to develop a practical solution that would streamline these processes and demonstrate my technical capabilities to potential employers.

## The Solution: A Custom Google Apps Script Integration

Leveraging my programming skills, I created a comprehensive Google Apps Script that integrates Perplexity AI's powerful language capabilities directly into Google Sheets while adding robust email automation features. This project showcases my ability to identify workflow inefficiencies and implement practical solutions—skills I'm eager to bring to my first professional role.

**View the example spreadsheet here:** [Google Sheets Perplexity Integration Demo](https://docs.google.com/spreadsheets/d/1EU6Up2v30fBTupnEahxugLGeJgAMZn2jkPidDKbMh0I/edit?usp=sharing)

## Key Technical Components

### 1. Perplexity AI Integration via Custom Function

The core of my solution is a custom spreadsheet function that connects with the Perplexity API:

```javascript
/**
 * Custom function to call Perplexity AI API.
 *
 * @param {string} prompt The text prompt to send to Perplexity
 * @param {string=} model Optional: The model to use (sonar, sonar-pro, sonar-reasoning)
 * @param {number=} maxTokens Optional: Maximum tokens in the response
 * @param {number=} temperature Optional: Control randomness (0-1)
 * @return {string} The AI response
 * @customfunction
 */
function PERPLEXITY(prompt, model, maxTokens, temperature, topP, frequencyPenalty, presencePenalty) {
  const scriptProperties = PropertiesService.getScriptProperties();
  if (scriptProperties.getProperty(SCRIPT_PROP_API_ENABLED) !== 'true') return "Error: API calls disabled.";
  
  const apiKey = scriptProperties.getProperty(SCRIPT_PROP_API_KEY);
  if (!apiKey) return "Error: API Key not set.";
  
  const validModels = ["sonar-pro", "sonar", "sonar-reasoning"];
  if (model && !validModels.includes(model)) return "Error: Invalid model. Use 'sonar-pro', 'sonar', or 'sonar-reasoning'.";
  
  const url = "https://api.perplexity.ai/chat/completions";
  const messages = [{ "role": "user", "content": prompt }];
  const payload = { model: model || "sonar", messages };
  
  // Set optional parameters if provided
  if (maxTokens) payload.max_tokens = parseInt(maxTokens);
  if (temperature) payload.temperature = parseFloat(temperature);
  if (topP) payload.top_p = parseFloat(topP);
  if (frequencyPenalty) payload.frequency_penalty = parseFloat(frequencyPenalty);
  if (presencePenalty) payload.presence_penalty = parseFloat(presencePenalty);
  
  const options = {
    method: "post",
    headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const contentText = response.getContentText();
    const jsonResponse = JSON.parse(contentText);
    
    // Extract and return just the message content
    if (jsonResponse && jsonResponse.choices && jsonResponse.choices[0] && jsonResponse.choices[0].message) {
      return jsonResponse.choices[0].message.content;
    }
    return contentText;
  } catch (error) {
    return "Error: " + error.toString();
  }
}
```

This function implementation demonstrates several technical skills:
- API integration and authentication management
- Parameter handling and validation
- Error management and user feedback
- JSON parsing and data extraction

The function allows users to specify:
- Custom prompts (which can reference cell values)
- Model selection (sonar, sonar-pro, sonar-reasoning)
- Response parameters (token length, temperature)
- Additional configuration options (top-p, frequency penalty)

### 2. Email Automation with PDF Attachments

The email component showcases my understanding of Google's services and document handling:

```javascript
/**
 * Sends emails for all rows with checked boxes, including PDF resume attachment
 */
function sendMarkedEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  
  // Find the column indexes
  var emailColIndex = headers.indexOf("Email");
  var messageColIndex = headers.indexOf("Message");
  var sendEmailColIndex = headers.indexOf("Send Email");
  var resumeColIndex = headers.indexOf("Resume ID");
  var statusColIndex = headers.indexOf("Email Status");
  
  // Loop through each row
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    // Check if this row has the send checkbox checked
    if (row[sendEmailColIndex] === true) {
      var email = row[emailColIndex];
      var plainMessage = row[messageColIndex];
      var resumeId = row[resumeColIndex];
      
      // Only proceed if we have both an email and a message
      if (email && plainMessage) {
        try {
          // Check if resumeId is valid
          if (resumeId && resumeId.toString().trim() !== "") {
            var file = DriveApp.getFileById(resumeId.toString().trim());
            
            // Send the email with attachment
            MailApp.sendEmail({
              to: email,
              subject: "Fresh Talent",
              htmlBody: formatEmailContent(plainMessage),
              body: plainMessage,
              attachments: [file.getAs(MimeType.PDF)]
            });
            
            // Update status
            sheet.getRange(i + 1, statusColIndex + 1).setValue("Sent on " + new Date().toLocaleString() + " with resume attached");
          }
          
          // Uncheck the Send Email checkbox
          sheet.getRange(i + 1, sendEmailColIndex + 1).setValue(false);
        } catch(e) {
          // Log the error in the status column
          sheet.getRange(i + 1, statusColIndex + 1).setValue("Error: " + e.message);
        }
      }
    }
  }
}
```

The system:
- Identifies rows marked for email sending
- Retrieves message content and recipient information
- Locates and attaches PDF documents from Google Drive
- Formats messages with proper HTML structure
- Tracks delivery status and provides detailed reporting

### 3. User Interface and Security Features

To ensure usability and security, I implemented a custom menu system:

```javascript
/**
 * Creates menu when spreadsheet opens
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // Create main menu with both Perplexity and Email functionalities
  ui.createMenu('Custom Tools')
    .addItem('Send Marked Emails', 'sendMarkedEmails')
    .addItem('Create Status Columns', 'createStatusColumns')
    .addSeparator()
    .addItem('Set Perplexity API Key', 'setApiKey')
    .addItem('Clear Perplexity API Key', 'clearApiKey')
    .addItem('Enable Perplexity API Calls', 'enableApiCalls')
    .addItem('Disable Perplexity API Calls', 'disableApiCalls')
    .addToUi();
  
  // Initialize Perplexity API enabled status if not set
  const scriptProperties = PropertiesService.getScriptProperties();
  if (scriptProperties.getProperty(SCRIPT_PROP_API_ENABLED) === null) {
    scriptProperties.setProperty(SCRIPT_PROP_API_ENABLED, 'true');
  }
}

/**
 * Sets the Perplexity API key in script properties
 */
function setApiKey() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt("Set Perplexity API Key", "Enter your API key:", ui.ButtonSet.OK_CANCEL);
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const apiKey = response.getResponseText().trim();
    if (apiKey) {
      PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_API_KEY, apiKey);
      ui.alert("API Key set successfully.");
    } else {
      ui.alert("Invalid API key.");
    }
  }
}
```

These components demonstrate:
- Custom menu integration in the Google Sheets interface
- Secure API key storage using Script Properties
- Enable/disable toggles for API functionality
- Clear user feedback through dialog boxes

## Real-World Applications of This Integration

### Job Search Enhancement

As a graduate seeking employment, I've used this tool to:
- Research companies before interviews by querying Perplexity about their recent news, culture, and innovations
- Send personalized follow-up emails with relevant attachments
- Track my outreach efforts and response rates

For example, I can use a formula like this to get insights about a company before an interview:

```
=PERPLEXITY("What are the recent innovations and company culture at " & A2 & "? Include information about their work environment and values.", "sonar-reasoning", 500)
```

### Potential Business Applications

This integration also has broad applications for:
- **Recruitment**: Researching candidates and sending personalized outreach
- **Sales**: Creating customized proposals based on prospect research
- **Marketing**: Generating content ideas and distributing to contacts
- **Customer Support**: Providing researched solutions in personalized emails

## Email Formatting Enhancement

One of the technical challenges was properly formatting emails. I implemented a specialized HTML formatter:

```javascript
/**
 * Formats plain text content into proper HTML email format with minimal spacing
 */
function formatEmailContent(plainText) {
  // Format the paragraphs properly while preserving line breaks
  var paragraphs = plainText.split("\n");
  
  var formattedParagraphs = paragraphs.map(function(para) {
    // If it's an empty line, return a minimal spacer instead of a larger div
    if (para.trim() === "") {
      return '<div style="height: 4px;"></div>';
    }
    // Reduce the bottom margin of paragraphs
    return '<p style="margin-bottom: 4px; line-height: 1.3;">' + para + '</p>';
  }).join('');
  
  // Create clean HTML wrapper with minimal padding and spacing
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; color: #333333;">
    <div style="max-width: 600px; margin: 0; padding: 10px;">
      <div style="background-color: #ffffff; padding: 0; border-radius: 4px;">
        ${formattedParagraphs}
      </div>
    </div>
  </body>
  </html>
  `;
  
  return html;
}
```

This function ensures emails maintain proper formatting across different email clients.

## Measured Impact and Efficiency Gains

Implementing this solution has resulted in quantifiable improvements:
- Reduced time spent on personalized outreach by 75% (from 12-15 minutes per contact to 3-4 minutes)
- Eliminated context-switching costs by integrating all functions in one interface
- Improved personalization quality through systematic research integration
- Enhanced tracking capabilities for outreach efforts

## What This Project Demonstrates About My Skills

This project highlights several key competencies that I would bring to a professional role:

1. **Technical Skills**:
   - Programming in JavaScript (Google Apps Script)
   - API integration and consumption
   - Automation development
   - Data handling and transformation

2. **Problem-Solving Abilities**:
   - Identifying workflow inefficiencies
   - Designing practical solutions
   - Implementing user-friendly interfaces

3. **Professional Attributes**:
   - Initiative in creating tools to solve real problems
   - Attention to detail in implementation
   - Documentation and explanatory skills

## Conclusion

This integration project represents my approach to problem-solving: identifying inefficiencies, applying technical skills to create solutions, and measuring the impact. As I transition from academic studies to a professional career, I'm eager to bring this same approach to solving business challenges.

The ability to connect different systems and create seamless workflows is increasingly valuable in today's technology landscape. This project demonstrates not only my technical capabilities but also my understanding of practical business needs and how technology can address them.

I'm looking forward to discussing how I can apply these skills to create similar efficiencies and integrations in a professional setting.

---

*For more information about my technical background and other projects, please contact me at [your-email@example.com] or view my portfolio at [your-portfolio-url].*
