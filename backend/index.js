//index as central of endpoints

import express from "express";
import cors from "cors";
import userRoute from "./route/userRout.js";

const app = express();
app.use(cors()); //use cross origin resource sharing to communicate with backend
app.use(express.json()); //receiving request with json format
app.use(userRoute);

//app.listen([port[ host[ backlog  ]] ,[ callback  ] )
app.listen(5000, () => console.log("server is up and running"));