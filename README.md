# Book Collection API

An API that allows users to maintain their personal book collections. Users can add, edit, delete, and view their books, with JWT authentication ensuring that only the book owner can access their collection.

## Features

- **User Registration and Login**: Users can create an account and log in.
- **JWT-based Authentication**: Secure API routes using JSON Web Tokens (JWT). Only authenticated users can access their data.
- **CRUD Operations for Books**: 
  - Create: Add new books to the collection.
  - Read: View details of books in the collection.
  - Update: Edit book information (title, author, etc.).
  - Delete: Remove books from the collection.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building APIs.
- **JWT (JSON Web Tokens)**: Used for secure authentication and route protection.
- **Database**: Stores user and book data (MongoDB).

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ahmedelshinnawi/Book-Collection-API
2.
   ```bash
   cd book-collection-api
   npm install
3. Set up environment variables:
   ```bash
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
4. Start the server:
    ```bash
    npm start

## API Endpoints:
### Authentication
- POST /signup: Register a new user.
- POST /login: Authenticate and get a JWT token.

### Collections (Protected Routes)
- GET /collection: Get a list of all collections for the authenticated user.
- POST /collection: Add a new collection.
- GET /collection/:id: View details of a specific collection.
- PUT /collection/:id: Update a specific collection's information.
- DELETE /collection/:id: Remove a collection from the database
