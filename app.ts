import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as HttpStatus from "http-status-codes";

const app = express();
const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envPath });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(cors());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", (req, res) => {
  res.status(HttpStatus.OK).json({ message: "Success!" });
});

app.listen(process.env.PORT, () =>
  console.log(`CaquiCoders API running on port ${process.env.PORT}`)
);

module.exports = app;
