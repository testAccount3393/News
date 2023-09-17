import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const APP = express();
const PORT = 3000;
const API_KEY = 'ec8eb98887214d87a4c96c99458d926f';

APP.use(express.static("public"));
APP.use(bodyParser.urlencoded({  extended: true }))
APP.get("/", (req, res) => {
    res.render("index.ejs");
});

APP.post("/", async (req, res) => {
    try {
        var response = await axios.get("https://newsapi.org/v2/everything?language=en&apiKey=" + API_KEY + "&q=" + req.body.search);
        res.render("index.ejs", {data: response.data.articles, numberOfResults: response.data.totalResults });
    } catch(error) {
        res.render("index.ejs");
    }
    
});

APP.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// New Comment