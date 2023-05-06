import { OutboundProduct } from "@/types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method === "GET") {
        let result = await fetch(`${process.env.BACKEND_URL}/api/product`);
        result = await result.json();
        res.status(200).json(result);
    } else if (req.method === "POST") {
      let payload = req.body;

      try {
        let result = await axios.post(
          `${process.env.BACKEND_URL}/api/product`, 
          payload, 
          {
            headers: {
              token: req.headers['token'],
              "Content-Type": req.headers["content-type"]
            }
          });
        res.status(200).json(result.data)
      } catch(e: any) {
        res.status(500).json({ error: e.message })
      }
    }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb'
    }
  }
}