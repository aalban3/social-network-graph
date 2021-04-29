import express, { json, urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(json());
app.use(urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`listening at http://localhost:${PORT}`);
});
