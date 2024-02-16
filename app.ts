import express, { Request, Response } from "express";
import router from "./router/route";
import prisma from "./prisma/prisma"


const app = express();
app.use(express.json());

app.get("/",async (req: Request, res: Response) => {

  const lead=await prisma.lead.create({
    data:{
      lang:"AR",
      phone:"212258610",
      profileName:"ZAKI",
    }
  })


  res.send(lead);
});



app.use("/api", router);

app.listen(4000, () => {
  console.log("APP STARTED ");
});
