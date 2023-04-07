import { Router, Request, Response } from "express";
import { IFTP } from "../../interfaces/IFTP";

const route = Router();

export default (app: Router) => {
  app.use("/ftp", route);
  route.post("/", downloadFTPFile);
};

// Get CMS API
async function downloadFTPFile(req: Request, res: Response) {
  // console.log(req,'req details from ftp')
  // const fileName = req.params.filename;
  const data = req.body;
  // console.log(fileName,'filename from ftp')
  await IFTP.downloadFTPFileInterface(data)
    .then((response) => {
      console.log(response, "from ftp, response check ");
      if (response) {
        console.log(response, "inside if condition response from ftp.ts");
        return res.status(200).json(response);
      } else {
        console.log("from ftp- swr 400 ");
        return res.status(400).json("Something went wrong from ftp");
      }
    })
    .catch((e) => {
      return res.status(500).end();
    });
}