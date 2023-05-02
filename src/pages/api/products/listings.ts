import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method === "GET") {
        let result = await fetch(`${process.env.BACKEND_URL}/api/product`);
        result = await result.json();
        res.status(200).json(result);
    }
}

