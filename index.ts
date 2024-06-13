import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const fetchCryptoPrices = async () => {
  try {
    const ids = "bitcoin,ethereum,dogecoin";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`;

    // Fetch the data from CoinGecko API
    const response = await fetch(url);
    const prices = await response.json();

    // Log the prices to the console
    console.log("Bitcoin (BTC) price in EUR:", prices.bitcoin.eur);
    console.log("Ethereum (ETH) price in EUR:", prices.ethereum.eur);
    console.log("Dogecoin (DOGE) price in EUR:", prices.dogecoin.eur);
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error);
  }
};

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
