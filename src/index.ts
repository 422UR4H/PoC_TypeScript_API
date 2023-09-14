import express, { json } from "express";
import "express-async-errors";
import router from "./routers/index.routes";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));