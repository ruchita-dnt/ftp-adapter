import { Router, Request, Response } from "express";
import { IFTP } from "../../interfaces/IFTP";

const route = Router();

export default (app: Router) => {
  app.use("/", route);
  route.get("/", helloFromServer);
};

// Get CMS API
async function helloFromServer(req: Request, res: Response) {
  const respose = {
    "status": 200,
    "message": "Hello From Server"
  }
  return res.status(200).json(respose);
}