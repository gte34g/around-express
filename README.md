# Around the U.S. Back End  
  
## Description
In this project I received a database which had to upload to MongoDB, connect to the database to JavaScript file using Mongoose. Testing the server using Postman.

### Directories
`/controllers` - General functions files for getting users and cards.

`/lib` - Error handeling variables.

`/models` - User and card schema for our data and validation.

`/routes` - Routes files.

### Routes
  
`/users` - GET all users data, POST a new user.

`/users/:_id` - GET a user by id.

`/users/me` - PATCH the current user name and about.

`/users/me/avatar` - PATCH the current user avatar.

`/cards` - GET all cards data, POST a new card.

`/cards/:_id` - DELETE card by id.

`/cards/:_id/like` - PUT like & DELETE like (dislike) for a card by id. 
  
### Technologies
Node.js

Express.js

JSON

MongoDB

Mongoose

Postman
  
### Running the Project  
  
`npm run start` — to launch the server.  
  
`npm run dev` — to launch the server with the hot reload feature.  



