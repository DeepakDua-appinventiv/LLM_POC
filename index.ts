import express from "express";
import { token } from "./src/app";

const app = express();

async function startServer(){

  await token.tokenizing_data()

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}
startServer()
