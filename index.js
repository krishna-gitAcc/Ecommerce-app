import express from "express";
import { installServerConfigs } from "./config/config.js";
import { connectToMongoDb } from "./Database/db.js";
import routes from "./Routes/routes.js";
const app = express();

//installing the
installServerConfigs();
connectToMongoDb();

const port = process.env.port;
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
