import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./route";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established");
});

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

const port = parseInt(process.env.PORT || 7000);
app.set("port", port);

app.listen(port, () => console.log("Server is running on port ", port));

app.use(routes);

export default app;