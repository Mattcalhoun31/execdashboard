# Executive Dashboard

This project is an executive dashboard for a Demand Generation company, analyzing and measuring the performance of Account Development Managers.

## Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- MongoDB account and database

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development servers:
   ```
   npm run start:dev
   ```

This will start both the frontend and backend servers concurrently.

## Usage

Open your browser and navigate to `http://localhost:5173` to view the dashboard.

## Features

- Display KPIs from Kixie, Jotform, and email campaigns
- Input form for adding new email campaign data
- Real-time updates of dashboard metrics