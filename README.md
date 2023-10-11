
# Qmin Book Store Backend

## Overview

This repo contains the source code of the backend of Qmin Book Store app. This backend is built using Node.js, Express.js and MongoDB.

## Technologies Used

-   **Node.js**: A JavaScript runtime built on Chrome's V8 engine, designed to build scalable network applications.
-   **Express.js**: A fast, unopinionated, and minimalist web framework for Node.js, making it easy to build robust APIs and web applications.
-   **MongoDB**: A NoSQL document-based database system known for its flexibility and scalability, perfect for modern web applications.

## Installation
To clone and run this application you'll need [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/en) and [Pnpm](https://pnpm.io/) installed on your system. Commands to run after installing these dependencies :

1. Clone the repository:

   ```bash
   git clone https://github.com/jatinkh25/book-store-backend.git
   ```

2. Install dependencies:

   ```bash
   cd book-store-backend
   pnpm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the project root directory.
   - Set the following environment variables:
    ```bash
   SECRET_KEY = a random long text
   MONGODB_SERVER_URL = your mongoDB server url
   FRONTEND_URL = your frontend url
   ```

Note: This backend is utilized by a frontend, whose source code link can be found [here](https://github.com/jatinkh25/qmin-book-store).


5. Start the development server:

   ```bash
   pnpm dev
   ```


## Folder Structure

The folder structure of the Qmin Book Store backend app is organized as follows:

```bash
├── controllers # Handles application logic based on routes 
├── middlewares # Contains the Auth middleware functions that have access to the request object, response object, and the next middleware function in the application’s request-response cycle 
├── models # Database models and schemas built using MongoDB 
├── routes # Defines application endpoints and HTTP methods 
├── utils # Utility functions and helpers used across the project 
├── app.js # Entry point for the application setting up the server, middleware, and routes 
└── ...
```

## Contributing

Contributions are welcome! If you would like to contribute to the Qmin Book store backend app, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## Acknowledgments

- The creators of Node.js, Express.js and MongoDB for providing excellent tools and frameworks.
- The open-source community for their contributions and support.
