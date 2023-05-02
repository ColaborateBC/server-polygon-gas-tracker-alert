const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const config = require("./config"); // Load the exported data from config.js
const TelegramBot = require("node-telegram-bot-api");

const API_KEY = config.API_KEY;
let gasPrices = {};
let user = {};

const app = express();

app.use(bodyParser.json());

const bot = new TelegramBot(config.TEL_API_KEY || [YOUR_BOT_API], { polling: true });

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
  res.header("Content-Type", "application/javascript");
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
      gasPrices = {
        proposeGasPrice: proposeGasPrice,
        fastGasPrice: fastGasPrice,
      };
      res.json(responseJson);
    })
    // .catch(error => {
    //   res.status(500).send("Error");
    // });
});

app.get("/", async (req, res) => {
  const chatIdPromise = new Promise((resolve) => {
    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      user = { chatId: { chatId:chatId, user:msg.chat.username } };
      console.log(user);
      if(msg.text === "/start") {
        bot.sendMessage(chatId, "Welcome to GasTrackerBot!");
        resolve(chatId);
      }
    });
  });

  const chatId = await chatIdPromise;
  bot.sendMessage(chatId, "Welcome to GasTrackerBot!");
  // res.json({ success: true });
});

app.post("/", (req, res) => {
    const userId = user.chatId.chatId;
  const gasPriceThreshold = req.body.gasPriceThreshold;
  // res.json({ success: true });
  if (gasPrices.proposeGasPrice <= gasPriceThreshold || gasPrices.fastGasPrice <= gasPriceThreshold) {
    const message = `Gas price has dropped below ${gasPriceThreshold}. Current prices: Proposed: ${gasPrices.proposeGasPrice}, Fast: ${gasPrices.fastGasPrice}`;
    // console.log(message);
    bot.sendMessage(userId, message)
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}); 
