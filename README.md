# Bidding Application Backend

## Introduction

This is a bidding application backend that has features like:

1. User Authorization
2. Admin Authorization
3. Item CRUD (Create, Read, Update, Delete)
4. Real-time bidding using WebSockets
5. Notifications

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed on your local machine. You can download it from [nodejs.org](https://nodejs.org).
- **MySQL** installed and running on your local machine. You can download it from [mysql.com](https://www.mysql.com/downloads/).

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```git@github.com:gurjashandeepsingh/Auction.git```

2. Navigate to the project directory:

   ```cd Auction```

3. Install dependencies:

   ```npm install```


## Usage

To start the server, run the following command:
   
   ```npm run start```

The server will start running on port 9000 by default.

To change port add env variable:
```PORT```

# Usage

1. Register User or Admin using registration API

2. Login that User or Admin using login API, it will return a JWT Token.

3. Save the token returned and use it under Authorization as a Bearer Token in all protected API routes.

```To access most of the routes, you need to pass the JWT Tokens for authorization as most of the routes are protected```

4. A CRUD can be performed on an Item

5. Bidding can be done in real time and being a protected route, a JWT Token needs to be passed.

6. All the bids on an Item can be fetched. 

A full postman file is already included

Time taken to complete : 1 Day
