import express, { json, urlencoded } from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import apollo from "./schema/schema-new";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(json());
app.use(urlencoded());
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    res.status(404);
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const init = async () => {
  await apollo.start();
  apollo.applyMiddleware({ app });
  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`listening at http://localhost:${PORT}`);
  });
};

init();
