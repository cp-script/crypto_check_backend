import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || "8000";

const app = express();
const port = 8000;

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));

const fetchCryptoPrices = async () => {
  try {
    const ids = "bitcoin,ethereum,dogecoin";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`;

    // Fetch the data from CoinGecko API
    const response = await fetch(url);
    const prices = await response.json();

    const price = {
      bitcoin: prices.bitcoin.eur,
      ethereum: prices.ethereum.eur,
      dogecoin: prices.dogecoin.eur,
    };
    createPrice(price);
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error);
  }
};

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000);

// Api
import router from "./routes";
import { createPrice } from "./controllers/PriceController";
app.use("/", router);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
