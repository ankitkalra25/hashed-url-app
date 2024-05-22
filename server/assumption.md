# Assumptions for URL Hashing System

## General Assumptions
1. **Environment**
   - The application will run in a Node.js environment with Express as the web framework.
   - MongoDB will be used as the database, running locally or on a managed service like MongoDB Atlas.

2. **URLs**
   - The URLs to be shortened can be of any length and can contain any number of query parameters.
   - The original URLs are assumed to be valid and properly formatted.
   - The generated hash will be 8 characters long, derived from an MD5 hash of the original URL.   

3. **Hash Uniqueness**
   - The 8-character hash generated from the MD5 hash of the URL will be sufficiently unique to avoid collisions in most cases.
   - In the event of a hash collision, the same hash can be reused as long as it points to the same original URL, otherwise, a new hash will be generated manually.   

## Functional Assumptions

1. **Shortening Endpoint (`/shorten`)**
   - The request to shorten a URL will be a POST request with a JSON payload containing the URL to be shortened and optional fields for expiration days and single-use.
   - If `expiration_days` is provided, the shortened URL will expire after the specified number of days.
   - If `single_use` is set to true, the shortened URL will be valid for a single redirection only.

2. **Redirection Endpoint (`/r/:hash`)**
   - The endpoint will redirect to the original URL associated with the provided hash.
   - The system will track the number of times a shortened URL has been accessed.
   - The endpoint will check for expiration and single-use constraints before redirecting.  

3. **Analytics Endpoint (`/analytics/:hash`)**
   - Provides basic click count information for the shortened URL.
   - Does not include advanced analytics in the initial version.    


