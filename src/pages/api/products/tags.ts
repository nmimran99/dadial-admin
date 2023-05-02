import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"
import { GetTokenParams, getToken } from "next-auth/jwt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method === "GET") {
        let result = await fetch(`${process.env.BACKEND_URL}/api/tag`);
        result = await result.json();
        res.status(200).json(result);
    } else if (req.method === "POST") {
        const { text, token } = JSON.parse(req.body);
        let result = await axios.post(`${process.env.BACKEND_URL}/api/tag`,{ text }, { headers: { token }})
        console.log(result)
        res.status(200).json(result.data)
    }
}

