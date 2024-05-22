We will use Node.js with Express for the server, and MongoDB for the database. Here's a step-by-step implementation.

## Step 1: Setup Node.js Project

1. Initialize the project:
mkdir urlhash
cd urlhash
npm init -y
npm install express mongoose body-parser crypto

## Step 2: Create the Server

1. Set up the project structure:
touch server.js
mkdir models
touch models/Url.js

2. Define the URL model:
Create models/Url.js to define the schema for URLs in MongoDB.

3. Set up the server:
Create server.js to set up the Express server and connect to MongoDB.

## Step 3: Test the Implementation

1. Start MongoDB:
Make sure MongoDB is running. If installed locally, you can start it with:
mongod

2. Run the Server:
Start the Node.js server:
node server.js

3. Test the Endpoints:
Use a tool like Postman to test the API endpoints.

Shorten URL:
  POST http://localhost:3000/shorten
  Body: {"url": "http://example.com?utm_source=newsletter&utm_medium=email", "expiration_days": 7, "single_use": true}

Redirect URL:
  GET http://localhost:3000/r/<hash>

Get Analytics:
  GET http://localhost:3000/analytics/<hash>

This setup provides a robust and flexible URL hashing system that preserves query parameters, tracks clicks, and supports single-use and expiration options.    


## Deploying the Backend or API in vercel
Step 1: Log in to Vercel dashboard and click on the “Add New…” button and select the “Project” category. As you can see here, I’m already logged in and I have quite a number of projects with vercel already deployed.

Step 2: Import your Git repository after linking your https://github.com/ankitkalra25/url-hash-apiaccount with Vercel.

Step 3: Configure the backend/server on Vercel
- Name your project, such as “url-hash-api”
- Select “Other” in the framework option to tailor the setup and customization process to Node.js.
- Add any necessary environmental variables, such as MONGO_ATLAS_URL: my-mongo-atlas-url. Note: There could be more than one!
- Finally, click on the “Deploy” button.
- Step 4: Very Important, Include the provided vercel.json file in your backend/server root directory and then push it to your remote repository. This will enable Vercel configuration.

Quick Note: As soon as possible, don’t forget to save the new deployment link of your server. “https://url-hash-api.vercel.app" in this case, and replace it in your code wherever the local server link was provided.
