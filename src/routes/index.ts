import express from "express";
import priceRouter from "./price";

const router = express.Router();

router.use("/price", priceRouter);

export default router;
