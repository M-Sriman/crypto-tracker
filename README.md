# Real-Time Crypto Price Tracker

## Overview

This project is a web application that tracks real-time cryptocurrency prices, similar to CoinMarketCap. It displays a table of various crypto assets with their prices, percentage changes, and other relevant data, simulating real-time updates.

## Features

* **Real-Time Price Tracking:** Simulates real-time updates of cryptocurrency prices, percentage changes (1h, 24h, 7d), and 24h volume.
* **Data Table:** Displays cryptocurrency data in a tabular format, including:
    * Name
    * Symbol
    * Price
    * 1h %, 24h %, 7d % (color-coded)
    * Market Cap
    * 24h Volume
    * Circulating Supply
    * Max Supply
    * 7D Chart (Sparkline)
* **Responsive Design:** The table is designed to be responsive, with columns dynamically shown or hidden based on screen size.
* **Filtering:** Users can filter the displayed assets by name or symbol, and by price range.
* **Sorting:** Users can sort the assets by clicking on the table headers for Name, Price, 1h %, 24h %, 7d %, Market Cap, and 24h Volume.

## Tech Stack

* **Frontend:**
    * React
    * Redux Toolkit
    * React Sparklines
    * Tailwind CSS
* **State Management:** Redux Toolkit
* **Real-time Data:** Simulated using `setInterval`
* **Bundler:** (Assumed -  Likely Webpack or similar, as create-react-app or similar was used)

## Architecture

The application follows a React and Redux-based architecture.

1.  **Components:**
    * `App`: The main application container.
    * `CryptoTable`: Displays the cryptocurrency data in a table format.

2.  **Redux:**
    * The application uses Redux Toolkit for state management.
    * The  `cryptoSlice`  manages the  cryptocurrency data, including the initial state and reducers for updating the data.
    * The  `selectAllAssets`  selector is used to retrieve the asset data from the Redux store.
    * Simulated real-time updates are handled by dispatching the `updateAssets` action, which updates the asset data in the Redux store.

3.  **Data Flow**
    * Initial data is loaded into the Redux store (in this version, initial data is already in the store).
    * The  `CryptoTable`  component retrieves data from the Redux store using the  `selectAllAssets`  selector.
    * Simulated real-time updates are generated using  `setInterval`  in  `App.js`.
    * The  `updateAssets`  action is dispatched every 2 seconds to update the Redux store with the simulated data.
    * The  `CryptoTable`  component automatically re-renders whenever the data in the Redux store changes.

4.  **Utils**
    * `utils.js`: Contains helper functions, including  `generateSimulatedUpdates`,  `simulatePriceChange`,  `simulatePercentageChange`, and `simulateVolumeChange`, to simulate real-time data changes.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm start
    ```
4.  **View in browser:** Open your browser and navigate to `http://localhost:5147` (or the appropriate port).

## Demo

[[Demo Video/GIF](https://drive.google.com/file/d/1eOfziG5Igize6MUIXy_XpWJkmwm4JMzs/view?usp=sharing)]

## Further Improvements

* Implement unit tests for reducers and selectors.
* Add more comprehensive error handling.
* Persist data to localStorage.
* Implement more advanced filtering and sorting options.
* Add more detailed charts.
* Implement user input for adding/removing tracked assets.

