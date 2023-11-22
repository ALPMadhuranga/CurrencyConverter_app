const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const namesURL =
    "https://openexchangerates.org/api/currencies.json?app_id=074afd2ceda24333be8987e20cd696b4";

  try {
    const namesResponce = await axios.get(namesURL);
    const nameData = namesResponce.data;

    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});

//get the target amount
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=074afd2ceda24333be8987e20cd696b4`;
    const dataResponce = await axios.get(dataUrl);
    const rates = dataResponce.data.rates;

    // rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target val
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});

// listen to a port
app.listen(5000, () => {
  console.log("SERVER STARTED");
});
