# Social Network API
## Description
A Social Network App API that utilizes NoSQL, Express.js, and Mongoose to manipulate the database and route API endpoints. The API's functionality includes the abilities to create, update, and delete user accounts, create, update, and delete thoughts, add/delete reactions to thoughts, and add/delete friends to user accounts. Relationships exist between users, friends, and thoughts, as well as between thoughts and reactions. If a user is deleted, the user's associated thoughts will also be removed. 
The functionality of the Social Network API can be tested through API testing tools, such as Insomnia.rest, and is demonstrated in the walkthrough video.
## Walkthrough Video
[Social Network API Demonstration](https://drive.google.com/file/d/1fbAjFAQ1OL0ElCSVmobW2jYUjF1j-_NV/view?usp=sharing)
## Usage
- Download files and packages included in package.json by running "npm i" in the terminal from the root directory.
- Start server and connection to database by running "npm run dev" in terminal from the root directory.
- Test endpoints within routes folder using Insomnia, or other API testing tool
- Post and Put routes for users, thoughts, and reactions require a body to be sent in the form of a JSON object. Follow the model requirements for what properties and values to pass in these instances.
## Resources

[Mongoose](https://mongoosejs.com/)

[Express.js](https://expressjs.com/)