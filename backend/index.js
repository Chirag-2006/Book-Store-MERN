import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModels.model.js";
import bookRouter from "./routers/bookRouters.js";
import cors  from "cors";

const app = express();

// middleware for parsing json data
app.use(express.json());

// cors middleware for allowing cross origin requests
// 1) option 1 for cors
app.use(cors());

// 2) option 2 for cors allow custom origin
// app.use(cors({
//     origin: "http://localhost:3000",
//     // credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

app.get("/", (req, res) => {
    return res.status(200).send("Hello World");
});

app.use("/books",bookRouter);

mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error:", error);
    });
