# Money Manager Backend

Backend API for the Money Manager web application.

This service handles accounts, transactions, dashboards, filters, and
summaries.

## Live API

https://money-manager-backend-ob5y.onrender.com/

## Features

-   Account management (Cash, Bank, Card, Savings, etc.)
-   Income, Expense, and Transfer transactions
-   Automatic account balance updates
-   Prevents negative account balances
-   Transaction edit restriction (only within 12 hours)
-   Dashboard statistics:
    -   Weekly
    -   Monthly
    -   Yearly income and expense totals
-   Category-wise expense summary
-   Transaction filtering by:
    -   Date range
    -   Category
    -   Division (Personal / Office)
    -   Transaction type

## Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB Atlas
-   **ODM:** Mongoose
-   **Environment Variables:** dotenv

## API Base URL

/api

### Example Endpoints

-   `GET /api/transactions`
-   `POST /api/transactions`
-   `PUT /api/transactions/:id`
-   `GET /api/transactions/filter`
-   `GET /api/transactions/summary/category`
-   `GET /api/transactions/dashboard/:range`
-   `GET /api/accounts`
-   `POST /api/accounts`

## Run Locally

### Installation

```bash 
npm install 
```
### Environment Setup 

Create a .env file in the root directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

### Start Server
```bash
npm run dev 
```
The server will run at:

```bash
http://localhost:5000
```

## Notes
- This backend was developed as part of a hackathon assessment.
