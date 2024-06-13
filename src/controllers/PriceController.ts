import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Price {
  bitcoin: number;
  ethereum: number;
  dogecoin: number;
}

export const createPrice = async (params: Price) => {
  const { bitcoin, ethereum, dogecoin } = params;
  const priceTime = new Date();

  try {
    await prisma.price.create({
      data: {
        bitcoin,
        ethereum,
        dogecoin,
        priceTime,
      },
    });
    return "success";
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getBitcoin = async (req: Request, res: Response) => {
  const { minutes } = req.query;
  try {
    let prices,
      latest = 0,
      average = 0,
      count = 0;

    if (!minutes || isNaN(Number(minutes)) || Number(minutes) === 0) {
      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          bitcoin: true,
          priceTime: true,
        },
      });
    } else {
      const minutesNumber = Number(minutes);
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - minutesNumber * 60000);

      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          bitcoin: true,
          priceTime: true,
        },
        where: {
          priceTime: {
            gte: startTime,
          },
        },
      });
    }

    count = prices.length;
    if (count > 0) {
      latest = prices[0].bitcoin;
      average = prices.reduce((sum, price) => sum + price.bitcoin, 0) / count;
    }

    const history = prices.map(({ bitcoin, priceTime }) => ({
      price: bitcoin,
      priceTime,
    }));

    res.json({ latest, average, history, count });
  } catch {
    res.send("error");
  }
};

export const getEthereum = async (req: Request, res: Response) => {
  const { minutes } = req.query;
  try {
    let prices,
      latest = 0,
      average = 0,
      count = 0;

    if (!minutes || isNaN(Number(minutes)) || Number(minutes) === 0) {
      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          ethereum: true,
          priceTime: true,
        },
      });
    } else {
      const minutesNumber = Number(minutes);
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - minutesNumber * 60000);

      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          ethereum: true,
          priceTime: true,
        },
        where: {
          priceTime: {
            gte: startTime,
          },
        },
      });
    }

    count = prices.length;
    if (count > 0) {
      latest = prices[0].ethereum;
      average = prices.reduce((sum, price) => sum + price.ethereum, 0) / count;
    }

    const history = prices.map(({ ethereum, priceTime }) => ({
      price: ethereum,
      priceTime,
    }));

    res.json({ latest, average, history, count });
  } catch {
    res.send("error");
  }
};

export const getDogecoin = async (req: Request, res: Response) => {
  const { minutes } = req.query;
  try {
    let prices,
      latest = 0,
      average = 0,
      count = 0;

    if (!minutes || isNaN(Number(minutes)) || Number(minutes) === 0) {
      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          dogecoin: true,
          priceTime: true,
        },
      });
    } else {
      const minutesNumber = Number(minutes);
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - minutesNumber * 60000);

      prices = await prisma.price.findMany({
        orderBy: [
          {
            priceTime: "desc",
          },
        ],
        select: {
          dogecoin: true,
          priceTime: true,
        },
        where: {
          priceTime: {
            gte: startTime,
          },
        },
      });
    }

    count = prices.length;
    if (count > 0) {
      latest = prices[0].dogecoin;
      average = prices.reduce((sum, price) => sum + price.dogecoin, 0) / count;
    }
    const history = prices.map(({ dogecoin, priceTime }) => ({
      price: dogecoin,
      priceTime,
    }));

    res.json({ latest, average, history, count });
  } catch {
    res.send("error");
  }
};
