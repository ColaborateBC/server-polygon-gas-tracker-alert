const express = require("express");
const request = require("axios");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const config = require("./config"); // Load the exported data from config.js

const API_KEY = config.API_KEY;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update this with the appropriate origin URL for production use
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.get("/get-data", (req, res) => {
  const apiUrl =
    "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=" +
    API_KEY; // Construct the API URL with the stored API key
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const proposeGasPrice = data.result.ProposeGasPrice;
      const fastGasPrice = data.result.FastGasPrice;
      // Update the response with the relevant data
      const responseJson = {
        proposeGasPrice: proposeGasPrice,
        fastGasPrice: fastGasPrice,
      };
      res.json(responseJson);
    })
    .catch(error => {
      res.status(500).send("Error");
    });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}); 
