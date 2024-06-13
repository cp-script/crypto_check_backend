import express from "express";
import {
  getBitcoin,
  getDogecoin,
  getEthereum,
} from "../controllers/PriceController";

const router = express.Router();

router.get("/bitcoin", getBitcoin);

router.get("/ethereum", getEthereum);

router.get("/dogecoin", getDogecoin);

export default router;
