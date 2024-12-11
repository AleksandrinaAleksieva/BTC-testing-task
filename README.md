# Bitcoin Price Checker

This project is designed to validate the BTC-USD price from the Google Finance page by comparing it to the price fetched from the API. It uses Selenium WebDriver for browser automation, Cucumber for behavior-driven development (BDD), and Chai for assertions. Axios is used to make HTTP requests to fetch the BTC-USD price from an API. 

## Technologies Used

- **Selenium WebDriver**: For browser automation to interact with the Google Finance page.
- **Cucumber**: For behavior-driven testing and feature definitions.
- **Chai**: For assertions in the tests.
- **Axios**: To make HTTP requests to fetch the BTC-USD price from the API.
- **Dotenv**: For managing environment variables.

## Project Structure

The project's structure is as follows:
```
├── .github/ # github configs
│ └── workflows # Defined workflows
│  └── test.yml # Defined steps for execution within the CI
├── .vscode/ # VSCode settings for debugging 
│ └── launch.js # Debugging configuration for Cucumber tests 
├── drivers/ 
│ └── chromedriver.exe # ChromeDriver executable for Selenium 
├── features/ 
│ └── pages/ 
│   └── finance.btc.page.js # Page Object Model for the Bitcoin price page 
│ └── step_definitions/ # Step definitions for Cucumber 
│   └── btc_steps.js # Step definitions for the Bitcoin test scenario 
│ └── btc_page.feature # Cucumber feature file for the BTC-USD page tests 
├── node_modules/ # Installed npm modules 
├── reports/ # Test results and reports 
│ └── allure-results/ # Allure results 
├── .env # Environment configuration file (DO NOT COMMIT API keys)
├── .gitignore # Git ignore file for sensitive data 
├── constants.js.js # Commonly used static variables 
├── cucumber.js # Cucumber configuration file 
├── helpers.js # Helper functions, like handling cookies 
├── package.json # Project dependencies and scripts 
├── setupChai.js # Exporting except for better accessibility within the project
└── utils.js # Utility functions 
```

### Setting up `.env` file

In the project directory, create a `.env` file that contains your API key for the Google Finance API.

### Example `.env` file:
```env
API_ENDPOINT=https://serpapi.com/search?engine=google_finance&q=BTC-USD&api_key=your_api_key_here
Important: Never commit your .env file with the actual API key to a public repository. You can add .env to .gitignore to prevent it from being tracked.

.gitignore
plaintext
Copy code
.env
node_modules/
Project Setup

## Environment Configuration
Follow the steps below to set up the project environment:

### 1 Clone the repository:
bash
Copy code
git clone <your-repository-url>
cd nexo

### 2 Install dependencies
Ensure that you have Node.js and npm installed. Then run:

npm install
This will install all required dependencies as defined in package.json.

### 3 Set up Google API Key
Sign up for a SerpAPI account at SerpAPI to get your API key.

After receiving your API key, add it to the .env file, as described in the previous section.

### 4 Run Tests
After setting up the environment, you can run the tests using:

npx cucumber-js
This will execute the Cucumber feature tests defined in the features/*.feature file.

## Debugging Configuration
If you want to debug the Cucumber tests in VSCode, follow the steps below:

Open your project in VSCode.
Go to the Run panel (left sidebar) and click on create a launch.json file.
Select "Node.js" and paste the following configuration into launch.json:
launch.json (VSCode Debug Configuration)
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Cucumber Tests",
      "program": "${workspaceFolder}/node_modules/.bin/cucumber-js",
      "args": [
        "--require",
        "${workspaceFolder}/step_definitions/*.js",
        "--format",
        "progress",
        "${workspaceFolder}/features/*.feature"
      ],
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "node",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```
This configuration allows you to debug the Cucumber tests directly from VSCode.

```
Node: The project is configured in headless mode, if you would like to launch a browser you should remove
.setChromeOptions(chromeOptions)
from BeforeAll
```

## Troubleshooting
Missing .env file: If the .env file is missing, make sure to create it as per the instructions above.
API Key Errors: Double-check that the API key is correctly set in the .env file.

## Default Timeout

The default timeout is set to 320000 ms to accommodate the long waiting intervals required by the tests.

## Local Test Execution

### Generate API Key
1. Create an account at [https://serpapi.com/](https://serpapi.com/).
2. Retrieve your API Key from [https://serpapi.com/manage-api-key](https://serpapi.com/manage-api-key).
3. Create a `.env` file in the root directory and add the following configuration:
   
   ```bash
   # Google Finance API Endpoint
   API_ENDPOINT=https://serpapi.com/search?engine=google_finance&q=BTC-USD&api_key=yourApiKeyHere
Install Dependencies
Run the following command in your terminal to install all the required dependencies:

npm install
Chromedriver Compatibility
Ensure that the chromedriver.exe version in the drivers/ folder is compatible with your browser. Replace it with the correct version if needed.

Install Cucumber Plugin for VS Code (Optional)
You can install the Cucumber plugin for VS Code to enable syntax highlighting and better integration, but it's not mandatory.

Run Tests
To run the tests, use the following commands:

Smoke Tests:

npm run smoke
All Tests:
npm run test
NPM Scripts

The package.json file contains the following test scripts:
"test": "cucumber-js",
"smoke": "cucumber-js --profile smoke"

Debug Tests
To debug the tests, navigate to the "Run and Debug" section of your editor (e.g., VSCode) and create a new Node.js debug configuration. Paste and save the following configuration:

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Cucumber Tests",
      "program": "${workspaceFolder}/node_modules/.bin/cucumber-js",
      "args": [
        "--require",
        "${workspaceFolder}/step_definitions/*.js",
        "--format",
        "progress",
        "${workspaceFolder}/features/*.feature"
      ],
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "node",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}

Remote Execution - CI
For remote execution on a Continuous Integration (CI) system, you'll need to follow these steps:

Generate an API key (as described above).
Set up your CI pipeline with the necessary environment variables and configurations to run the tests remotely.
